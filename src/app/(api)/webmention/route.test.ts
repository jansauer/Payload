import { POST } from './route'
import { expect, test } from 'vitest'

test("should accepted webmention", async () => {
  const request = new Request('https://this-site.local/webmentions', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "",
  });

  const response= await POST(request);

  expect(response.ok).toEqual(true);
  expect(response.status).toEqual(202);
  await expect(response.text()).resolves.toEqual('');
});

test("should return error when request has no formadata", async () => {
  const request = new Request('https://this-site.local/webmentions', {
    method: 'POST',
    body: "",
  });

  const response= await POST(request);

  expect(response.ok).toEqual(false);
  expect(response.status).toEqual(400);
  // await expect(response.text()).resolves.toEqual('');
});

// function aRequest()
