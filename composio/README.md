# Composio integration

Minimal example wiring up [Composio](https://composio.dev) (Platform SDK) so an
agent or app in this repo can connect a user's GitHub account and call real
GitHub tools through Composio.

## Setup

```bash
cd composio
npm install
export COMPOSIO_API_KEY=your_composio_project_api_key
```

## Connect an account

```bash
npm run connect
```

Prints an authorization link. Open it, sign in to GitHub, and the script
waits for the connection to complete.

## Make a real tool call

```bash
npm run call
```

Calls `GITHUB_GET_AUTHENTICATED_USER` for the connected user and prints the
response.

## Next steps

- Browse other toolkits (Gmail, Slack, Notion, Linear, ...) at
  https://docs.composio.dev/toolkits
- Swap `GITHUB_GET_AUTHENTICATED_USER` in `call.mjs` for another tool slug,
  e.g. `GITHUB_LIST_REPOSITORIES_FOR_THE_AUTHENTICATED_USER`
- Use `composio.tools.get(...)` to fetch tool schemas for an LLM tool-use loop
  instead of calling tools directly
- Give each real end user their own `userId` instead of the shared `"default"`
