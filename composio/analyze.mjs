// Fetches recent media for the connected Instagram account plus reach/
// engagement insights for each item, and prints a compact table for
// analysis.
//
// Usage:
//   COMPOSIO_API_KEY=... USER_ID=default node analyze.mjs
import { Composio } from "@composio/core";

const composio = new Composio({
  apiKey: process.env.COMPOSIO_API_KEY,
  toolkitVersions: { instagram: "20260819_00" },
});
const userId = process.env.USER_ID || "default";

const mediaRes = await composio.tools.execute("INSTAGRAM_GET_IG_USER_MEDIA", {
  userId,
  arguments: {
    ig_user_id: "me",
    limit: 25,
    fields: "id,caption,media_type,media_product_type,timestamp,permalink",
  },
});

const items = mediaRes.data?.data ?? [];
const rows = [];

for (const item of items) {
  const metrics =
    item.media_product_type === "STORY"
      ? ["reach", "navigation", "replies"]
      : item.media_type === "VIDEO"
        ? ["views", "reach", "likes", "comments", "saved", "shares", "total_interactions"]
        : ["reach", "likes", "comments", "saved", "shares", "total_interactions"];

  const insightsRes = await composio.tools.execute("INSTAGRAM_GET_IG_MEDIA_INSIGHTS", {
    userId,
    arguments: { ig_media_id: item.id, metric: metrics },
  });

  const values = {};
  for (const m of insightsRes.data?.data ?? []) {
    values[m.name] = m.total_value?.value ?? m.values?.[0]?.value;
  }

  rows.push({
    id: item.id,
    type: item.media_type,
    product: item.media_product_type,
    date: item.timestamp,
    caption: (item.caption || "").slice(0, 40).replace(/\n/g, " "),
    ...values,
  });
}

console.log(JSON.stringify(rows, null, 2));
