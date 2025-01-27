import { Entry } from '@/payload-types'
import { CollectionBeforeValidateHook } from 'payload'

export const setPublishedAt: CollectionBeforeValidateHook<Entry> = ({
  data,
  req,
}) => {
  if (!data?.publishedAt && data?._status === "published") {
    const now = new Date();

    return {
      ...data,
      publishedAt: now.toISOString(),
    };
  }

  return data;
};
