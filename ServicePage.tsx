import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { services } from "../data/services";

export default function ServicePage() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const service = services[serviceSlug || ""];

  // Если услуга не найдена
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1a33] text-white">
        <div className="text-center">
          <h1 className="text-6xl font-black text-[#f05a28] mb-4">404</h1>
          <p className="text-xl mb-6">Услуга не найдена</p>
          <Link href="/" className="bg-[#f05a28] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#d44a1d] transition-all">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{service.title}</title>
        <meta name="description" content={service.description} />
        <link rel="canonical" href={`https://almik-logistic.ru/uslugi/${serviceSlug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            description: service.description,
            provider: {
              "@type": "Organization",
              name: "АЛМИК",
              url: "https://almik-logistic.ru"
            },
            areaServed: {
              "@type": "Country",
              name: "Россия"
            },
            offers: {
              "@type": "Offer",
              price: service.price.replace(/\D/g, ""),
              priceCurrency: "RUB"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#f8faff] pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Хлебные крошки */}
          <nav className="text-sm mb-8 text-slate-500">
            <Link href="/" className="hover:text-[#f05a28] transition-colors">Главная</Link>
            <span className="mx-2">→</span>
            <Link href="/#services" className="hover:text-[#f05a28] transition-colors">Услуги</Link>
            <span className="mx-2">→</span>
            <span className="text-[#f05a28] font-bold">{service.name}</span>
          </nav>

          {/* Заголовок */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#0b1a33] rounded-2xl flex items-center justify-center text-3xl">
                {service.icon}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-[#0b1a33]">
                {service.name}
              </h1>
            </div>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mb-4">
              {service.description}
            </p>
            <div className="inline-block bg-[#f05a28] text-white px-6 py-3 rounded-full font-black text-2xl">
              {service.price}
            </div>
          </motion.div>

          {/* Характеристики */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {service.features.map((feat, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100">
                <div className="text-2xl mb-2">{feat.icon}</div>
                <div className="font-black text-[#0b1a33] text-sm mb-1">{feat.label}</div>
                <div className="text-slate-500 text-sm">{feat.value}</div>
              </div>
            ))}
          </motion.div>

          {/* Полное описание */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 mb-12"
          >
            <h2 className="text-2xl font-black text-[#0b1a33] mb-4">Подробное описание</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
              {service.fullText}
            </div>
          </motion.div>

          {/* Для каких грузов подходит */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-black text-[#0b1a33] mb-6">Подходит для перевозки</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {service.suitableFor.map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow border border-slate-100 flex items-center gap-3">
                  <span className="text-[#f05a28] text-lg">✓</span>
                  <span className="font-bold text-[#0b1a33] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Популярные маршруты для этой услуги */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-black text-[#0b1a33] mb-6">Популярные направления</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {service.popularRoutes.map((route, i) => (
                <Link
                  key={i}
                  href={`/marshrut/${route.from.toLowerCase()}-${route.to.toLowerCase().replace(/ /g, "-")}`}
                  className="bg-white rounded-xl p-4 shadow border border-slate-100 hover:border-[#f05a28] transition-all"
                >
                  <div className="font-black text-[#0b1a33] mb-1">{route.from} → {route.to}</div>
                  <div className="text-sm text-slate-500">{route.distance} • {route.time} • {route.price}</div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Форма заявки */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#f05a28]"
          >
            <h2 className="text-2xl md:text-3xl font-black text-[#0b1a33] mb-2 text-center">
              Заказать {service.name}
            </h2>
            <p className="text-slate-500 text-center mb-6">
              Заполните форму — менеджер свяжется с вами за 15 минут
            </p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Откуда"
                className="border-2 border-slate-200 rounded-xl p-4 font-bold focus:border-[#f05a28] outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Куда"
                className="border-2 border-slate-200 rounded-xl p-4 font-bold focus:border-[#f05a28] outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Вес груза (кг)"
                className="border-2 border-slate-200 rounded-xl p-4 font-bold focus:border-[#f05a28] outline-none transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон *"
                required
                className="border-2 border-slate-200 rounded-xl p-4 font-bold focus:border-[#f05a28] outline-none transition-colors"
              />
              <button
                type="submit"
                className="md:col-span-2 bg-[#f05a28] text-white py-4 rounded-xl font-black text-lg hover:bg-[#d44a1d] transition-all shadow-lg"
              >
                Рассчитать стоимость
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </>
  );
}