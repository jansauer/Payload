import { content } from "@/collections/fields/content";
import { marker } from "@/collections/fields/marker";
import { nano_id } from "@/collections/fields/nano_id";
import {
  published_at,
  set_published_at,
} from "@/collections/fields/published_at";
import { headline } from "@/collections/fields/headline";
import { slug } from "@/collections/fields/slug";
import type { CollectionConfig } from "payload";

export const Stories: CollectionConfig = {
  slug: "stories",
  admin: {
    defaultColumns: ["headline", "_status", "createdAt"],
    livePreview: {
      url: ({ data }) => `https://jansauer.de/${data.nanoid}`,
    },
    pagination: {
      defaultLimit: 20,
      limits: [10, 20, 50],
    },
  },
  hooks: {
    afterChange: [set_published_at],
  },
  fields: [
    headline,
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [content],
        },
        {
          label: "Meta",
          fields: [
            {
              type: "row",
              fields: [nano_id, slug],
            },
            published_at,
            marker,
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
};
