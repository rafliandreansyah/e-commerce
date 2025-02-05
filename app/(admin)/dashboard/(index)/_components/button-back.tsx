"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ButtonBack({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="flex gap-3 items-center">
      <Button variant={"outline"} size="icon" onClick={router.back}>
        <ChevronLeft />
      </Button>
      <p className="font-medium">{title}</p>
    </div>
  );
}
