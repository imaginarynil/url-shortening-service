"use client";

import { Suspense } from "react";
import Application from "./Application";

export default function Home() {
  return (
    <Suspense>
      <Application />
    </Suspense>
  );
}
