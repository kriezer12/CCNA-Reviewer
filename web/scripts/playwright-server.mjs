import { spawn } from "node:child_process"
import { createSign, generateKeyPairSync } from "node:crypto"
import { createServer } from "node:http"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const webDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const authPort = Number(process.env.E2E_AUTH_PORT ?? 54321)
const appPort = Number(process.env.E2E_APP_PORT ?? 3002)
const allowedEmail = "owner@e2e.test"
const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2_048 })
const publicJwk = publicKey.export({ format: "jwk" })
const accessToken = createAccessToken()
let responseDelayMs = Number(process.env.E2E_RESPONSE_DELAY_MS ?? 0)
let requests = []
let failReads = new Set()
let failWrites = new Set()
let expireAuth = false
let fixtureRows = {}

const user = {
  id: "e2e-owner",
  aud: "authenticated",
  role: "authenticated",
  email: allowedEmail,
  email_confirmed_at: "2026-01-01T00:00:00.000Z",
  phone: "",
  app_metadata: { provider: "email", providers: ["email"] },
  user_metadata: {},
  identities: [],
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
  is_anonymous: false,
}

const authServer = createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://127.0.0.1:${authPort}`)
  if (process.env.E2E_VERBOSE === "1") {
    console.log(`[e2e-supabase] ${request.method} ${requestUrl.pathname}`)
  }
  const corsHeaders = {
    "Access-Control-Allow-Origin": request.headers.origin ?? "*",
    "Access-Control-Allow-Headers": "apikey, authorization, x-client-info, x-supabase-api-version, content-type, prefer, accept-profile, content-profile",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Credentials": "true",
    Vary: "Origin",
  }

  if (request.method === "OPTIONS") {
    response.writeHead(204, corsHeaders).end()
    return
  }

  if (requestUrl.pathname === "/__test/healthz") {
    sendJson(response, 200, { ok: true }, corsHeaders)
    return
  }

  if (requestUrl.pathname === "/__test/requests" && request.method === "GET") {
    sendJson(response, 200, requests, corsHeaders)
    return
  }

  if (requestUrl.pathname === "/__test/requests" && request.method === "DELETE") {
    requests = []
    sendJson(response, 200, { ok: true }, corsHeaders)
    return
  }

  if (requestUrl.pathname === "/__test/config" && request.method === "POST") {
    const body = await readJson(request)
    responseDelayMs = Math.max(0, Math.min(Number(body.delayMs) || 0, 2_000))
    failReads = new Set(body.failReads ?? [])
    failWrites = new Set(body.failWrites ?? [])
    expireAuth = Boolean(body.expireAuth)
    fixtureRows = body.rows ?? {}
    sendJson(response, 200, { responseDelayMs, failReads: [...failReads], failWrites: [...failWrites], expireAuth }, corsHeaders)
    return
  }

  if (requestUrl.pathname === "/auth/v1/token" && request.method === "POST") {
    const body = await readJson(request)
    if (body.email !== allowedEmail || !body.password) {
      sendJson(response, 400, { message: "Invalid login credentials", error: "invalid_grant" }, corsHeaders)
      return
    }

    const now = Math.floor(Date.now() / 1_000)
    sendJson(response, 200, {
      access_token: accessToken,
      token_type: "bearer",
      expires_in: 3_600,
      expires_at: now + 3_600,
      refresh_token: "e2e-refresh-token",
      user,
    }, corsHeaders)
    return
  }

  if (requestUrl.pathname === "/auth/v1/.well-known/jwks.json" && request.method === "GET") {
    sendJson(response, 200, {
      keys: [{ ...publicJwk, kid: "e2e-test-key", alg: "RS256", use: "sig", key_ops: ["verify"] }],
    }, corsHeaders)
    return
  }

  if (requestUrl.pathname === "/auth/v1/user" && request.method === "GET") {
    const authorization = request.headers.authorization
    if (expireAuth || authorization !== `Bearer ${accessToken}`) {
      sendJson(response, 401, { message: "Invalid token", code: "invalid_token" }, corsHeaders)
      return
    }

    requests.push({ method: request.method, path: requestUrl.pathname })
    sendJson(response, 200, user, corsHeaders)
    return
  }

  if (requestUrl.pathname.startsWith("/rest/v1/")) {
    const table = requestUrl.pathname.slice("/rest/v1/".length)
    requests.push({ method: request.method, table, query: requestUrl.searchParams.get("select") ?? "" })
    if (responseDelayMs) await delay(responseDelayMs)
    if ((request.method === "GET" && failReads.has(table)) || (request.method !== "GET" && failWrites.has(table))) {
      sendJson(response, 503, { message: `Fixture failure for ${table}`, code: "fixture_failure" }, corsHeaders)
      return
    }
    if (request.method === "POST" && (table === "topic_progress" || table === "lab_progress")) {
      const record = await readJson(request)
      const key = table === "topic_progress" ? "objective_id" : "lab_id"
      const existing = fixtureRows[table] ?? []
      fixtureRows[table] = [...existing.filter((row) => row[key] !== record[key]), record]
    }
    if (table === "review_items" && request.method === "POST") {
      const records = await readJson(request)
      const existing = fixtureRows[table] ?? []
      for (const record of records) {
        if (!existing.some(row => row.user_id === record.user_id && row.question_id === record.question_id && row.content_revision === record.content_revision))
          existing.push({ ...record, due_on: new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(new Date()), saved_at: new Date().toISOString(), successful_stage: 0 })
      }
      fixtureRows[table] = existing
    }
    if (table === "review_items" && request.method === "DELETE") {
      const questionId = requestUrl.searchParams.get("question_id")?.replace(/^eq\./, "")
      const revision = Number(requestUrl.searchParams.get("content_revision")?.replace(/^eq\./, ""))
      fixtureRows[table] = (fixtureRows[table] ?? []).filter(row => row.question_id !== questionId || row.content_revision !== revision)
    }
    const tableRows = request.method === "GET" ? (fixtureRows[table] ?? []) : []
    const requestedLab = requestUrl.searchParams.get("lab_id")?.replace(/^eq\./, "")
    const rows = requestedLab ? tableRows.filter((row) => row.lab_id === requestedLab) : tableRows
    response.writeHead(200, {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8",
      "Content-Range": rows.length ? `0-${rows.length - 1}/${rows.length}` : "0-0/0",
    }).end(JSON.stringify(rows))
    return
  }

  sendJson(response, 404, { message: "Not found" }, corsHeaders)
})

