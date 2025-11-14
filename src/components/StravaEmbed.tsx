"use client";

import Script from "next/script";

interface StravaEmbedProps {
  activityId: string;
}

export default function StravaEmbed({ activityId }: StravaEmbedProps) {
  return (
    <>
      <div
        className="strava-embed-placeholder"
        data-embed-type="activity"
        data-embed-id={activityId}
        data-style="standard"
        data-from-embed="false"
      ></div>
      <Script
        src="https://strava-embeds.com/embed.js"
      strategy="lazyOnload" />
    </>
  );
};
