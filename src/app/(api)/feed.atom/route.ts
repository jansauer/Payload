import { buildFeed } from '@/app/(api)/feed'

export async function GET() {
  const feed = await buildFeed();

  return new Response(feed.atom1(), {
    status: 200,
    headers: {
      "Content-Type": "application/atom+xml",
    },
  });
}
