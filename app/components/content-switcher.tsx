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
  | { type: "list"; items: string[]; ordered?: boolean };

type Chapter = {
  title: string;
  slug: string;
  content: ChapterContent[];
};

export default function ContentSwitcher({
  locale,
  className,
}: {
  locale: string;
  className: string;
}) {
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
    <div className={cn("flex-1 flex flex-col overflow-hidden ", className)}>
      <div className="w-full max-w-[2400px] mx-auto flex-1 flex overflow-hidden xl:pb-20 2xl:pb-8">
        <div
          className="bg-white rounded-2xl shadow-lg flex-1 overflow-y-auto mx-auto 
          xl:max-w-[1400px]   /* keep wide on 1535×1080 screens */
          2xl:max-w-[1000px]  /* tighter on laptop */
          "
          style={{
            padding: "clamp(1rem, 2vw, 6rem)", // replaces `p-6 md:p-10 2xl:p-24`
          }}
        >
          {/* <h2 className="text-4xl 2xl:text-7xl font-bold mb-10 tracking-tight">{chapter?.title}</h2> */}
          <ScrollArea className="h-full w-full rounded-md">
            <div
              className="pr-4 leading-relaxed prose max-w-none tracking-wide
              text-base
              xl:[font-size:clamp(1.1rem,1.2vw+0.5rem,2rem)]
              2xl:[font-size:clamp(1.2rem,0.7vw+0.8rem,2.2rem)]"
              style={{ lineHeight: 1.6 }}
            >
              {chapter.content.map((block, idx) => {
                if (block.type === "heading") {
                  if (block.level === 2) {
                    return (
                      <h2
                        key={idx}
                        className="font-bold tracking-tight
                        text-2xl
                        xl:[font-size:clamp(2rem,1.5vw+1rem,3rem)]
                        2xl:[font-size:clamp(2.5rem,1.2vw+1rem,3.5rem)]"
                        style={{
                          marginBottom: "clamp(1rem, 2vw, 2.5rem)",
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
                        className="font-semibold tracking-tight
                        text-xl
                        xl:[font-size:clamp(1.45rem,1.7vw+1rem,2.1rem)]
                        2xl:[font-size:clamp(1rem,0.5vw+1rem,2rem)]"
                        style={{
                          marginTop: "clamp(1rem, 2vw, 5rem)",
                          marginBottom: "clamp(1rem, 2vw, 5rem)",
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
                      className="whitespace-pre-line text-base
                         xl:[font-size:clamp(1.1rem,1.2vw+0.5rem,2.5rem)]
                         2xl:[font-size:clamp(0.8rem,0.3vw+0.8rem,1.5rem)]"
                      style={{
                        marginBottom: "clamp(0.5rem, 0.7vw + 0.5rem, 1.5rem)", // replaces `mb-6`
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
                          className="italic text-gray-600 mt-2
                          text-sm
                          xl:[font-size:clamp(1.2rem,1vw+0.5rem,1.8rem)]
                          2xl:[font-size:clamp(1rem,0.4vw+0.5rem,1.5rem)]"
                        >
                          {block.caption}
                        </p>
                      )}
                    </div>
                  );
                }

                if (block.type === "list") {
  const isNumbered = block.ordered;

  return isNumbered ? (
    <ol
      key={idx}
      className="list-decimal ml-8 text-sm
                 xl:[font-size:clamp(1.1rem,1vw+0.5rem,1.8rem)]
                 2xl:[font-size:clamp(0.8rem,0.5vw+0.5rem,1rem)]"
      style={{
        paddingLeft: "clamp(1rem, 2vw, 4rem)",
        marginBottom: "clamp(0.5rem, 1vw, 2rem)",
      }}
    >
      {block.items.map((item, i) => (
        <li
          key={i}
          style={{
            marginBottom: "clamp(0.25rem, 0.5vw, 1rem)",
          }}
        >
          {item} {/* numbers removed from JSON, ol will number automatically */}
        </li>
      ))}
    </ol>
  ) : (
    <ul
      key={idx}
      className="list-disc ml-8 text-sm
                 xl:[font-size:clamp(1.1rem,1vw+0.5rem,1.8rem)]
                 2xl:[font-size:clamp(0.8rem,0.5vw+0.5rem,1rem)]"
      style={{
        paddingLeft: "clamp(1rem, 2vw, 4rem)",
        marginBottom: "clamp(0.5rem, 1vw, 2rem)",
      }}
    >
      {block.items.map((item, i) => (
        <li
          key={i}
          style={{
            marginBottom: "clamp(0.25rem, 0.5vw, 1rem)",
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
