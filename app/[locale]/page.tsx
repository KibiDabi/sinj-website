import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ContentSwitcher from "../components/content-switcher";
import { use } from "react";

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {

    const { locale } = use(params);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "42rem",
        } as React.CSSProperties
      }
    >
      <div className="flex h-full w-full">
      <SidebarInset className="bg-transparent">
          <div
            className="flex  w-full pt-10 2xl:pt-18 "
            style={{ height: "calc(100vh - 56px)" }}
          >
            <AppSidebar locale={locale} className="h-full" style={{ position: "relative"}} />
            <ContentSwitcher locale={locale} />
          </div>
          
      </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
