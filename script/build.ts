import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { cp, mkdir, readFile, readdir, rm, writeFile } from "fs/promises";
import path from "path";
import { cities } from "../client/src/data/cities";
import { services } from "../client/src/data/services";
import {
  freightRoutes,
  getFreightRouteSlug,
} from "../client/src/data/routes";

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
};

const staticRoutes: SeoRoute[] = [
  {
    routePath: "/",
    title: "Грузоперевозки по России из Твери по заявке | АЛМИК",
    description:
      "АЛМИК организует грузоперевозки по России по предварительной заявке. База в Твери. Маршрут, транспорт, дата и стоимость подтверждаются индивидуально.",
    includeInSitemap: true,
  },
  {
    routePath: "/o-kompanii",
    title: "О компании АЛМИК — транспортная компания из Твери",
    description:
      "ООО «АЛМИК» — транспортная компания с базой в Твери. Организуем грузоперевозки по России по предварительной заявке.",
    includeInSitemap: true,
  },
  {
    routePath: "/kontakty",
    title: "Контакты АЛМИК — заказать грузоперевозку",
    description:
      "Свяжитесь с транспортной компанией АЛМИК: +7 (901) 117-23-71, almik.ks@yandex.ru. База компании находится в Твери.",
    includeInSitemap: true,
  },
  {
    routePath: "/perevozki-po-rossii",
    title: "Грузоперевозки по России из Твери — по заявке | АЛМИК",
    description:
      "Перевозки по России по предварительному запросу. База АЛМИК — в Твери; маршрут, транспорт, дата подачи и стоимость подтверждаются для каждого заказа.",
    includeInSitemap: true,
  },
  {
    routePath: "/vakansii",
    title: "Вакансии АЛМИК — работа в транспортной компании",
    description:
      "Вакансии транспортной компании АЛМИК для водителей и специалистов по логистике.",
    includeInSitemap: false,
  },
  {
    routePath: "/karta-sayta",
    title: "Карта сайта АЛМИК",
    description:
      "Карта сайта транспортной компании АЛМИК: услуги, города присутствия и полезные разделы.",
    includeInSitemap: false,
  },
  {
    routePath: "/sotrudnichestvo",
    title: "Сотрудничество с АЛМИК — грузоперевозки для бизнеса",
    description:
      "Сотрудничество с транспортной компанией АЛМИК для юридических лиц, поставщиков и постоянных клиентов.",
    includeInSitemap: false,
  },
  {
    routePath: "/dlya-voditeley",
    title: "Для водителей — сотрудничество с АЛМИК",
    description:
      "Информация для водителей, которые хотят сотрудничать с транспортной компанией АЛМИК.",
    includeInSitemap: false,
  },
  {
    routePath: "/blog",
    title: "Блог АЛМИК — грузоперевозки и логистика",
    description:
      "Полезные материалы о грузоперевозках, логистике, переездах и выборе транспорта.",
    includeInSitemap: false,
  },
  {
    routePath: "/politika-konfidencialnosti",
    title: "Политика конфиденциальности — АЛМИК",
    description: "Политика обработки персональных данных на сайте АЛМИК.",
    includeInSitemap: false,
  },
  {
    routePath: "/polzovatelskoe-soglashenie",
    title: "Пользовательское соглашение — АЛМИК",
    description: "Пользовательское соглашение сайта АЛМИК.",
    includeInSitemap: false,
  },
  {
    routePath: "/rekvizity",
    title: "Реквизиты ООО «АЛМИК»",
    description: "Реквизиты транспортной компании ООО «АЛМИК».",
    includeInSitemap: false,
  },
  {
    routePath: "/dogovor-oferta",
    title: "Договор-оферта — АЛМИК",
    description: "Договор-оферта транспортной компании АЛМИК.",
    includeInSitemap: false,
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
      title:
        city.slug === "tver"
          ? "Грузоперевозки в Твери по заявке | АЛМИК"
          : `Грузоперевозки Тверь — ${city.name} по заявке | АЛМИК`,
      description:
        city.slug === "tver"
          ? "База транспортной компании АЛМИК находится в Твери. Грузоперевозки по городу, области и России согласуются по предварительной заявке."
          : `Перевозка по направлению Тверь — ${city.name} по предварительному запросу. Наличие транспорта, сроки и стоимость уточняются индивидуально.`,
      includeInSitemap: city.slug === "tver",
    })),
    ...Object.values(services).map((service) => ({
      routePath: `/uslugi/${service.slug}`,
      title: service.title,
      description: service.description,
      includeInSitemap: true,
    })),
    ...getIndexedContentRouteSlugs().map((slug) => {
      const route = freightRoutes[slug];
      return {
        routePath: `/marshrut/${slug}`,
        title: `Перевозка груза: ${route.from} — ${route.to} | АЛМИК`,
        description: `Перевозка по направлению ${route.from} — ${route.to}. Возможность рейса и стоимость уточняются по заявке.`,
        includeInSitemap: false,
      };
    }),
  ];
}

