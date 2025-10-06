import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { RichTextField } from "payload";
import "./headline.scss";

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
