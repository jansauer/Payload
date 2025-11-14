import { ContentBlock } from '@/app/(frontend)/[slug]/page'
import { code } from "@/collections/blocks/code";
import { strava } from "@/collections/blocks/strava";
import { Story } from '@/payload-types'
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
import { JSONField, RichTextField } from 'payload'

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

export const contentPlain: JSONField = {
  name: 'contentPlain',
  type: 'json',
  virtual: true,
  hidden: true,
  hooks: {
    afterRead: [
      ({ siblingData }) => convertToPlain(siblingData.content),
    ],
  }
}

function convertToPlain(content: Story['content']): ContentBlock[] {
  if (!content) return [];

  return content.root.children
    .map((block) => convertBlock(block))
    .filter(isDefined);
}

function convertBlock(block): ContentBlock | undefined {
  if (block.type === "heading" && block.tag == 'h2') return { type: "h2", html: formatChildren(block.children) };
  if (block.type === "heading" && block.tag == 'h3') return { type: "h3", html: formatChildren(block.children) };
  if (block.type === "heading" && block.tag == 'h4') return { type: "h4", html: formatChildren(block.children) };

  if (block.type === "paragraph") return { type: "p", html: formatChildren(block.children) };

  if (block.type === "quote") return { type: "blockquote", html: formatChildren(block.children) };

  // if (block.type === "list" && block.listType == 'bullet') return { type: "html", content: `<ul>${ formatChildren(block.children) }</ul>` };
  // if (block.type === "list" && block.listType == 'number') return { type: "html", content: `<ol>${ formatChildren(block.children) }</ol>` };

  // if (block.type === "horizontalrule") return { type: "html", content: `<hr />` };

  // if (block.type === "block" && block.fields.blockType == "code") return { type: "code", lang: block.fields.lang, code: block.fields.code };
  if (block.type === "block" && block.fields.blockType == "strava") return { type: "strava", id: block.fields.id };

  return undefined;
}

function isDefined<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null;
}

interface TextChild {
  type: "text";
  text: string;
  format: number;
}

interface ListItemChild {
  type: "listitem";
  children: Child[];
}

interface LineBreakChild {
  type: "linebreak";
}

type Child = TextChild | ListItemChild | LineBreakChild;

function formatChildren(children: Child[]): string {
  return children
    .map(child => formatChild(child))
    .join('');
}

function formatChild(child: Child): string {
  if (child.type == "text") {
    let text = child.text;
    if ((child.format >> 0) & 1) { text = `<b>${text}</b>`; }
    if ((child.format >> 1) & 1) { text = `<i>${text}</i>`; }
    if ((child.format >> 2) & 1) { text = `<s>${text}</s>`; }
    if ((child.format >> 4) & 1) { text = `<code>${text}</code>`; }
    return text;
  }

  if (child.type == "listitem") return `<li>${ formatChildren(child.children) }</li>`;

  if (child.type == "linebreak") return "<br />";

  return "";
}
