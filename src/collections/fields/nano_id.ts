import { customAlphabet } from "nanoid/non-secure";
import { TextField } from "payload";

const gen = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  8,
);

export const nano_id: TextField = {
  name: "nanoid",
  type: "text",
  required: true,
  unique: true,
  index: true,
  defaultValue: () => gen(),
};
