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
      <div className="relative flex items-center justify-between w-full"
        style={{
          height: "clamp(3rem, 5vw, 6rem)", // navbar height scales with viewport
           paddingInline: "clamp(1rem, 2vw, 3rem)", // consistent horizontal padding
        }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <h1 className="font-medium"
                      style={{
                        fontSize: "clamp(1rem, 2vw, 2rem)", // responsive title
                      }}>
                      {" "}
                      {t('title')}
                    </h1>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="absolute right-8"
          style={{
            right: "clamp(2rem, 5vw, 9rem)", // responsive right margin
          }}>
        <LocaleSwitcher />
        </div>
      </div>
    </nav>
  );
}
