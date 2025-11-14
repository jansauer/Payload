import { payloadLocal } from '@/payload-local'

export async function POST(request: Request) {
  let formData = await getFormData(request);
  if (!formData) {
    return new Response("Form data missing", { status: 400 });
  }

  const source = formData.get("source")?.toString();
  const target = formData.get("target")?.toString();

  if (!source || !isValidSource(source)) {
    return new Response("Source is not a valid URL.", { status: 400 });
  }

  if (!target || !isValidTarget(target)) {
    return new Response("Target is not a valid URL.", { status: 400 });
  }

  const createdJob = await payloadLocal.jobs.queue({
    task: 'webmentionReceive',
    input: {
      source,
      target,
    },
  });

  console.info(`Created job: ${createdJob.id}`);

  return new Response(undefined, {
    status: 202,
    statusText: 'ACCEPTED',
  });
}

async function getFormData(request: Request): Promise<FormData | undefined> {
  try {
    return await request.formData();
  } catch {
    return undefined;
  }
}

function getURL(value: string): URL | undefined {
  try {
    return new URL(value)
  } catch {
    return undefined
  }
}

const IPV4_PATTERN = /^(\d{1,3}\.){3}\d{1,3}$/
const IPV6_PATTERN = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/

function isValidSource(source: string): boolean {
  let url = getURL(source);
  if (!url) return false

  if (url.protocol !== 'https:') return false;
  if (IPV4_PATTERN.test(url.host)) return false;
  if (IPV6_PATTERN.test(url.host)) return false;
  if (url.host === 'localhost') return false;
  if (url.host === 'jansauer.de') return false;

  return true;
}

function isValidTarget(target: string): boolean {
  let url = getURL(target);
  if (!url) return false

  if (url.protocol !== 'https:') return false;
  if (url.host !== 'jansauer.de') return false;

  return true;
}
