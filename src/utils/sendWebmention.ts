// import { TaskConfig } from 'payload'
//
// export const sendWebmention = {
//   slug: 'sendWebmention',
//   retries: 3,
//
//   inputSchema: [
//     {
//       name: 'source',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'target',
//       type: 'text',
//       required: true,
//     },
//   ],
//
//   // These are the properties that the function should output
//   outputSchema: [
//   {
//     name: 'postID',
//     type: 'text',
//     required: true,
//   },
// ],
//
//   handler: async ({ input, job, req }) => {
//
//     console.log("input");
//     return {
//       output: {
//         postID: "test",
//       },
//     }
//   },
// } as TaskConfig<'sendWebmention'>
