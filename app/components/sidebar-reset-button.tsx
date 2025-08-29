"use client";

import { useRouter } from "@/i18n/navigation";
import { GalleryVerticalEnd } from "lucide-react";
import { Locale } from "next-intl";
import { useParams } from "next/navigation";

export default function SidebarReset() {

  const router = useRouter();
  const params = useParams();

  const locale = params.locale as Locale;

  const handleReset = () => {
    router.replace('/', { locale });
  }


  return (
    <>
      <div className="bg-sidebar-foreground text-sidebar-primary-foreground flex aspect-square size-14 2xl:size-10 items-center justify-center rounded-lg">
        <GalleryVerticalEnd className="size-5 2xl:size-4" />
      </div>
      <div
        onClick={handleReset}
        className="flex flex-col gap-0.5 leading-none"
      >
        <span className="font-medium text-muted-foreground text-lg sm:text-base md:text-xl lg:text-3xl 2xl:text-2xl">Sinj Homepage</span>
      </div>
    </>
  );
}
