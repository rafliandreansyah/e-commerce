"use client";

import ErrorImage from "@/public/error.png";
import Image from "next/image";

export default function Error() {
  return (
    <div className="w-full h-lvh flex flex-col gap-4 items-center justify-center">
      <Image src={ErrorImage} width={300} alt="image not found" />
      <h3 className="text-xl text-center">Internal Server Error</h3>
    </div>
  );
}
