import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { cities } from "../data/cities";
import { services } from "../data/services";

const SITE_URL = "https://almik-logistic.ru";

const staticSeo: Record<
  string,
  { title: string; description: string; index: boolean }
> = {
  "/": {
    title: "Грузоперевозки по России и СНГ от 1.5 до 20 тонн | АЛМИК Тверь",
    description:
      "Грузоперевозки по России и СНГ от 1.5 до 20 тонн. Собственный автопарк: фуры, тралы, манипуляторы и Газели. Расчёт стоимости за 15 минут.",
    index: true,
  },
  "/o-kompanii": {
    title: "О компании АЛМИК — грузоперевозки по России и СНГ",
    description:
      "АЛМИК — транспортная компания из Твери. Собственный автопарк, официальные договоры и грузоперевозки по России и СНГ.",
    index: true,
  },
  "/kontakty": {
    title: "Контакты АЛМИК — заказать грузоперевозку",
    description:
      "Контакты транспортной компании АЛМИК в Твери. Закажите грузоперевозку по телефону или оставьте заявку онлайн.",
    index: true,
  },
  "/vakansii": {
    title: "Вакансии АЛМИК — работа в транспортной компании",
    description:
      "Вакансии транспортной компании АЛМИК для водителей и специалистов по логистике.",
    index: true,
  },
  "/karta-sayta": {
    title: "Карта сайта АЛМИК",
    description:
      "Карта сайта транспортной компании АЛМИК: услуги, города присутствия и полезные разделы.",
    index: true,
  },
  "/sotrudnichestvo": {
    title: "Сотрудничество с АЛМИК — грузоперевозки для бизнеса",
    description:
      "Сотрудничество с транспортной компанией АЛМИК для юридических лиц, поставщиков и постоянных клиентов.",
    index: true,
  },
  "/dlya-voditeley": {
    title: "Для водителей — сотрудничество с АЛМИК",
    description:
      "Информация для водителей, которые хотят сотрудничать с транспортной компанией АЛМИК.",
    index: true,
  },
  "/blog": {
    title: "Блог АЛМИК — грузоперевозки и логистика",
    description:
      "Полезные материалы о грузоперевозках, логистике, переездах и выборе транспорта.",
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
  const city = cityMatch ? cities[cityMatch[1]] : undefined;
  const service = serviceMatch ? services[serviceMatch[1]] : undefined;
  const staticMeta = staticSeo[pathname];
  const meta = city
    ? { title: city.title, description: city.description, index: true }
    : service
      ? { title: service.title, description: service.description, index: true }
      : staticMeta;

  const title = meta?.title ?? "Страница не найдена — АЛМИК";
  const description =
    meta?.description ?? "Запрошенная страница не существует.";
  const canonical = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
  const robots = meta?.index
    ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    : "noindex, follow";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
    </Helmet>
  );
}