const FETCH_TIMEOUT_MS = 6_000;

async function sendWebmention(endpoint: string, source: string, target: string) {
  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  const data = new URLSearchParams({ source, target });

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
      redirect: "follow",
      signal: controller.signal,
    });

    if (response.ok) {
      console.log("Webmention sent successfully!", response.status);
    } else {
      console.error("Failed to send webmention:", response.status, await response.text());
    }
  } catch (error) {
    console.error("Error sending webmention:", error);
  } finally {
    clearTimeout(timerId);
  }
}
