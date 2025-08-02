"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
// import { useSidebarSelection } from "@/context/sidebar-context";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Chapter = {
    title: string;
    text: string;
}

export default function ContentSwitcher({ locale }: { locale: string }) {

  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

    // const { selectedSlug } = useSidebarSelection();
    const [chapter, setChapter] = useState<Chapter | null>(null);

    useEffect(() => {
        async function loadChapter(slug: string) {
            const element = await import(`@/chapters/${locale}/${slug}.json`);
            setChapter(element);
        }

        if(slug) loadChapter(slug);
        else setChapter(null);
    }, [slug, locale]);

    if (!chapter) return null;

  return (
    <div className="flex-1  flex flex-col p-2 2xl:pt-12 2xl:p-4 overflow-hidden">
      <div className="w-full max-w-[2400px] mx-auto flex-1 flex overflow-hidden">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 2xl:p-24 flex-1 overflow-y-auto">
          {/* <h2 className="text-4xl 2xl:text-7xl font-bold mb-10 tracking-tight">{chapter?.title}</h2> */}
          <ScrollArea className="h-full w-full rounded-md">
            <div className="pr-4">
          <p className="leading-relaxed tracking-wide whitespace-pre-line text-lg sm:text-lg xl:text-xl 2xl:text-5xl">
            {chapter?.text}
          </p>
          </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
