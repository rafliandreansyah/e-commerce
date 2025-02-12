"use client";

import { MoonLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="size-full flex items-center justify-center">
      <MoonLoader loading size={40} />
    </div>
  );
}
