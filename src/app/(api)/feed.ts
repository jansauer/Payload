import { payloadLocal } from '@/payload-local'
import { Story } from '@/payload-types'
import { Feed } from 'feed'

export async function buildFeed(): Promise<Feed> {
  const feed = new Feed({
    title: "Jan Sauer",
    description: "This is my personal feed!",
    id: "",
    copyright: "",
    //id: site!.href,
    // link: site!.href,
    // language: "en",
    // image: site + "image.png",
    // favicon: site + "favicon.ico",
    // copyright: "All rights reserved 2013, John Doe",
    // updated: new Date(2013, 6, 14), // optional, default = today
    // feedLinks: {
    //   atom: "https://example.com/feed.atom",
    //   json: "https://example.com/feed.json",
    // },
    author: {
      name: "Jan Sauer",
      email: "jan@jansauer.de",
      link: "https://jansauer.de",
    },
  });

  const stories = await payloadLocal.find({
    collection: 'stories',
    where: {
      _status: {
        not_equals: 'draft',
      },
    },
    limit: 50,
  });

  stories.docs.forEach((story: Story) => {
    feed.addItem({
      id: story.nanoid,
      link: story.nanoid, // site!.href +
      title: "", // extractPlainText(story.headline),
      published: new Date(story.publishedAt || story.createdAt),
      date: new Date(story.publishedAt || story.createdAt),
    });
  });

  return feed;
}


