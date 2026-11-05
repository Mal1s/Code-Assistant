import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { cities } from "../data/cities";
import { services } from "../data/services";
import { freightRoutes } from "../data/routes";

const SITE_URL = "https://almik-logistic.ru";

const staticSeo: Record<
  string,
  { title: string; description: string; index: boolean }
> = {
  "/": {
    title: "Грузоперевозки по России из Твери по заявке | АЛМИК",
    description:
      "АЛМИК организует грузоперевозки по России по предварительной заявке. База в Твери. Маршрут, транспорт, дата и стоимость подтверждаются индивидуально.",
    index: true,
  },
  "/perevozki-po-rossii": {
    title: "Грузоперевозки по России из Твери — по заявке | АЛМИК",
    description:
      "Перевозки по России по предварительному запросу. База АЛМИК — в Твери; маршрут, транспорт, дата подачи и стоимость подтверждаются для каждого заказа.",
    index: true,
  },
  "/o-kompanii": {
    title: "О компании АЛМИК — транспортная компания из Твери",
    description:
      "ООО «АЛМИК» — транспортная компания с базой в Твери. Организуем грузоперевозки по России по предварительной заявке.",
    index: true,
  },
  "/kontakty": {
    title: "Контакты АЛМИК — заказать грузоперевозку",
    description:
      "Свяжитесь с транспортной компанией АЛМИК: +7 (901) 117-23-71, almik.ks@yandex.ru. База компании находится в Твери.",
    index: true,
  },
  "/vakansii": {
    title: "Вакансии АЛМИК",
    description: "Вакансии и работа в транспортной компании АЛМИК.",
    index: false,
  },
  "/karta-sayta": {
    title: "Карта сайта АЛМИК",
    description: "Карта сайта транспортной компании АЛМИК.",
    index: false,
  },
  "/sotrudnichestvo": {
    title: "Сотрудничество с АЛМИК",
    description: "Информация о сотрудничестве с транспортной компанией АЛМИК.",
    index: false,
  },
  "/dlya-voditeley": {
    title: "Для водителей — АЛМИК",
    description: "Информация для водителей, заинтересованных в сотрудничестве с АЛМИК.",
    index: false,
  },
  "/blog": {
    title: "Блог АЛМИК",
    description: "Материалы о грузоперевозках и логистике.",
    index: false,
  },
};

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export default function RouteSeo() {
  const [location] = useLocation();
  const pathname = normalizePath(location.split("?")[0]);
  const cityMatch = pathname.match(/^\/gorod\/([^/]+)$/);
  const serviceMatch = pathname.match(/^\/uslugi\/([^/]+)$/);
  const routeMatch = pathname.match(/^\/marshrut\/([^/]+)$/);
  const city = cityMatch ? cities[cityMatch[1]] : undefined;
  const service = serviceMatch ? services[serviceMatch[1]] : undefined;
  const freightRoute = routeMatch ? freightRoutes[routeMatch[1]] : undefined;

  const cityMeta = city
    ? city.slug === "tver"
      ? {
          title: "Грузоперевозки в Твери по заявке | АЛМИК",
          description:
            "База транспортной компании АЛМИК находится в Твери. Грузоперевозки по городу, области и России согласуются по предварительной заявке.",
          index: true,
        }
      : {
          title: `Грузоперевозки из Твери в ${city.nameGenitive} по заявке | АЛМИК`,
          description: `Перевозка между Тверью и ${city.namePrepositional} по предварительному запросу. Наличие транспорта, сроки и стоимость уточняются индивидуально.`,
          index: false,
        }
    : undefined;

  const routeMeta = freightRoute
    ? {
        title: `Перевозка груза: ${freightRoute.from} — ${freightRoute.to} | АЛМИК`,
        description: `Перевозка по направлению ${freightRoute.from} — ${freightRoute.to}. Возможность рейса и стоимость уточняются по заявке.`,
        index: false,
      }
    : undefined;

  const meta = cityMeta ?? (
    service
      ? { title: service.title, description: service.description, index: true }
      : routeMeta ?? staticSeo[pathname]
  );

  const title = meta?.title ?? "Страница не найдена — АЛМИК";
  const description = meta?.description ?? "Запрошенная страница не существует.";
  const canonical = `${SITE_URL}${pathname === "/" ? "/" : `${pathname}/`}`;
  const robots = meta?.index ? "index, follow" : "noindex, follow";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${SITE_URL}/opengraph.jpg`} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content="АЛМИК" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/opengraph.jpg`} />
    </Helmet>
  );
}
