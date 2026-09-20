export function safeRedirectPath(next: string | null | undefined, origin: string) {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.includes("\\") || /[\u0000-\u001f\u007f]/.test(next)) {
    return "/"
  }

  try {
    const resolved = new URL(next, origin)
    if (resolved.origin !== origin) return "/"
    return `${resolved.pathname}${resolved.search}${resolved.hash}`
  } catch {
    return "/"
  }
}
