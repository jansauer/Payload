import type { Block } from "payload";

export const strava: Block = {
  slug: "strava",
  interfaceName: "StravaBlock",
  fields: [
    {
      name: "id",
      type: "text",
      required: true,
    },
  ],
};
