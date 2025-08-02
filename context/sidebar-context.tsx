"use client";

import { createContext, useContext, useState } from "react";

const SidebarSelectionContext = createContext<{
  selectedSlug: string | null;
  setSelectedSlug: (slug: string | null) => void;
} | null>(null);

export default function SidebarSelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  return (
    <SidebarSelectionContext.Provider value={{ selectedSlug, setSelectedSlug }}>
      {children}
    </SidebarSelectionContext.Provider>
  );
}

export function useSidebarSelection() {

    const context = useContext(SidebarSelectionContext);

    if(!context) {
        throw new Error('useSidebarSelection must be used within SidebarSelectionProvider');
    }
    return context;
}
