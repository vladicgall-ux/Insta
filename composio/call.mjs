// Executes one real tool call against a connected Instagram Business/Creator
// account: fetches the account's recent media.
//
// Usage:
//   COMPOSIO_API_KEY=... USER_ID=default node call.mjs
import { Composio } from "@composio/core";

const composio = new Composio({ apiKey: process.env.COMPOSIO_API_KEY });
const userId = process.env.USER_ID || "default";

const result = await composio.tools.execute("INSTAGRAM_GET_IG_USER_MEDIA", {
  userId,
  arguments: {},
});

console.log(JSON.stringify(result, null, 2));
