
export const dynamic = 'force-dynamic';

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ContentSwitcher from "../components/content-switcher";
import { Suspense, use } from "react";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "clamp(25rem, 30vw, 41rem)",
        } as React.CSSProperties
      }
    >
      <div className="flex h-full w-full">
        <SidebarInset className="bg-transparent">
          <div
            className="flex  w-full pt-10 2xl:pt-18 h-[calc(100vh-56px)]"
            style={{ height: "calc(100vh - 56px)" }}
          >
            <AppSidebar
              locale={locale}
              className="h-full"
              style={{ position: "relative" }}
            />
            <Suspense>
              <div className="flex-1 flex flex-col h-full">
          <ContentSwitcher locale={locale} />
        </div>
            </Suspense>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
