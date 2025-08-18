"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
// import { useSidebarSelection } from "@/context/sidebar-context";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ChapterContent =
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "heading"; text: string; level: number }
  | { type: "list"; items: string[] };

type Chapter = {
  title: string;
  slug: string;
  content: ChapterContent[];
};

export default function ContentSwitcher({ locale }: { locale: string }) {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  // const { selectedSlug } = useSidebarSelection();
  const [chapter, setChapter] = useState<Chapter | null>(null);

  useEffect(() => {
    async function loadChapter(slug: string) {
      const element = await import(`@/chapters/${locale}/${slug}.json`);
      setChapter(element);
    }

    if (slug) loadChapter(slug);
    else setChapter(null);
  }, [slug, locale]);

  if (!chapter) return null;

  return (
    <div className="flex-1  flex flex-col p-2 2xl:pt-12 2xl:p-4 overflow-hidden">
      <div className="w-full max-w-[2400px] mx-auto flex-1 flex overflow-hidden">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 2xl:p-24 flex-1 overflow-y-auto">
          {/* <h2 className="text-4xl 2xl:text-7xl font-bold mb-10 tracking-tight">{chapter?.title}</h2> */}
          <ScrollArea className="h-full w-full rounded-md">
            <div className="pr-4 leading-relaxed prose max-w-none tracking-wide text-lg sm:text-lg xl:text-xl 2xl:text-5xl">
              {chapter.content.map((block, idx) => {
                if (block.type === "heading") {
                  if (block.level === 2) {
                    return (
                      <h2
                        key={idx}
                        className="text-3xl sm:text-4xl 2xl:text-7xl font-bold mb-10 tracking-tight"
                      >
                        {block.text}
                      </h2>
                    );
                  }
                  if (block.level === 3) {
                    return (
                      <h3
                        key={idx}
                        className="text-3xl sm:text-3xl 2xl:text-6xl font-semibold mb-20 mt-22 tracking-tight"
                      >
                        {block.text}
                      </h3>
                    );
                  }
                }

                if (block.type === "paragraph") {
                  return (
                    <p key={idx} className="mb-6 whitespace-pre-line">
                      {block.text}
                    </p>
                  );
                }

                if (block.type === "image") {
                  return (
                    <div key={idx} className="my-8 flex flex-col items-center">
                      <Image
                        src={block.src}
                        alt={block.alt || ""}
                        className="max-w-full h-auto rounded-lg shadow"
                        width={800}
                        height={600}
                      />
                      {block.caption && (
                        <p className="italic text-gray-600 text-4xl  mt-2">
                          {block.caption}
                        </p>
                      )}
                    </div>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul key={idx} className="list-disc pl-8 mb-6">
                      {block.items.map((item, i) => (
                        <li key={i} className="mb-2 ml-16">
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }

                return null;
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
