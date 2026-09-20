# Issue tracker: GitHub

Issues and specifications for this repository live as GitHub Issues in `kriezer12/CCNA-Reviewer`. Use the `gh` CLI for all operations and infer the repository from the current checkout.

## Conventions

- **Create an issue:** `gh issue create --title "..." --body "..."`.
- **Read an issue:** `gh issue view <number> --comments`, including labels when reviewing state.
- **List issues:** use `gh issue list` with explicit state and label filters.
- **Comment:** `gh issue comment <number> --body "..."`.
- **Apply or remove labels:** `gh issue edit <number> --add-label "..."` or `--remove-label "..."`.
- **Close:** `gh issue close <number> --comment "..."`.

## Pull requests as a triage surface

PRs are not a triage request surface for this repository. External pull requests are reviewed through the normal pull-request workflow.

## Specs and tickets

When a skill says to publish a spec or ticket, create a GitHub Issue. Use the `ready-for-agent` label for approved, self-contained implementation tickets. Record blocking edges in the issue body and use GitHub issue dependencies when available.
