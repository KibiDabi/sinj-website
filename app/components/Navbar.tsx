'use client';

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

  const t = useTranslations('navbar');

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-b-black bg-black text-white">
      <div className="relative items-center justify-between flex h-14 2xl:h-28">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <h1 className="text-base font-medium xl:text-xl 2xl:text-3xl">
                      {" "}
                      {t('title')}
                    </h1>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="absolute right-8 2xl:right-36">
        <LocaleSwitcher />
        </div>
      </div>
    </nav>
  );
}
