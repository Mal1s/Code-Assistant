import type { City } from "../data/cities";
import { Link } from "wouter";

export default function CityRequestPage({ city }: { city: City }) {
  return (
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
            {city.name}
          </span>
        </nav>
        <p className="mb-3 font-bold uppercase tracking-widest text-[#f05a28]">
          Перевозки по предварительной заявке
        </p>
        <h1 className="mb-5 text-3xl font-black text-[#0b1a33] md:text-5xl">
          Грузоперевозки Тверь — {city.name}
        </h1>
        <p className="mb-5 text-lg leading-relaxed text-slate-700">
          АЛМИК организует перевозки по направлению Тверь — {city.name} по
          предварительному запросу. Возможность рейса, транспорт, дата подачи и
          стоимость подтверждаются после уточнения маршрута и параметров груза.
        </p>
        <p className="mb-8 leading-relaxed text-slate-500">
          База компании находится в Твери. Эта страница не означает наличие
          филиала или постоянного автопарка в этом городе.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="tel:+79011172371"
            className="rounded-xl bg-[#f05a28] px-6 py-4 font-black text-white hover:bg-[#d44a1d]"
          >
            Уточнить маршрут: +7 (901) 117-23-71
          </a>
          <Link
            href="/perevozki-po-rossii/"
            className="rounded-xl border border-slate-300 px-6 py-4 font-bold text-[#0b1a33] hover:border-[#f05a28]"
          >
            Условия перевозок по России
          </Link>
        </div>
      </article>
    </main>
  );
}
