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
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")} >
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          <span className="flex items-center"
            style={{
              fontSize: "clamp(1rem, 1.2vw, 2.5rem)", // scales option text
              gap: "clamp(0.25rem, 0.5vw, 1rem)", // scales spacing between flag and text
            }}>
          <span className={`fi fi-${flagClassMap[cur]} fis`}
              style={{ fontSize: "clamp(1rem, 1.2w, 2.5rem)" }} />
          {t(`locale.${cur}`)}
          </span>
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
