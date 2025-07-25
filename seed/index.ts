import { Story } from '@/payload-types'
import * as console from 'node:console'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import activities from './activities.json';
import {setTimeout} from 'node:timers/promises';

type RichText = Story['headline'];
type RichTextChild = Story['headline']['root']['children'][number];

const payload = await getPayload({ config });

await setTimeout(3000);

for (const activity of activities) {
  console.log(`Creating ${activity.nanoid}`);
  await payload.create({
    collection: "stories",
    data: {
      nanoid: activity.nanoid,
      headline: richTextRoot(richTextParagraph(activity.text)),
      content: richTextRoot(richTextStrava(activity.strava)),
      marker: activity.type as Story['marker'],
      publishedAt: activity.date,
      createdAt: activity.date,
      updatedAt: activity.date,
      _status: "published",
    }
  });
}

function richTextRoot(child: RichTextChild): RichText {
  return {
    root: {
      children: [ child ],
      direction: null,
      format: "",
      indent: 0,
      type: "root",
      version: 1
    }
  }
}

function richTextParagraph(text: string): RichTextChild {
  return {
    type: "paragraph",
    direction: null,
    format: "",
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: "",
    children: [
      {
        detail: 0,
        format: 0,
        mode: "normal",
        style: "",
        text,
        type: "text",
        version: 1
      }
    ]
  }
}

function richTextStrava(id: string): RichTextChild {
  return {
    type: "block",
    version: 2,
    format: "",
    fields: {
      id,
      blockName: "",
      blockType: "strava"
    }
  }
}
