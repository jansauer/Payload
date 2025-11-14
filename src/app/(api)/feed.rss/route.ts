import { buildFeed } from '@/app/(api)/feed'

export async function GET() {
  const feed = await buildFeed();

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}
