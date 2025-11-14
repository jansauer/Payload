import { extractPlainText } from '@/payload-local'
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { RichTextField, TextField } from 'payload'

export const headline: RichTextField = {
  name: "headline",
  type: "richText",
  required: true,
  label: false,
  editor: lexicalEditor({
    admin: {
      hideGutter: true,
      placeholder: () => random(placeholders),
      // className: "short-field", // TODO: file bug
    },
    features: () => {
      return [];
    },
  }),
};

export const headlinePlain: TextField = {
  name: 'headlinePlain',
  type: 'text',
  virtual: true,
  hooks: {
    afterRead: [
      ({ siblingData }) => {
        return siblingData.headline?.root?.children[0].children[0].text as string || "";
      }
    ]
  }
}

function random(array: Array<string>) {
  return array[~~(Math.random() * array.length)];
}

const placeholders = [
  "Write something short and catchy…",
  "What’s on your mind?",
  "Tease me with a thought…",
  "Make it snappy!",
  "Start with a whisper…",
  "Hit me with a headline!",
  "Start small…",
  "Tiny idea goes here…",
  "Hit me with a thought!",
];
