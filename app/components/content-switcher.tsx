"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
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

export default function ContentSwitcher({ locale, className }: { locale: string, className: string }) {
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
    <div
      className={cn("flex-1 flex flex-col overflow-hidden", className)}
      
    >
      <div className="w-full max-w-[2400px] mx-auto flex-1 flex overflow-hidden">
        <div
          className="bg-white rounded-2xl shadow-lg flex-1 overflow-y-auto"
          style={{
            padding: "clamp(1rem, 2vw, 6rem)", // replaces `p-6 md:p-10 2xl:p-24`
          }}
        >
          {/* <h2 className="text-4xl 2xl:text-7xl font-bold mb-10 tracking-tight">{chapter?.title}</h2> */}
          <ScrollArea className="h-full w-full rounded-md">
            <div
              className="pr-4 leading-relaxed prose max-w-none tracking-wide"
              style={{
                fontSize: "clamp(1rem, 1vw + 0.5rem, 2.5rem)", // replaces `text-lg sm:text-lg xl:text-xl 2xl:text-5xl`
                lineHeight: 1.6,
              }}
            >
              {chapter.content.map((block, idx) => {
                if (block.type === "heading") {
                  if (block.level === 2) {
                    return (
                      <h2
                        key={idx}
                        className="font-bold tracking-tight"
                        style={{
                          fontSize: "clamp(1.75rem, 2vw + 1rem, 4.5rem)", // replaces `text-3xl sm:text-4xl 2xl:text-7xl`
                          marginBottom: "clamp(1rem, 2vw, 2.5rem)", // replaces `mb-10`
                        }}
                      >
                        {block.text}
                      </h2>
                    );
                  }
                  if (block.level === 3) {
                    return (
                      <h3
                        key={idx}
                        className="font-semibold tracking-tight"
                        style={{
                          fontSize: "clamp(1.5rem, 1.4vw + 1rem, 3.75rem)", // replaces `text-3xl sm:text-3xl 2xl:text-6xl`
                          marginTop: "clamp(1rem, 2vw, 5rem)", // replaces `mt-22`
                          marginBottom: "clamp(1rem, 2vw, 5rem)", // replaces `mb-20`
                        }}
                      >
                        {block.text}
                      </h3>
                    );
                  }
                }

                if (block.type === "paragraph") {
                  return (
                    <p
                      key={idx}
                      className="whitespace-pre-line"
                      style={{
                        marginBottom: "clamp(0.5rem, 1vw, 1.5rem)", // replaces `mb-6`
                      }}
                    >
                      {block.text}
                    </p>
                  );
                }

                if (block.type === "image") {
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center"
                      style={{
                        margin: "clamp(1rem, 2vw, 4rem) 0", // replaces `my-8`
                      }}
                    >
                      <Image
                        src={block.src}
                        alt={block.alt || ""}
                        className="max-w-full h-auto rounded-lg"
                        width={800}
                        height={600}
                      />
                      {block.caption && (
                        <p
                          className="italic text-gray-600 mt-2"
                          style={{
                            fontSize: "clamp(1rem, 1vw + 0.5rem, 2rem)", // replaces `text-4xl`
                          }}
                        >
                          {block.caption}
                        </p>
                      )}
                    </div>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul
                      key={idx}
                      className="list-disc"
                      style={{
                        paddingLeft: "clamp(1rem, 2vw, 4rem)", // replaces `pl-8`
                        marginBottom: "clamp(0.5rem, 1vw, 2rem)", // replaces `mb-6`
                      }}
                    >
                      {block.items.map((item, i) => (
                        <li
                          key={i}
                          style={{
                            marginBottom: "clamp(0.25rem, 0.5vw, 1rem)", // replaces `mb-2`
                            marginLeft: "clamp(1rem, 2vw, 4rem)", // replaces `ml-16`
                          }}
                        >
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
