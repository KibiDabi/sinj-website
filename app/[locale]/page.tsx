
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
          "--navbar-height": "58px",
        } as React.CSSProperties
      }
    >
      <div className="flex h-full w-full">
        <SidebarInset className="bg-transparent">
          <div
            className="flex gap-14 w-full  h-[calc(100vh-var(--navbar-height))] mt-[var(--navbar-height)]"
            
          >
            <AppSidebar
              locale={locale}
              className="h-full"
              style={{ position: "relative" }}
            />
            <Suspense>
              
          <ContentSwitcher locale={locale} className='px-8'/>
        
            </Suspense>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
