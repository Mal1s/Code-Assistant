import { Link } from "wouter";
import { services } from "../data/services";

export default function CoveragePage() {
  return (
    <main className="min-h-screen bg-[#f8faff] px-4 pb-16 pt-24">
      <article className="mx-auto max-w-5xl">
        <nav aria-label="Хлебные крошки" className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#f05a28]">Главная</Link>
          <span className="mx-2">/</span>
          <span aria-current="page" className="font-bold text-[#f05a28]">
            Перевозки по России
          </span>
        </nav>

        <header className="mb-10 rounded-3xl bg-[#0b1a33] p-8 text-white shadow-xl md:p-12">
          <p className="mb-3 font-bold uppercase tracking-widest text-[#f05a28]">
            База компании — Тверь
          </p>
          <h1 className="mb-5 text-3xl font-black leading-tight md:text-5xl">
            Грузоперевозки по России из Твери — по заявке
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-200">
            АЛМИК организует перевозки по предварительному запросу. Маршрут,
            доступность транспорта, дата подачи и стоимость подтверждаются
            индивидуально после получения параметров груза.
          </p>
        </header>

        <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm md:p-9">
          <h2 className="mb-4 text-2xl font-black text-[#0b1a33]">
            Как заказать перевозку
          </h2>
          <ol className="list-decimal space-y-3 pl-6 leading-relaxed text-slate-700">
            <li>
              Сообщите города отправления и доставки, тип груза, вес, габариты
              и желаемую дату.
            </li>
            <li>
              Менеджер уточнит возможность рейса, подходящий транспорт,
              сроки и итоговую стоимость.
            </li>
            <li>
              До подтверждения заказа согласуйте условия и необходимые
              документы.
            </li>
          </ol>
          <p className="mt-5 text-sm leading-relaxed text-slate-500">
            Компания базируется в Твери. Наличие офиса или постоянного
            автопарка в каждом городе не заявляется: условия подачи
            подтверждаются для конкретного заказа.
          </p>
        </section>

        <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm md:p-9">
          <h2 className="mb-5 text-2xl font-black text-[#0b1a33]">
            Виды перевозок
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {Object.values(services).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/uslugi/${service.slug}/`}
                  className="block rounded-xl border border-slate-200 p-4 font-bold text-[#0b1a33] transition-colors hover:border-[#f05a28] hover:text-[#f05a28]"
                >
                  {service.name}
                  <span className="mt-1 block text-sm font-normal text-slate-500">
                    Подробнее об услуге
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border-2 border-[#f05a28] bg-white p-6 text-center shadow-sm md:p-9">
          <h2 className="mb-3 text-2xl font-black text-[#0b1a33]">
            Уточнить маршрут и стоимость
          </h2>
          <p className="mb-6 text-slate-600">
            Позвоните или оставьте заявку с параметрами груза.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="tel:+79011172371"
              className="rounded-xl bg-[#f05a28] px-6 py-4 font-black text-white hover:bg-[#d44a1d]"
            >
              +7 (901) 117-23-71
            </a>
            <a
              href="/#form"
              className="rounded-xl border border-slate-300 px-6 py-4 font-bold text-[#0b1a33] hover:border-[#f05a28]"
            >
              Оставить заявку
            </a>
          </div>
        </section>
      </article>
    </main>
  );
}
