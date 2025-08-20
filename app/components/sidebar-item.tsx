"use client";

import { SidebarMenuButton } from "@/components/ui/sidebar";
// import { useSidebarSelection } from "@/context/sidebar-context";
import { useRouter, useSearchParams } from "next/navigation";

interface SidebarItemProps {
  slug: string;
  title: string;
}

export default function SidebarItem({ slug, title }: SidebarItemProps) {

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSlug = searchParams.get('slug');

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('slug', slug);
    router.replace(`?${params.toString()}`);
  }


  // const { selectedSlug, setSelectedSlug } = useSidebarSelection();

  return (
    <SidebarMenuButton asChild isActive={currentSlug === slug} size='lg'>
      <button onClick={handleClick} className="font-bold text-base md:text-lg xl:text-2xl 2xl:text-5xl tracking-tight">
        {title}
      </button>
    </SidebarMenuButton>
  );
}
