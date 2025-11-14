import { TaskConfig } from 'payload'

export const ReceiveWebmentionJob: TaskConfig<'webmentionReceive'> = {
  slug: 'webmentionReceive',
  label: 'Receive Webmention',
  inputSchema: [
    {
      name: 'source',
      type: 'text',
      required: true,
    },{
      name: 'target',
      type: 'text',
      required: true,
    },
  ],
  // outputSchema: [],
  retries: 3,

  handler: async ({ input, job }) => {
    console.log("Running Job");
    console.log(`Source: ${input.source}`);
    console.log(`Target: ${input.target}`);

    return {
      output: {},
    }
  },
}
