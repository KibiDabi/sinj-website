import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <SidebarInset className="bg-gradient-to-r from-red-200 to-red-600">
        <div
          className="flex  w-full pt-10 "
          style={{ height: "calc(100vh - 56px)" }}
        >
          <AppSidebar className="h-full" style={{ position: "relative" }} />
          
          <div className="flex-1  flex flex-col p-2 overflow-hidden">
            <div className=" w-full max-w-5xl mx-auto px-4 flex-1 flex">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 flex-1">
                <h2 className="text-2xl font-bold mb-4">Pobuna Srba</h2>
                <p className="leading-relaxed text-base sm:text-lg">
                  Sinj, 7. IV. 1990. – Skupština Viteškog alkarskog društva
                  danas je...
                </p>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