authServer.listen(authPort, "127.0.0.1")

const nextCli = resolve(webDirectory, "node_modules", "next", "dist", "bin", "next")
const nextServer = spawn(process.execPath, [nextCli, "start", "--hostname", "127.0.0.1", "--port", String(appPort)], {
  cwd: webDirectory,
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PUBLIC_SUPABASE_URL: `http://127.0.0.1:${authPort}`,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "e2e-publishable-key",
    ALLOWED_EMAIL: allowedEmail,
    STUDY_TIME_ZONE: "Asia/Manila",
    NEXT_DIST_DIR: ".next-e2e",
    NEXT_TELEMETRY_DISABLED: "1",
  },
})

function shutdown() {
  nextServer.kill("SIGTERM")
  authServer.close()
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)
nextServer.on("exit", (code) => {
  authServer.close()
  process.exit(code ?? 0)
})

function createAccessToken() {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url")
  const signedContent = `${encode({ alg: "RS256", kid: "e2e-test-key", typ: "JWT" })}.${encode({
    iss: `http://127.0.0.1:${authPort}/auth/v1`,
    sub: "e2e-owner",
    aud: "authenticated",
    role: "authenticated",
    email: allowedEmail,
    exp: Math.floor(Date.now() / 1_000) + 3_600,
    iat: Math.floor(Date.now() / 1_000),
  })}`
  const signer = createSign("RSA-SHA256")
  signer.update(signedContent)
  return `${signedContent}.${signer.sign(privateKey).toString("base64url")}`
}

async function readJson(request) {
  let raw = ""
  for await (const chunk of request) raw += chunk
  return raw ? JSON.parse(raw) : {}
}

function sendJson(response, status, body, headers = {}) {
  response.writeHead(status, { ...headers, "Content-Type": "application/json; charset=utf-8" })
  response.end(JSON.stringify(body))
}

function delay(ms) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, ms))
}
