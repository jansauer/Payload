import * as cheerio from "cheerio";

const FETCH_TIMEOUT_MS = 6_000;

export async function discoverWebmentionEndpoint(target: string): Promise<string | undefined> {
  const head = await fetchTarget("HEAD", target);
  const headEndpoint = extractEndpointFromHeaders(head.headers);
  if (headEndpoint) return absoluteUrl(headEndpoint, target);

  const get = await fetchTarget("GET", target);
  const getEndpoint = extractEndpointFromHeaders(get.headers);
  if (getEndpoint) return absoluteUrl(getEndpoint, target);

  const contentType = get.headers.get("content-type") ?? "";
  if (contentType.includes("text/html")) {
    const html = await get.text();
    const htmlEndpoint = extractEndpointFromHtml(html);
    if (htmlEndpoint !== undefined) return absoluteUrl(htmlEndpoint, target);
  }

  return undefined;
}

async function fetchTarget(method: "HEAD"| "GET", url: string): Promise<Response> {
  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timerId);
  }
}

function extractEndpointFromHeaders(headers: Headers): string | undefined {
  const linkHeaders = headers.get("link") ?? '';

  for (const link of linkHeaders.split(",")) {
    if (/rel=.?webmention/i.test(link)) {
      const match = link.match(/<([^>]+)>/);
      if (match) return match[1];
    }
  }
}

function extractEndpointFromHtml(html: string) {
  const $ = cheerio.load(html);
  const elements = $('a[rel~="webmention"], link[rel~="webmention"]');

  for (const ss of elements.toArray()) {
    const href = $(ss).attr("href");
    if (href !== undefined) return href;
  }
}

function absoluteUrl(endpoint: string, target: string) {
  return new URL(endpoint, target).toString();
}
