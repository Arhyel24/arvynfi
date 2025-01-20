"use client";

import { Suspense } from "react";
import Navigation from "./main-component";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navigation />
    </Suspense>
  );
}
