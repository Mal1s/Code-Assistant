import { Link } from "wouter";

function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Хлебные крошки" className="mb-8 text-sm text-slate-500">
      <Link href="/" className="hover:text-[#f05a28]">Главная</Link>
      <span className="mx-2">/</span>
      <span aria-current="page" className="font-bold text-[#f05a28]">
        {current}
      </span>
    </nav>
  );
}

export function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8faff] px-4 pb-16 pt-24">
      <article className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-sm md:p-10">
        <Breadcrumb current="О компании" />
        <h1 className="mb-5 text-3xl font-black text-[#0b1a33] md:text-5xl">
          Транспортная компания АЛМИК
        </h1>
        <div className="space-y-5 leading-relaxed text-slate-700">
          <p>
            ООО «АЛМИК» — транспортная компания с базой в Твери. Компания
            организует грузоперевозки по России по предварительной заявке.
          </p>
          <p>
            Для расчёта сообщите маршрут, характеристики груза и желаемую дату.
            Доступность транспорта, срок подачи и стоимость подтверждаются
            индивидуально до оформления заказа.
          </p>
        </div>
        <dl className="my-8 grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-bold uppercase text-slate-500">Организация</dt>
            <dd className="mt-1 font-bold text-[#0b1a33]">ООО «АЛМИК»</dd>
          </div>
          <div>
            <dt className="text-sm font-bold uppercase text-slate-500">ИНН</dt>
            <dd className="mt-1 font-bold text-[#0b1a33]">6900000798</dd>
          </div>
          <div>
            <dt className="text-sm font-bold uppercase text-slate-500">ОГРН</dt>
            <dd className="mt-1 font-bold text-[#0b1a33]">1236900010380</dd>
          </div>
          <div>
            <dt className="text-sm font-bold uppercase text-slate-500">База</dt>
            <dd className="mt-1 font-bold text-[#0b1a33]">Тверь</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/perevozki-po-rossii/"
            className="rounded-xl bg-[#f05a28] px-6 py-4 font-black text-white hover:bg-[#d44a1d]"
          >
            Перевозки по России
          </Link>
          <Link
            href="/kontakty/"
            className="rounded-xl border border-slate-300 px-6 py-4 font-bold text-[#0b1a33] hover:border-[#f05a28]"
          >
            Контакты
          </Link>
        </div>
      </article>
    </main>
  );
}

export function ContactsPage() {
  return (
    <main className="min-h-screen bg-[#f8faff] px-4 pb-16 pt-24">
      <article className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-sm md:p-10">
        <Breadcrumb current="Контакты" />
        <h1 className="mb-5 text-3xl font-black text-[#0b1a33] md:text-5xl">
          Контакты транспортной компании АЛМИК
        </h1>
        <p className="mb-8 max-w-2xl leading-relaxed text-slate-600">
          База компании находится в Твери. Чтобы уточнить возможность рейса,
          сообщите маршрут и параметры груза по телефону или электронной почте.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="tel:+79011172371"
            className="rounded-2xl border border-slate-200 p-6 hover:border-[#f05a28]"
          >
            <span className="block text-sm font-bold uppercase text-slate-500">Телефон</span>
            <span className="mt-2 block text-xl font-black text-[#0b1a33]">
              +7 (901) 117-23-71
            </span>
          </a>
          <a
            href="mailto:almik.ks@yandex.ru"
            className="rounded-2xl border border-slate-200 p-6 hover:border-[#f05a28]"
          >
            <span className="block text-sm font-bold uppercase text-slate-500">Электронная почта</span>
            <span className="mt-2 block break-all text-xl font-black text-[#0b1a33]">
              almik.ks@yandex.ru
            </span>
          </a>
          <div className="rounded-2xl border border-slate-200 p-6 sm:col-span-2">
            <span className="block text-sm font-bold uppercase text-slate-500">Офис в Твери</span>
            <span className="mt-2 block font-bold text-[#0b1a33]">
              проспект Калинина, дом 17, офис 316
            </span>
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-slate-500">
          Перед визитом позвоните и подтвердите время приёма.
        </p>
      </article>
    </main>
  );
}
