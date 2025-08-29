"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import LocaleSwitcher from "./locale-switcher";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("navbar");

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-b-black bg-black text-white">
      <div
        className="relative flex items-center justify-between w-full
                xl:h-[5.5rem] xl:px-12
                2xl:h-[3.5rem] 2xl:px-6"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <h1
                      className="font-medium
                             xl:text-3xl
                             2xl:text-xl"
                    >
                      {" "}
                      {t("title")}
                    </h1>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div
          className="absolute
                 xl:right-20
                 2xl:right-16"
        >
          <LocaleSwitcher />
        </div>
      </div>
    </nav>
  );
}