function getAllStaticRoutes(seoRoutes: SeoRoute[]) {
  const routePaths = new Set(seoRoutes.map(({ routePath }) => routePath));

  return [...routePaths];
}

function getIndexedContentRouteSlugs() {
  const routeSlugs = new Set<string>();
  const tver = cities.tver;

  for (const route of tver.popularRoutes) {
    routeSlugs.add(getFreightRouteSlug(route.from, route.to));
  }
  for (const service of Object.values(services)) {
    for (const route of service.popularRoutes) {
      routeSlugs.add(getFreightRouteSlug(route.from, route.to));
    }
  }

  return [...routeSlugs].filter((slug) => freightRoutes[slug]);
}

function canonicalUrl(routePath: string) {
  return `${SITE_URL}${routePath === "/" ? "/" : `${routePath.replace(/\/+$/, "")}/`}`;
}

function stripLegacySeoMarkup(html: string) {
  const usefulMetaNames = new Set([
    "author",
    "apple-mobile-web-app-capable",
    "apple-mobile-web-app-title",
    "application-name",
    "copyright",
    "format-detection",
    "google-site-verification",
    "msapplication-config",
    "msapplication-starturl",
    "msapplication-tilecolor",
    "msapplication-tooltip",
    "msvalidate.01",
    "theme-color",
    "viewport",
    "yandex-verification",
  ]);

  return html
    .replace(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
      "",
    )
    .replace(/<link\b[^>]*rel=["']alternate["'][^>]*hreflang=["'][^"']+["'][^>]*\/?>/gi, "")
    .replace(/<meta\s+http-equiv=["'](?:cache-control|pragma|expires)["'][^>]*>/gi, "")
    .replace(/<meta\b[^>]*>/gi, (tag) => {
      if (/^<meta\s+(?:charset|property|http-equiv)=/i.test(tag)) return tag;
      const name = tag.match(/\bname=["']([^"']+)["']/i)?.[1]?.toLowerCase();
      return name && usefulMetaNames.has(name) ? tag : "";
    });
}

function jsonLd(route: SeoRoute) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "ООО «АЛМИК»",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon-512.png`,
    telephone: "+7-901-117-23-71",
    email: "almik.ks@yandex.ru",
    areaServed: { "@type": "Country", name: "Россия" },
    sameAs: ["https://t.me/Obormotka_byaka", "https://wa.me/79011172371"],
  };
  const graph: object[] = [organization];

  if (route.routePath === "/") {
    graph.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "АЛМИК",
      inLanguage: "ru-RU",
      publisher: { "@id": `${SITE_URL}/#organization` },
    });
  }

  if (route.routePath === "/perevozki-po-rossii") {
    graph.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Грузоперевозки по России по предварительной заявке",
      description: route.description,
      url: canonicalUrl(route.routePath),
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "Россия" },
    });
  }

  const serviceMatch = route.routePath.match(/^\/uslugi\/([^/]+)$/);
  const service = serviceMatch ? services[serviceMatch[1]] : undefined;
  if (service) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonicalUrl(route.routePath)}#service`,
      name: service.name,
      description: service.description,
      url: canonicalUrl(route.routePath),
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "Россия" },
    });
  }

  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")}</script>`;
}

