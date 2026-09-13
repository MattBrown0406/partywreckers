import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const distDir = path.join(projectRoot, "dist");
const serverEntry = path.join(distDir, "server", "entry-server.js");
const manifestPath = path.join(distDir, "prerender-routes.json");
const indexHtmlPath = path.join(distDir, "index.html");

const { render } = await import(pathToFileURL(serverEntry).href);
const { routes } = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const template = fs
  .readFileSync(indexHtmlPath, "utf8")
  .replace(/\s*<title>.*?<\/title>/s, "");

for (const route of [...routes, "/funnel-report", "/404"]) {
  const { appHtml, headTags, htmlAttributes, bodyAttributes } = render(route);
  const html = template
    .replace("<html lang=\"en\">", `<html lang="en"${htmlAttributes ? ` ${htmlAttributes}` : ""}>`)
    .replace("<body>", `<body${bodyAttributes ? ` ${bodyAttributes}` : ""}>`)
    .replace("</head>", `${headTags}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const outputDir = route === "/" ? distDir : path.join(distDir, route.slice(1));
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "index.html"), html);
  if (route !== "/") fs.writeFileSync(path.join(distDir, `${route.slice(1)}.html`), html);
}

console.log(`Prerendered ${routes.length} routes.`);
