// Creates a Composio-managed OAuth connection for a user and prints
// the link they need to open to authorize it.
//
// Usage:
//   COMPOSIO_API_KEY=... USER_ID=default node connect.mjs
//
// Note: the "instagram" toolkit only supports Instagram Business/Creator
// accounts, not personal accounts.
import { Composio } from "@composio/core";

const composio = new Composio({ apiKey: process.env.COMPOSIO_API_KEY });
const userId = process.env.USER_ID || "default";
const toolkit = process.env.TOOLKIT || "instagram";

const authConfig = await composio.authConfigs.create(toolkit, {
  type: "use_composio_managed_auth",
});

const connectionRequest = await composio.connectedAccounts.link(
  userId,
  authConfig.id
);

console.log(`Open this link to authorize ${toolkit}:`);
console.log(connectionRequest.redirectUrl);
console.log();
console.log("Waiting for authorization...");

const connectedAccount = await connectionRequest.waitForConnection();
console.log("Connected:", connectedAccount.id, connectedAccount.status);
