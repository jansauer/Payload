import { Code } from '@/blocks/Code'
import { setPublishedAt } from '@/collections/hooks/setPublishedAt'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { customAlphabet } from 'nanoid/non-secure'
import type { CollectionConfig } from 'payload'

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  8
);

export const Entries: CollectionConfig = {
  slug: 'entries',
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["content", "_status"],
  },
  hooks: {
    beforeChange: [ setPublishedAt ],
  },
  fields: [
    {
      name: "short",
      type: "richText",
      required: true,
      label: false,
      editor: lexicalEditor({
        features: () => {
          return [ ]
        },
      }),
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({ blocks: [Code] }),
        ],
      }),
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      defaultValue: () => nanoid(),
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          // displayFormat: "dd.MM.yyyy HH:mm",
          // displayFormat: "yyyy-MM-dd'T'HH:mm:ssXXX",
        },
      },
    },
  ],
}
