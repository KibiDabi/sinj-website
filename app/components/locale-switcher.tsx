import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleSwitcherSelect from "./locale-switcher-select";

const flagClassMap: Record<string, string> = {
  hr: "hr",
  en: "gb",
  de: "de",
};

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          <span className="flex items-center text-base xl:text-2xl 2xl:text-sm gap-1 xl:gap-3 2xl:gap-2">
            <span
              className={`fi fi-${flagClassMap[cur]} fis text-sm xl:text-2xl 2xl:text-sm`}
            />
            {t(`locale.${cur}`)}
          </span>
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
