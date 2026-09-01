// Executes one real tool call against a connected GitHub account.
//
// Usage:
//   COMPOSIO_API_KEY=... USER_ID=default node call.mjs
import { Composio } from "@composio/core";

const composio = new Composio({ apiKey: process.env.COMPOSIO_API_KEY });
const userId = process.env.USER_ID || "default";

const result = await composio.tools.execute("GITHUB_GET_AUTHENTICATED_USER", {
  userId,
  arguments: {},
});

console.log(JSON.stringify(result, null, 2));
