import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getAllChaptersMeta } from "@/lib/chapters";
import SidebarItem from "@/app/components/sidebar-item";
import SidebarReset from "@/app/components/sidebar-reset-button";

export function AppSidebar({locale, ...props }: React.ComponentProps<typeof Sidebar> & { locale:string }) {
  const chapters = getAllChaptersMeta(locale);

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild className="text-lg md:text-xl 2xl:text-3xl">
              <a href="#">
                <SidebarReset />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1 md:gap-1 xl:gap-1 2xl:gap-8">
            {chapters.map((chapter) => (
              <SidebarMenuItem key={chapter.slug}>
                <SidebarItem slug={chapter.slug} title={chapter.title} />
                {/* {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null} */}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
