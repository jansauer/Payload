import { code } from '@/collections/blocks/code'
import { strava } from '@/collections/blocks/strava'
import {
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  ChecklistFeature,
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
} from '@payloadcms/richtext-lexical'
import type { RichTextField } from 'payload'

export const content: RichTextField = {
  name: "content",
  type: "richText",
  label: false,
  editor: lexicalEditor({
    admin: {
      hideGutter: true,
      placeholder: "Want to turn it into a full story? Keep writing here…",
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    features: ({ defaultFeatures }) => {
      return [
        // ...defaultFeatures,
        InlineToolbarFeature(),

        // Blocks
        ParagraphFeature(), // Unclear for what
        HeadingFeature({
          enabledHeadingSizes: [ 'h2', 'h3', 'h4'],
        }),
        BlockquoteFeature(),
        OrderedListFeature(),
        UnorderedListFeature(),
        ChecklistFeature(),
        HorizontalRuleFeature(),

        // Payload blocks
        BlocksFeature({
          blocks: [
            code,
            strava,
          ]
        }),

        // Inline
        BoldFeature(),
        ItalicFeature(),
        StrikethroughFeature(),
        InlineCodeFeature(),
        LinkFeature(),
      ];
    },
  }),
};
