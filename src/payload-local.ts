import { Story } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from './payload.config'

export const payloadLocal = await getPayload({ config: configPromise })

export function extractPlainText(headline: Story["headline"]): string {
  // @ts-ignore
  return headline.root.children[0].children[0].text as string;
}
