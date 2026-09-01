# Composio integration

Minimal example wiring up [Composio](https://composio.dev) (Platform SDK) so an
agent or app in this repo can connect a user's Instagram Business/Creator
account and call real Instagram tools through Composio.

Note: the `instagram` toolkit only supports Instagram **Business** or
**Creator** accounts (linked to a Facebook Page), not personal accounts.

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

Calls `INSTAGRAM_GET_IG_USER_MEDIA` for the connected user (reads recent
media) and prints the response.

## Next steps

- Browse other Instagram tools at https://docs.composio.dev/toolkits/instagram,
  e.g. `INSTAGRAM_POST_IG_USER_MEDIA` + `INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH`
  to publish a post, or `INSTAGRAM_GET_IG_MEDIA_COMMENTS` /
  `INSTAGRAM_POST_IG_COMMENT_REPLIES` to read and reply to comments
- Browse other toolkits (Gmail, Slack, Notion, Linear, GitHub, ...) at
  https://docs.composio.dev/toolkits
- Swap the tool slug in `call.mjs` for another one and adjust `arguments`
- Use `composio.tools.get(...)` to fetch tool schemas for an LLM tool-use loop
  instead of calling tools directly
- Give each real end user their own `userId` instead of the shared `"default"`
