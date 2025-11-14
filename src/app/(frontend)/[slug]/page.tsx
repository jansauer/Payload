import Layout from '@/app/(frontend)/layout'
import StravaEmbed from '@/components/StravaEmbed'
import { extractPlainText, payloadLocal } from '@/payload-local'
import { Story } from '@/payload-types'
import { notFound } from 'next/navigation'

export default async function Page({
                                     params,
                                   }: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  if (!slug) notFound();

  const story = await fetchStoryByNanoID(slug);
  if (!story) notFound();

  const publishedAt = story.publishedAt || story.createdAt;
  const date = new Date(publishedAt);

  return (
    <Layout>
      <article id={story.slug} className="h-entry">
        <time dateTime={publishedAt}>
          {date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </time>
        <h1 className="p-name p-summary">{ extractPlainText(story.headline) }</h1>
        {story.contentPlain.map((b: ContentBlock) => {
          if (b.type === 'h2') return <h2 dangerouslySetInnerHTML={{ __html: b.html }} />
          if (b.type === 'h3') return <h3 dangerouslySetInnerHTML={{ __html: b.html }} />
          if (b.type === 'h4') return <h4 dangerouslySetInnerHTML={{ __html: b.html }} />
          if (b.type === 'p') return <p dangerouslySetInnerHTML={{ __html: b.html }} />
          if (b.type === 'strava') return <StravaEmbed activityId={b.id} />
        })}
      </article>
    </Layout>
  );
}




interface HtmlBlock {
  type: "h2" | "h3" | "h4" | "p" | "blockquote",
  html: string,
}

interface CodeBlock {
  type: "code",
  lang: string,
  code: string,
}

interface StravaBlock {
  type: "strava",
  id: string,
}

export type ContentBlock = HtmlBlock | CodeBlock | StravaBlock;












interface StoryPageProps {
  story: Story | null;
}

async function fetchStoryByNanoID(id: string): Promise<Story | undefined> {

  const page = await payloadLocal.find({
    collection: 'stories',
    where: {
      nanoid: {
        equals: id,
      },
    },
    limit: 1,
  });

  if (page.docs.length != 1) return undefined;
  return page.docs[0];
}
