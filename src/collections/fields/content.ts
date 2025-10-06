import { code } from "@/collections/blocks/code";
import { strava } from "@/collections/blocks/strava";
import {
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  UnorderedListFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical";
import type { RichTextField } from "payload";

export const content: RichTextField = {
  name: "content",
  type: "richText",
  label: false,
  editor: lexicalEditor({
    admin: {
      hideGutter: true,
      placeholder: "Want to turn it into a full story? Keep writing here…",
    },
    features: () => {
      return [
        InlineToolbarFeature(),

        // Inline
        BoldFeature(),
        ItalicFeature(),
        StrikethroughFeature(),
        InlineCodeFeature(),
        LinkFeature(),

        // Blocks
        HeadingFeature({
          enabledHeadingSizes: ["h2", "h3", "h4"],
        }),
        ParagraphFeature(), // Unclear for what
        BlockquoteFeature(),
        OrderedListFeature(),
        UnorderedListFeature(),
        HorizontalRuleFeature(),
        UploadFeature({
          collections: {
            media: {
              fields: [],
            },
          },
        }),

        // Payload blocks
        BlocksFeature({
          blocks: [code, strava],
        }),
      ];
    },
  }),
};
