"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Locale } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useTransition } from "react";

type Props = {
  children: React.ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const onSelectChange = (newLocale: string) => {
    startTransition(() => {
    const currentSlug = searchParams.get("slug");
    const isViewingChapter = !!currentSlug;

    // Navigate to the base locale route (e.g., /hr or /en) if NOT viewing a chapter
    if (!isViewingChapter) {
      router.replace(pathname, { locale: newLocale as Locale });
      return;
    }

    // If viewing a chapter, preserve the slug
    const queryString = `?slug=${currentSlug}`;
    router.replace(`${pathname}${queryString}`, { locale: newLocale as Locale });
  });
  };

  return (
    <div className="w-[100px]">
      <Select
        defaultValue={defaultValue}
        onValueChange={onSelectChange}
        disabled={isPending}
      >
        <SelectTrigger className="bg-black text-white border-0">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === "option") {
              const option = child as React.ReactElement<{
                value: string;
                children: React.ReactNode;
              }>;
              return (
                <SelectItem value={option.props.value}>
                  {option.props.children}
                </SelectItem>
              );
            }
            return null;
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
