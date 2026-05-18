import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { cities } from "../data/cities";

export default function CityPage() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = cities[citySlug || ""];

  // Если город не найден — 404
  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1a33] text-white">
        <div className="text-center">
          <h1 className="text-6xl font-black text-[#f05a28] mb-4">404</h1>
          <p className="text-xl mb-6">Город не найден</p>
          <Link to="/" className="bg-[#f05a28] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#d44a1d] transition-all">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO-метатеги */}
      <Helmet>
        <title>{city.title}</title>
        <meta name="description" content={city.description} />
        <link rel="canonical" href={`https://almik-logistic.ru/gorod/${citySlug}`} />
        {/* Schema.org LocalBusiness для города */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `АЛМИК — грузоперевозки ${city.name}`,
            description: city.description,
            url: `https://almik-logistic.ru/gorod/${citySlug}`,
            telephone: "+7-901-117-23-71",
            address: {
              "@type": "PostalAddress",
              addressLocality: city.name,
              addressCountry: "RU"
            },
            areaServed: {
              "@type": "City",
              name: city.name
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#f8faff] pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Хлебные крошки */}
          <nav className="text-sm mb-8 text-slate-500">
            <Link to="/" className="hover:text-[#f05a28] transition-colors">Главная</Link>
            <span className="mx-2">→</span>
            <Link to="/#services" className="hover:text-[#f05a28] transition-colors">Услуги</Link>
            <span className="mx-2">→</span>
            <span className="text-[#f05a28] font-bold">Грузоперевозки {city.name}</span>
          </nav>

          {/* Заголовок */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-black text-[#0b1a33] mb-4">
              Грузоперевозки в {city.name === "Москва" ? "Москве" : city.name === "Санкт-Петербург" ? "Санкт-Петербурге" : city.name + "е"}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
              {city.description}
            </p>
            <div className="mt-4 inline-block bg-[#f05a28] text-white px-5 py-2 rounded-full font-black text-lg">
              Цены от {city.price}
            </div>
          </motion.div>

          {/* Преимущества */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {city.advantages.map((adv, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f05a28]/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-[#f05a28] font-black text-lg">✓</span>
                </div>
                <span className="font-bold text-[#0b1a33] text-sm">{adv}</span>
              </div>
            ))}
          </motion.div>

          {/* Услуги в этом городе */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-black text-[#0b1a33] mb-6">
              Доступные услуги в {city.name === "Москва" ? "Москве" : city.name + "е"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {city.services.map((service, i) => (
                <Link
                  key={i}
                  to={`/uslugi/${service.slug}`}
                  className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 hover:border-[#f05a28] hover:shadow-xl transition-all group"
                >
                  <div className="w-12 h-12 bg-[#0b1a33] rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#f05a28] transition-colors">
                    <span className="text-white text-lg">🚛</span>
                  </div>
                  <h3 className="font-black text-[#0b1a33] mb-1">{service.name}</h3>
                  <p className="text-sm text-slate-500">от {service.price}</p>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Популярные маршруты */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-black text-[#0b1a33] mb-6">
              Популярные маршруты из {city.name === "Москва" ? "Москвы" : city.name + "а"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {city.popularRoutes.map((route, i) => (
                <Link
                  key={i}
                  to={`/marshrut/${route.toLowerCase().replace(" ", "-")}`}
                  className="bg-white rounded-xl p-4 shadow border border-slate-100 hover:border-[#f05a28] transition-all text-center font-bold text-[#0b1a33] hover:text-[#f05a28]"
                >
                  {route}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Форма заявки */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#f05a28]"
          >
            <h2 className="text-2xl md:text-3xl font-black text-[#0b1a33] mb-2 text-center">
              Рассчитать стоимость перевозки в {city.name === "Москва" ? "Москве" : city.name + "е"}
            </h2>
            <p className="text-slate-500 text-center mb-6">
              Заполните форму — менеджер свяжется с вами за 15 минут
            </p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Откуда"
                defaultValue={city.name}
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