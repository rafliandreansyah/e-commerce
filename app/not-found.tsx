import Image from "next/image";
import NotFoundImage from "@/public/not-found.png";

export default function NotFound() {
  return (
    <div className="w-full h-lvh items-center justify-center flex flex-col gap-4">
      <Image src={NotFoundImage} width={300} alt="image not found" />
      <h3 className="text-xl text-center">Page not found</h3>
    </div>
  );
}
