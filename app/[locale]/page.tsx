export const dynamic = "force-dynamic";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import ContentSwitcher from "../components/content-switcher";
import { Suspense, use } from "react";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  return (
    <div className="flex h-full w-full">
      <SidebarInset className="bg-transparent">
        <div className="layout-row gap-14">
          <AppSidebar
            locale={locale}
            className="h-full w-(--sidebar-width)"
            style={{ position: "relative" }}
          />
          <Suspense>
            <ContentSwitcher locale={locale} className="px-4 sm:px-6 md:px-8 h-full min-h-0 overflow-y-auto" />
          </Suspense>
        </div>
      </SidebarInset>
    </div>
  );
}