function renderTextParagraphs(text: string) {
  return text
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("\n");
}

function renderRouteContent(route: SeoRoute) {
  const cityMatch = route.routePath.match(/^\/gorod\/([^/]+)$/);
  const city = cityMatch ? cities[cityMatch[1]] : undefined;
  if (city && city.slug !== "tver") {
    return `<main class="seo-fallback"><p class="seo-eyebrow">Перевозки по предварительной заявке</p><h1>Грузоперевозки Тверь — ${escapeHtml(city.name)}</h1><p>АЛМИК организует перевозки по направлению Тверь — ${escapeHtml(city.name)} по предварительному запросу. Возможность рейса, транспорт, дата подачи и стоимость подтверждаются после уточнения маршрута и параметров груза.</p><p>База компании находится в Твери. Филиал или постоянный автопарк в этом городе не заявляется.</p><p><a href="tel:+79011172371">Уточнить маршрут: +7 (901) 117-23-71</a></p><p><a href="/perevozki-po-rossii/">Условия перевозок по России</a></p></main>`;
  }

  const serviceMatch = route.routePath.match(/^\/uslugi\/([^/]+)$/);
  const service = serviceMatch ? services[serviceMatch[1]] : undefined;
  if (service) {
    const features = service.features
      .map(
        (feature) =>
          `<li><strong>${escapeHtml(feature.label)}:</strong> ${escapeHtml(feature.value)}</li>`,
      )
      .join("");
    const suitableFor = service.suitableFor
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
    return `<main class="seo-fallback"><h1>${escapeHtml(service.name)}</h1><p>${escapeHtml(service.description)}</p><ul>${features}</ul><h2>Подробное описание</h2>${renderTextParagraphs(service.fullText)}<h2>Подходит для перевозки</h2><ul>${suitableFor}</ul><p><a href="tel:+79011172371">Уточнить условия: +7 (901) 117-23-71</a></p></main>`;
  }

  const routeMatch = route.routePath.match(/^\/marshrut\/([^/]+)$/);
  const freightRoute = routeMatch ? freightRoutes[routeMatch[1]] : undefined;
  if (freightRoute) {
    return `<main class="seo-fallback"><h1>Перевозка груза: ${escapeHtml(freightRoute.from)} — ${escapeHtml(freightRoute.to)}</h1><p>АЛМИК базируется в Твери и организует рейсы по предварительной заявке. Возможность перевозки, дата и стоимость подтверждаются индивидуально после уточнения груза и адресов.</p><p>Ориентиры из материалов сайта: расстояние — ${escapeHtml(freightRoute.distance)}, время — ${escapeHtml(freightRoute.time)}, цена — ${escapeHtml(freightRoute.price)}. Итоговые условия рассчитываются отдельно.</p><p><a href="/perevozki-po-rossii/">Перевозки по России</a></p></main>`;
  }

  switch (route.routePath) {
    case "/":
      return `<main class="seo-fallback"><h1>Грузоперевозки по России из Твери</h1><p>${escapeHtml(route.description)}</p><p><a href="/perevozki-po-rossii/">Условия перевозок по России</a></p><p><a href="/kontakty/">Контакты</a></p></main>`;
    case "/perevozki-po-rossii":
      return `<main class="seo-fallback"><h1>Грузоперевозки по России из Твери — по заявке</h1><p>АЛМИК организует перевозки по предварительному запросу. Маршрут, доступность транспорта, дата подачи и стоимость подтверждаются индивидуально после получения параметров груза.</p><h2>Как заказать перевозку</h2><ol><li>Сообщите города отправления и доставки, тип груза, вес, габариты и желаемую дату.</li><li>Менеджер уточнит возможность рейса, подходящий транспорт, сроки и стоимость.</li><li>До подтверждения заказа согласуйте условия и необходимые документы.</li></ol><p>Компания базируется в Твери. Наличие офиса или постоянного автопарка в каждом городе не заявляется.</p><p><a href="tel:+79011172371">+7 (901) 117-23-71</a></p></main>`;
    case "/o-kompanii":
      return `<main class="seo-fallback"><h1>Транспортная компания АЛМИК</h1><p>ООО «АЛМИК» — транспортная компания с базой в Твери. Компания организует грузоперевозки по России по предварительной заявке.</p><p>Доступность транспорта, срок подачи и стоимость подтверждаются индивидуально до оформления заказа.</p><p>ИНН 6900000798. ОГРН 1236900010380.</p><p><a href="/perevozki-po-rossii/">Перевозки по России</a></p><p><a href="/kontakty/">Контакты</a></p></main>`;
    case "/kontakty":
      return `<main class="seo-fallback"><h1>Контакты транспортной компании АЛМИК</h1><p>База компании находится в Твери.</p><p>Телефон: <a href="tel:+79011172371">+7 (901) 117-23-71</a></p><p>Электронная почта: <a href="mailto:almik.ks@yandex.ru">almik.ks@yandex.ru</a></p><p>Офис: Тверь, проспект Калинина, дом 17, офис 316. Перед визитом подтвердите время по телефону.</p></main>`;
    default:
      return `<main class="seo-fallback"><h1>${escapeHtml(route.title)}</h1><p>${escapeHtml(route.description)}</p><p><a href="/">На главную</a></p></main>`;
  }
}

