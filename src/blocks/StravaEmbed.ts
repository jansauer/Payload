import type { Block } from 'payload'

export const StravaEmbed: Block = {
  slug: "StravaEmbed",
  interfaceName: "StravaEmbedBlock",
  fields: [
    {
      name: "ID",
      type: "text",
      required: true,
    },
  ],
};
