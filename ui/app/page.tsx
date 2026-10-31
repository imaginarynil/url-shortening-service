"use client";

import Application from "./Application";
import { createUrlService, UrlServiceContext } from "./context";

export default function Home() {
  return (
    <UrlServiceContext value={createUrlService()}>
      <Application />
    </UrlServiceContext>
  );
}
