import fs from "fs";
import path from "path";
import { chapterTitles } from '../lib/chapterTitles.js';

const inputBaseDir = path.join(process.cwd(), "chapters-txt");
const outputBaseDir = path.join(process.cwd(), "chapters");

// jezici koje očekujemo
const languages = ["hr", "en", "de"];

// funkcija za brisanje foldera rekuzivno
function clearFolder(folderPath) {
  if (!fs.existsSync(folderPath)) return;

  fs.readdirSync(folderPath).forEach((file) => {
    const curPath = path.join(folderPath, file);
    if (fs.lstatSync(curPath).isDirectory()) {
      clearFolder(curPath);
      fs.rmdirSync(curPath);
    } else {
      fs.unlinkSync(curPath);
    }
  });
}

function convertTextToJson(slug, title, text) {
  // dijeli po dvostrukim newlineovima (odlomci)
  const paragraphs = text.split(/\n\s*\n/);

  const content = paragraphs.map((p) => {
    const trimmed = p.trim();

    // HEADING level 2
    if (trimmed.startsWith("## ")) {
      return {
        type: "heading",
        level: 2,
        text: trimmed.replace(/^##\s+/, ""),
      };
    }

    // HEADING level 3
    if (trimmed.startsWith("### ")) {
      return {
        type: "heading",
        level: 3,
        text: trimmed.replace(/^###\s+/, ""),
      };
    }

    // IMAGE
    const imageMatch = trimmed.match(/\[IMAGE:(.+?)(?:\|(.+))?\]/);
    if (imageMatch) {
      return {
        type: "image",
        src: `/images/${imageMatch[1].trim()}`,
        alt: imageMatch[1].trim().split(".")[0],
        caption: imageMatch[2] ? imageMatch[2].trim() : null, // podržava caption poslije pipe-a
      };
    }

    // LIST (natuknice)
    const lines = trimmed.split("\n").map((l) => l.trim());
    if (lines.every((line) => /^(•|\-)\s+/.test(line))) {
      return {
        type: "list",
        items: lines.map((line) => line.replace(/^(•|\-)\s+/, "")),
      };
    }

    // DEFAULT = paragraph
    return {
      type: "paragraph",
      text: trimmed.replace(/\n/g, "\\n"),
    };
  });

  return { slug, title, content };
}

// === MAIN ===
languages.forEach((lang) => {
  const inputDir = path.join(inputBaseDir, lang);
  const outputDir = path.join(outputBaseDir, lang);

  if (!fs.existsSync(inputDir)) {
    console.warn(`⚠️ Folder ${inputDir} ne postoji, preskačem...`);
    return;
  }

  // očisti output folder prije pisanja
  if (fs.existsSync(outputDir)) clearFolder(outputDir);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });


  fs.readdirSync(inputDir).forEach((file) => {
    if (file.endsWith(".txt")) {
      const base = path.basename(file, ".txt");
      const slug = base.toLowerCase().replace(/\s+/g, "-");

      const inputText = fs.readFileSync(path.join(inputDir, file), "utf-8");
      // Promjena generiranja title
      const title = chapterTitles[lang]?.[base] || base;
      const json = convertTextToJson(slug, title, inputText);

      const outFile = path.join(outputDir, `${base}.json`);
      fs.writeFileSync(outFile, JSON.stringify(json, null, 2), "utf-8");

      console.log(`✅ ${lang.toUpperCase()} | ${file} → ${outFile}`);
    }
  });
});
