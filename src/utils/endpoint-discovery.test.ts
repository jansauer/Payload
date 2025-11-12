import { expect, test } from "vitest";
import { discoverWebmentionEndpoint } from './endpoint-discovery'
import { fn } from '@vitest/spy'

test.each([
  ['absolute', 'https://example.com'],
  ['relative', '.'],
])("should use webmention url from %s HEAD response headers", async (_, base) => {
  const headers = new Headers();
  headers.append("Link", `<${base}/page/2>; rel="next"; param2="value2"`);
  headers.append("Link", `<${base}/webmention>; rel="webmention"`);
  headers.append("Link", `<${base}/page>; rel="preconnect"`);

  global.fetch = fn().mockResolvedValue({
    ok: true,
    headers,
  } as Response);

  const result = await discoverWebmentionEndpoint("https://example.com");

  expect(fetch).toHaveBeenCalledOnce();
  expect(fetch).toHaveBeenCalledWith("https://example.com", expect.anything());
  expect(result).toEqual("https://example.com/webmention");
});

test("should use first webmention url from HEAD response headers", async () => {
  const headers = new Headers();
  headers.append("Link", '<https://example.com/1>; rel="webmention"');
  headers.append("Link", '<https://example.com/2>; rel="webmention"');

  global.fetch = fn().mockResolvedValue({
    ok: true,
    headers,
  } as Response);

  const result = await discoverWebmentionEndpoint("https://example.com");

  expect(fetch).toHaveBeenCalledOnce();
  expect(fetch).toHaveBeenCalledWith("https://example.com", expect.anything());
  expect(result).toEqual("https://example.com/1");
});