function withRouteSeo(html: string, route: SeoRoute) {
  const canonical = canonicalUrl(route.routePath);
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const canonicalHtml = escapeHtml(canonical);
  const robots = route.includeInSitemap
    ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    : "noindex, follow";
  const seoTags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    `<meta name="robots" content="${robots}">`,
    `<link rel="canonical" href="${canonicalHtml}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:url" content="${canonicalHtml}">`,
    `<meta property="og:image" content="${SITE_URL}/opengraph.jpg">`,
    `<meta property="og:locale" content="ru_RU">`,
    `<meta property="og:site_name" content="АЛМИК">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<meta name="twitter:image" content="${SITE_URL}/opengraph.jpg">`,
    jsonLd(route),
  ].join("\n  ");
  const cleanHtml = stripLegacySeoMarkup(html)
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta name=["']description["'][^>]*>/gi, "")
    .replace(/<meta name=["']robots["'][^>]*>/gi, "")
    .replace(/<link rel=["']canonical["'][^>]*\/?>/gi, "")
    .replace(/<meta property=["']og:(?:type|title|description|url|image|locale|site_name)["'][^>]*>/gi, "")
    .replace(/<meta name=["']twitter:(?:card|title|description|image)["'][^>]*>/gi, "");
  const withHead = cleanHtml.replace("</head>", `  ${seoTags}\n</head>`);
  const rootMarkup = `<div id="root">${renderRouteContent(route)}</div>`;
  return withHead.replace(/<div id="root"><\/div>/i, rootMarkup);
}

function createSitemap(routes: SeoRoute[]) {
  const urls = routes
    .filter((route) => route.includeInSitemap)
    .map(
      (route) =>
        `  <url>\n    <loc>${escapeXml(canonicalUrl(route.routePath))}</loc>\n  </url>`,
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
    const routeMeta =
      seoRoutes.find((seoRoute) => seoRoute.routePath === route) ??
      ({
        routePath: route,
        title: "АЛМИК — грузоперевозки по России и СНГ",
        description:
          "Грузоперевозки по России и СНГ на собственном автопарке АЛМИК.",
        includeInSitemap: false,
      } satisfies SeoRoute);

    if (route === "/") {
      await writeFile(
        path.join(publicPath, "index.html"),
        withRouteSeo(indexHtml, routeMeta),
        "utf-8",
      );
      continue;
    }

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

async function copyStaticSiteToRepositoryRoot(publicPath: string) {
  const rootPath = path.resolve(".");
  for (const entry of await readdir(publicPath, { withFileTypes: true })) {
    const source = path.join(publicPath, entry.name);
    const destination = path.join(rootPath, entry.name);
    await cp(source, destination, { recursive: true, force: true });
  }
}

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();
  console.log("preparing static SEO routes for GitHub Pages...");
  await prepareStaticSeoPages();
  console.log("syncing GitHub Pages files to the repository root...");
  await copyStaticSiteToRepositoryRoot(path.resolve("dist/public"));

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
