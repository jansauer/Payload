import { SITE_URL } from '@/site'
import { payloadLocal } from '../../../payload-local';

export async function GET() {
  const stories = await payloadLocal.find({
    collection: 'stories',
    where: {
      _status: {
        not_equals: 'draft',
      },
    },
    limit: 50,
  });

  const urls = stories.docs.map(
    (story) =>
      "  <url>" +
      `<loc>${SITE_URL}${story.nanoid}</loc>` +
      `<lastmod>${story.publishedAt ?? story.createdAt}</lastmod>` +
      "</url>",
  );

  const lastmod = stories.docs[0].publishedAt ?? stories.docs[0].createdAt;

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}</loc><lastmod>${lastmod}</lastmod></url>
${urls.join("\n")}
</urlset>`, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
