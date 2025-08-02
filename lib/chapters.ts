import fs from "fs";
import path from "path";
import { Locale } from "next-intl";

// const chaptersDir = path.join(process.cwd(), "chapters");

export function getAllChaptersMeta(locale: Locale) {

  const localeDir = path.join(process.cwd(), "chapters", locale)
  const files = fs.readdirSync(localeDir);

  return files.map((file) => {
    const slug = file.replace(/\.json$/, "");
    const content = JSON.parse(fs.readFileSync(path.join(localeDir, file), "utf8"));
    return {
      slug,
      title: content.title,
    };
  });
}

export function getChapterBySlug(slug: string, locale: Locale) {
  const filePath = path.join(process.cwd(), "chapters", locale, `${slug}.json`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent);
}
