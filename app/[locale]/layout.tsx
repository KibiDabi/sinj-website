import { NextIntlClientProvider, hasLocale, Locale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "../components/Navbar";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Geist, Geist_Mono } from "next/font/google";
import 'flag-icons/css/flag-icons.min.css';
import '@/app/globals.css'

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, "children">) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: "LocaleSwitcher" });

  return {
    title: t("label"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={` ${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden`}>
        <NextIntlClientProvider>
          <div className="flex flex-col fixed inset-0">
          <Navbar />
          <div className="flex-1 flex overflow-hidden">
          <SidebarProvider>
            <main className="flex flex-1 min-h-[calc(100vh-4rem)] 2xl:min-h-[calc(100vh-5rem)] bg-custom-image bg-cover bg-center overflow-auto">
              {children}
            </main>
          </SidebarProvider>
          </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
