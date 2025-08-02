import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleSwitcherSelect from "./locale-switcher-select";

const flagClassMap: Record<string, string> = {
  hr: 'hr',
  en: 'gb',
  de: 'de',
}

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          <span className="flex items-center gap-2 2xl:text-3xl 2xl:gap-4">
          <span className={`fi fi-${flagClassMap[cur]} fis`} />
          {t(`locale.${cur}`)}
          </span>
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
