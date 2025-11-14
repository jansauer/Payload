import { ReceiveWebmentionJob } from '@/utils/recevie-webmention-job'
import path from "path";
import sharp from "sharp";
import { buildConfig, type CollectionConfig } from 'payload'
import { fileURLToPath } from "url";
import { gcsStorage } from "@payloadcms/storage-gcs";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";

import { Stories } from "@/collections/Stories";
import { Media } from "@/collections/Media";
import { Users } from "@/collections/Users";

if (!process.env.PAYLOAD_SECRET && !process.env.NEXT_PHASE) {
  throw new Error("PAYLOAD_SECRET is not defined");
}

if (!process.env.DATABASE_URI && !process.env.NEXT_PHASE) {
  throw new Error("DATABASE_URI is not defined");
}

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    dateFormat: "dd.MM.yyyy HH:mm",
    livePreview: {
      breakpoints: [
        {
          name: "mobile",
          label: "Mobile",
          height: 667,
          width: 375,
        },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Stories, Media, Users],
  jobs: {
    autoRun: [{
      allQueues: true,
    }],
    jobsCollectionOverrides: doNotHideDefaultJobsCollection,
    tasks: [
      ReceiveWebmentionJob
    ],
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  graphQL: {
    disable: true,
  },
  plugins: [
    gcsStorage({
      collections: {
        media: true,
      },
      bucket: "payload-media-v1",
      options: {},
    }),
  ],
});

function doNotHideDefaultJobsCollection({ defaultJobsCollection }: {
  defaultJobsCollection: CollectionConfig;
}): CollectionConfig {
  if (!defaultJobsCollection.admin) {
    defaultJobsCollection.admin = {}
  }

  defaultJobsCollection.admin.hidden = false
  return defaultJobsCollection
}
