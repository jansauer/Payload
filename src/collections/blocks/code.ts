import type { Block } from "payload";

export const code: Block = {
  slug: "code",
  interfaceName: "CodeBlock",
  fields: [
    {
      name: "language",
      type: "select",
      defaultValue: "typescript",
      options: [
        {
          label: "Shell",
          value: "shell",
        },
        {
          label: "Typescript",
          value: "typescript",
        },
        {
          label: "Javascript",
          value: "javascript",
        },
      ],
    },
    {
      name: "code",
      type: "code",
      label: false,
      required: true,
    },
  ],
};
