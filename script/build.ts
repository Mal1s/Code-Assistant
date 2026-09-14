import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { mkdir, readFile, rm, writeFile } from "fs/promises";
import path from "path";
import { cities } from "../client/src/data/cities";
import { services } from "../client/src/data/services";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

const SITE_URL = "https://almik-logistic.ru";

type SeoRoute = {
  routePath: string;
  title: string;
  description: string;
  includeInSitemap: boolean;
  priority: string;
};

const staticRoutes: SeoRoute[] = [
  {
    routePath: "/",
    title: "Грузоперевозки по России и СНГ от 1.5 до 20 тонн | АЛМИК Тверь",
    description:
      "Грузоперевозки по России и СНГ от 1.5 до 20 тонн. Собственный автопарк: фуры, тралы, манипуляторы и Газели. Расчёт стоимости за 15 минут.",
    includeInSitemap: true,
    priority: "1.0",
  },
  {
    routePath: "/o-kompanii",
    title: "О компании АЛМИК — грузоперевозки по России и СНГ",
    description:
      "АЛМИК — транспортная компания из Твери. Собственный автопарк, официальные договоры и грузоперевозки по России и СНГ.",
    includeInSitemap: true,
    priority: "0.8",
  },
  {
    routePath: "/kontakty",
    title: "Контакты АЛМИК — заказать грузоперевозку",
    description:
      "Контакты транспортной компании АЛМИК в Твери. Закажите грузоперевозку по телефону или оставьте заявку онлайн.",
    includeInSitemap: true,
    priority: "0.8",
  },
  {
    routePath: "/vakansii",
    title: "Вакансии АЛМИК — работа в транспортной компании",
    description:
      "Вакансии транспортной компании АЛМИК для водителей и специалистов по логистике.",
    includeInSitemap: true,
    priority: "0.5",
  },
  {
    routePath: "/karta-sayta",
    title: "Карта сайта АЛМИК",
    description:
      "Карта сайта транспортной компании АЛМИК: услуги, города присутствия и полезные разделы.",
    includeInSitemap: true,
    priority: "0.5",
  },
  {
    routePath: "/sotrudnichestvo",
    title: "Сотрудничество с АЛМИК — грузоперевозки для бизнеса",
    description:
      "Сотрудничество с транспортной компанией АЛМИК для юридических лиц, поставщиков и постоянных клиентов.",
    includeInSitemap: true,
    priority: "0.5",
  },
  {
    routePath: "/dlya-voditeley",
    title: "Для водителей — сотрудничество с АЛМИК",
    description:
      "Информация для водителей, которые хотят сотрудничать с транспортной компанией АЛМИК.",
    includeInSitemap: true,
    priority: "0.5",
  },
  {
    routePath: "/blog",
    title: "Блог АЛМИК — грузоперевозки и логистика",
    description:
      "Полезные материалы о грузоперевозках, логистике, переездах и выборе транспорта.",
    includeInSitemap: false,
    priority: "0.4",
  },
  {
    routePath: "/politika-konfidencialnosti",
    title: "Политика конфиденциальности — АЛМИК",
    description: "Политика обработки персональных данных на сайте АЛМИК.",
    includeInSitemap: false,
    priority: "0.2",
  },
  {
    routePath: "/polzovatelskoe-soglashenie",
    title: "Пользовательское соглашение — АЛМИК",
    description: "Пользовательское соглашение сайта АЛМИК.",
    includeInSitemap: false,
    priority: "0.2",
  },
  {
    routePath: "/rekvizity",
    title: "Реквизиты ООО «АЛМИК»",
    description: "Реквизиты транспортной компании ООО «АЛМИК».",
    includeInSitemap: false,
    priority: "0.2",
  },
  {
    routePath: "/dogovor-oferta",
    title: "Договор-оферта — АЛМИК",
    description: "Договор-оферта транспортной компании АЛМИК.",
    includeInSitemap: false,
    priority: "0.2",
  },
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getSeoRoutes(): SeoRoute[] {
  return [
    ...staticRoutes,
    ...Object.values(cities).map((city) => ({
      routePath: `/gorod/${city.slug}`,
      title: city.title,
      description: city.description,
      includeInSitemap: true,
      priority: "0.8",
    })),
    ...Object.values(services).map((service) => ({
      routePath: `/uslugi/${service.slug}`,
      title: service.title,
      description: service.description,
      includeInSitemap: true,
      priority: "0.8",
    })),
  ];
}

function getAllStaticRoutes(seoRoutes: SeoRoute[]) {
  const routePaths = new Set(seoRoutes.map(({ routePath }) => routePath));

  // Service pages link to these routes. Keep them available on GitHub Pages
  // even though they are not indexed until they have dedicated route content.
  for (const service of Object.values(services)) {
    for (const route of service.popularRoutes) {
      routePaths.add(
        `/marshrut/${route.from.toLowerCase()}-${route.to
          .toLowerCase()
          .replace(/ /g, "-")}`,
      );
    }
  }

  return [...routePaths];
}

function withRouteSeo(html: string, route: SeoRoute) {
  const canonical = `${SITE_URL}${route.routePath === "/" ? "" : route.routePath}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const canonicalHtml = escapeHtml(canonical);
  const robots = route.includeInSitemap
    ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    : "noindex, follow";

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${description}">`,
    )
    .replace(
      /<meta name="robots" content="[^"]*"\s*\/?>/i,
      `<meta name="robots" content="${robots}">`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonicalHtml}">`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${title}">`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${description}">`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${canonicalHtml}">`,
    );
}

function createSitemap(routes: SeoRoute[]) {
  const urls = routes
    .filter((route) => route.includeInSitemap)
    .map(
      (route) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${route.routePath === "/" ? "" : route.routePath}`)}</loc>
    <changefreq>monthly</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function prepareStaticSeoPages() {
  const publicPath = path.resolve("dist/public");
  const indexHtml = await readFile(path.join(publicPath, "index.html"), "utf-8");
  const seoRoutes = getSeoRoutes();

  for (const route of getAllStaticRoutes(seoRoutes)) {
    if (route === "/") continue;

    const routeMeta =
      seoRoutes.find((seoRoute) => seoRoute.routePath === route) ??
      ({
        routePath: route,
        title: "АЛМИК — грузоперевозки по России и СНГ",
        description:
          "Грузоперевозки по России и СНГ на собственном автопарке АЛМИК.",
        includeInSitemap: false,
        priority: "0.2",
      } satisfies SeoRoute);

    const routeDirectory = path.join(publicPath, route.slice(1));
    await mkdir(routeDirectory, { recursive: true });
    await writeFile(
      path.join(routeDirectory, "index.html"),
      withRouteSeo(indexHtml, routeMeta),
      "utf-8",
    );
  }

  await writeFile(
    path.join(publicPath, "sitemap.xml"),
    createSitemap(seoRoutes),
    "utf-8",
  );
}

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();
  console.log("preparing static SEO routes for GitHub Pages...");
  await prepareStaticSeoPages();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
