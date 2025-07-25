import { Story } from '@/payload-types'
import { CollectionBeforeValidateHook, DateField } from 'payload'

export const published_at: DateField = {
  name: "publishedAt",
  type: "date",
  admin: {
    className: "TTTtest",
    date: {
      pickerAppearance: "dayAndTime",
      displayFormat: "yyyy-MM-dd'T'HH:mm:ssXXX",
      timeFormat: "HH:mm",
    },
  },
};

export const set_published_at: CollectionBeforeValidateHook<Story> = ({ data }) => {
  if (!data?.publishedAt && data?._status === "published") {
    const now = new Date();

    return {
      ...data,
      publishedAt: now.toISOString(),
    };
  }

  return data;
};
