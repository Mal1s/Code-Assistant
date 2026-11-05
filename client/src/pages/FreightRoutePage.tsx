import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { freightRoutes } from "../data/routes";
import NotFound from "./not-found";

export default function FreightRoutePage() {
  const { routeSlug } = useParams<{ routeSlug: string }>();
  const route = freightRoutes[routeSlug ?? ""];

  if (!route) return <NotFound />;

  const canonical = `https://almik-logistic.ru/marshrut/${routeSlug}/`;

  return (
    <>
      <Helmet>
        <title>Перевозка груза: {route.from} — {route.to} | АЛМИК</title>
        <meta
          name="description"
          content={`Перевозка груза по направлению ${route.from} — ${route.to}. Расчёт маршрута, транспорта и стоимости по заявке.`}
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <main className="min-h-screen bg-[#f8faff] px-4 pb-16 pt-24">
        <article className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-sm md:p-10">
          <nav aria-label="Хлебные крошки" className="mb-8 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#f05a28]">Главная</Link>
            <span className="mx-2">/</span>
            <Link href="/perevozki-po-rossii/" className="hover:text-[#f05a28]">
              Перевозки по России
            </Link>
            <span className="mx-2">/</span>
            <span aria-current="page" className="font-bold text-[#f05a28]">
              {route.from} — {route.to}
            </span>
          </nav>
          <h1 className="mb-5 text-3xl font-black text-[#0b1a33] md:text-5xl">
            Перевозка груза: {route.from} — {route.to}
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-slate-700">
            АЛМИК базируется в Твери и организует рейсы по предварительной
            заявке. Возможность перевозки, дата и стоимость подтверждаются
            индивидуально после уточнения груза и адресов.
          </p>
          <dl className="mb-8 grid gap-3 rounded-2xl bg-slate-50 p-5 sm:grid-cols-3">
            <div>
              <dt className="text-sm text-slate-500">Ориентир по расстоянию</dt>
              <dd className="font-bold text-[#0b1a33]">{route.distance}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Ориентир по времени</dt>
              <dd className="font-bold text-[#0b1a33]">{route.time}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Цена из справочника сайта</dt>
              <dd className="font-bold text-[#0b1a33]">{route.price}</dd>
            </div>
          </dl>
          <p className="mb-8 text-sm leading-relaxed text-slate-500">
            Указанные расстояние, время и цена являются ориентирами из
            материалов сайта и не заменяют расчёт по конкретному заказу.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+79011172371"
              className="rounded-xl bg-[#f05a28] px-6 py-4 font-black text-white hover:bg-[#d44a1d]"
            >
              Рассчитать перевозку
            </a>
            <Link
              href="/perevozki-po-rossii/"
              className="rounded-xl border border-slate-300 px-6 py-4 font-bold text-[#0b1a33] hover:border-[#f05a28]"
            >
              Перевозки по России
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
