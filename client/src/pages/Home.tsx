import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import logoRussvet from "@assets/tf9kyzh0hxdjbmfjccwy6c24pnlojmaw_1772480087609.png";
import logoOzon from "@assets/1200x630wa_1772480091883.png";
import logoTvz from "@assets/ТВЗ_1772480095190.png";
import logoMetallprofil from "@assets/Logo-new2_1772480101124.png";
import logoTechnonicol from "@assets/medium_a4cfeb09a569425cb6fb66eaa87f79a5_1772480106124.jpg";
import logoUvmStal from "@assets/____________1772480110697.png";
import logoWb from "@assets/1irjwkgp3m2z5rszv972wbwxjhjjl2kx_1772480113923.png";
import logoMelkom from "@assets/tild3031-6237-4533-b534-613333326531__photo_1772480116794.png";
import logoSalair from "@assets/888580_1772480120316.png";
import logoSvetofor from "@assets/Svetofor-logo_1772480123422.png";

import imgHero from "@assets/sleek-truck-drives-down-winding-road-surrounded-by-lush-greene_1772480378551.jpg";
import imgTrucks from "@assets/truck-semi-trailer-for-transportation-of-car-vector-illustrati_1772714012464.jpg";
import imgWarehouse from "@assets/tk_1772480287120.jpg";
import imgLogistics from "@assets/9ce8d2a17992f3891548dd932eb49e17_1772480373987.jpg";
import imgSpecTech from "@assets/large.509979422.jpg.eba12aa69494049409401ac8b79190b4_1772524044839.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const getPartnerLogo = (partnerName: string) => {
    const logoMap: { [key: string]: string } = {
      "Русский Свет": logoRussvet,
      Ozon: logoOzon,
      "Тверской Вагоностроительный Завод": logoTvz,
      "Металл Профиль": logoMetallprofil,
      ТехноНИКОЛЬ: logoTechnonicol,
      "УВМ-Сталь": logoUvmStal,
      Wildberries: logoWb,
      Мелькомбинат: logoMelkom,
      Салаир: logoSalair,
      Светофор: logoSvetofor,
    };

    const logoUrl = logoMap[partnerName];
    if (logoUrl) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{
            y: -10,
            boxShadow: "0 20px 30px -10px rgba(240, 90, 40, 0.3)",
            borderColor: "#f05a28",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="h-24 w-full flex items-center justify-center p-4 bg-white rounded-2xl shadow-lg border-2 border-transparent group transition-all duration-300 relative"
        >
          <img
            src={logoUrl}
            alt={partnerName}
            className="max-h-16 max-w-full object-contain transition-all duration-300"
          />

          <div className="hidden sm:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-[#0b1a33] text-[10px] font-bold px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-lg border border-[#f05a28]/30">
            {partnerName}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/90"></div>
          </div>

          <div className="sm:hidden absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-[#0b1a33] text-[10px] font-bold px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-700 pointer-events-none whitespace-nowrap z-20 shadow-lg border border-[#f05a28]/30">
            {partnerName}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/95"></div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      if (navigator.vibrate) navigator.vibrate(10);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const partners = [
    "Русский Свет",
    "Ozon",
    "Тверской Вагоностроительный Завод",
    "Металл Профиль",
    "ТехноНИКОЛЬ",
    "УВМ-Сталь",
    "Wildberries",
    "Мелькомбинат",
    "Салаир",
    "Светофор",
  ];

  const truckFleet = [
    { type: "20t", width: 120, delay: 0 },
    { type: "5t", width: 100, delay: 4 },
    { type: "trall", width: 140, delay: 8 }
  ];

  const TruckIcon = ({ type }: { type: string }) => {
    if (type === "20t") {
      return (
        <svg width="120" height="45" viewBox="0 0 120 45" fill="none">
          {/* Кабина */}
          <rect x="10" y="10" width="30" height="20" rx="3" fill="#4A5568" />
          {/* Тент (кузов) */}
          <rect x="40" y="5" width="65" height="25" rx="3" fill="#718096" />
          {/* Окна */}
          <rect x="15" y="13" width="12" height="8" fill="#2D3748" />
          {/* Колеса */}
          <circle cx="20" cy="35" r="8" fill="#1A202C" />
          <circle cx="90" cy="35" r="8" fill="#1A202C" />
          {/* Диски */}
          <circle cx="20" cy="35" r="4" fill="#A0AEC0" />
          <circle cx="90" cy="35" r="4" fill="#A0AEC0" />
          {/* Фары */}
          <circle cx="12" cy="18" r="2" fill="#FBD38D" />
        </svg>
      );
    }
    if (type === "5t") {
      return (
        <svg width="100" height="45" viewBox="0 0 100 45" fill="none">
          {/* Кабина */}
          <rect x="5" y="12" width="25" height="18" rx="3" fill="#4A5568" />
          {/* Кузов */}
          <rect x="30" y="8" width="55" height="22" rx="3" fill="#718096" />
          {/* Окна */}
          <rect x="8" y="15" width="10" height="7" fill="#2D3748" />
          {/* Колеса */}
          <circle cx="15" cy="35" r="7" fill="#1A202C" />
          <circle cx="75" cy="35" r="7" fill="#1A202C" />
          {/* Диски */}
          <circle cx="15" cy="35" r="3.5" fill="#A0AEC0" />
          <circle cx="75" cy="35" r="3.5" fill="#A0AEC0" />
        </svg>
      );
    }
    return (
      <svg width="140" height="45" viewBox="0 0 140 45" fill="none">
        {/* Тягач трала */}
        <rect x="5" y="15" width="25" height="15" rx="3" fill="#4A5568" />
        {/* Платформа */}
        <rect x="30" y="20" width="90" height="8" rx="2" fill="#718096" />
        {/* Окна */}
        <rect x="8" y="18" width="10" height="7" fill="#2D3748" />
        {/* Колеса тягача */}
        <circle cx="15" cy="35" r="7" fill="#1A202C" />
        <circle cx="25" cy="35" r="7" fill="#1A202C" />
        {/* Колеса платформы */}
        <circle cx="60" cy="35" r="6" fill="#1A202C" />
        <circle cx="100" cy="35" r="6" fill="#1A202C" />
        <circle cx="115" cy="35" r="6" fill="#1A202C" />
      </svg>
    );
  };

  return (
    <div className="flex flex-col w-full bg-[#f8faff] overflow-x-hidden">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[3000] bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3"
          >
            <i className="fas fa-check-circle text-2xl"></i>
            Спасибо! Мы свяжемся с вами в ближайшее время.
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 z-[5000] bg-[#0b1a33] flex flex-col items-center justify-center gap-8 text-white p-6"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-4xl"
            >
              ✕
            </button>
            <button
              onClick={() => scrollTo("hero")}
              className="text-2xl font-bold"
            >
              Главная
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="text-2xl font-bold"
            >
              О компании
            </button>
            <button
              onClick={() => scrollTo("services")}
              className="text-2xl font-bold"
            >
              Услуги
            </button>
            <button
              onClick={() => scrollTo("partners")}
              className="text-2xl font-bold"
            >
              Партнеры
            </button>
            <button
              onClick={() => scrollTo("form")}
              className="text-2xl font-bold"
            >
              Заявка
            </button>
            <button
              onClick={() => scrollTo("contacts")}
              className="text-2xl font-bold"
            >
              Контакты
            </button>
            <a
              href="tel:+79004746688"
              className="text-3xl font-extrabold text-[#f05a28]"
            >
              +7 (900) 474-66-88
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 left-0 w-full z-[2000] transition-all duration-300 py-3 md:py-4 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div
            className="flex items-center gap-2 md:gap-3 cursor-pointer"
            onClick={() => scrollTo("hero")}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#f05a28] rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl shadow-[#f05a28]/20">
              <span className="text-white font-black text-xl md:text-2xl">
                A
              </span>
            </div>
            <span
              className={`text-2xl md:text-3xl font-black tracking-tighter ${scrolled ? "text-[#0b1a33]" : "text-white"}`}
            >
              АЛМИК
            </span>
          </div>

          <nav className="hidden lg:flex gap-8 font-bold text-sm uppercase tracking-widest">
            {["hero", "about", "services", "partners", "form"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`transition-colors hover:text-[#f05a28] ${scrolled ? "text-slate-600" : "text-white/90"}`}
              >
                {item === "hero"
                  ? "Главная"
                  : item === "about"
                    ? "О компании"
                    : item === "services"
                      ? "Услуги"
                      : item === "partners"
                        ? "Партнеры"
                        : "Контакты"}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="tel:+79004746688"
              className={`
                block sm:hidden text-sm font-black whitespace-nowrap transition-colors hover:text-[#f05a28]
                ${scrolled ? "text-[#0b1a33]" : "text-white"}
              `}
            >
              +7 (900) 474-66-88
            </a>
            <a
              href="tel:+79004746688"
              className={`
                hidden sm:block text-lg md:text-xl font-black transition-colors hover:text-[#f05a28]
                ${scrolled ? "text-[#0b1a33]" : "text-white"}
              `}
            >
              +7 (900) 474-66-88
            </a>
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`lg:hidden text-2xl md:text-4xl p-1 ${scrolled ? "text-[#0b1a33]" : "text-white"}`}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <section
        id="hero"
        className="relative h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={imgHero}
            className="w-full h-full object-cover"
            alt="Logistic background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a33] via-[#0b1a33]/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center md:text-left"
          >
            <div className="inline-block px-4 py-2 bg-[#f05a28]/20 border border-[#f05a28]/30 rounded-full mb-6 md:mb-8">
              <span className="text-[#f05a28] font-black text-xs md:text-sm tracking-widest uppercase">
                Логистика высшего уровня 24/7
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 md:mb-8 leading-[1.1] md:leading-[1.05]">
              ГРУЗОПЕРЕВОЗКИ <br className="hidden md:block" />
              ПО <span className="text-[#f05a28]">РОССИИ</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 mb-8 md:mb-12 max-w-2xl mx-auto md:mx-0 leading-relaxed">
              Современный автопарк 2023 года выпуска. Полное страхование грузов.
              Команда с 15-летним экспертным опытом в сфере грузоперевозок.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 md:gap-6">
              <button
                onClick={() => scrollTo("form")}
                className="bg-[#f05a28] text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl md:rounded-[2rem] font-black text-lg md:text-xl hover:bg-[#d44a1d] transition-all shadow-2xl shadow-[#f05a28]/30 w-full sm:w-auto"
              >
                Рассчитать стоимость
              </button>
              <button
                onClick={() => scrollTo("about")}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl md:rounded-[2rem] font-black text-lg md:text-xl hover:bg-white/20 transition-all w-full sm:w-auto"
              >
                О компании
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 bg-white overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-16 md:mb-24 px-4">
            {[
              { num: 15, text: "лет опыта", suffix: "+" },
              { num: 5000, text: "довольных клиентов", suffix: "+" },
              { num: 24, text: "часа в сутки", suffix: "/7" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-5xl font-black text-[#f05a28] mb-1 md:mb-2">
                  {item.num}
                  {item.suffix}
                </div>
                <div className="text-sm md:text-lg opacity-80 font-bold text-[#0b1a33]">
                  {item.text}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp} className="relative mt-8 lg:mt-0">
              <div className="rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-slate-50 aspect-video lg:aspect-square shimmer-img">
                <img
                  src={imgTrucks}
                  alt="Trucks"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-[#f05a28] p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-[#f05a28]/30 hidden sm:block">
                <span className="text-3xl md:text-5xl font-black text-white">
                  15+
                </span>
                <p className="text-white/80 font-bold uppercase tracking-widest text-[10px] md:text-xs mt-1 md:mt-3">
                  лет в логистике
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl md:text-6xl font-black text-[#0b1a33] mb-8 leading-tight">
                Ваш надежный <br />
                партнер на дороге
              </h2>
              <div className="space-y-6 text-slate-600 mb-12 text-lg leading-relaxed">
                <p className="font-bold text-[#0b1a33] text-2xl">
                  ООО «АлМик» — эксперты в области комплексных транспортных
                  решений.
                </p>
                <p>Наша команда обладает более чем 15‑летним опытом в сфере логистики.</p>
                <p>
                  ООО АлМик официально зарегистрирован в 2023 году. Путь нашей
                  команды обладает более 15-ти лет в сфере логистики.
                </p>
                <p className="bg-slate-50 p-6 rounded-[2rem] border-l-8 border-[#f05a28]">
                  Мы используем новый собственный автопарк 2023+ года выпуска.
                  Все перевозки застрахованы, каждый водитель трудоустроен
                  официально. <strong>Работаем с НДС 22% (ОСНО).</strong>
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "ИНН", val: "6900000798", icon: "fingerprint" },
                  {
                    label: "ОГРН",
                    val: "1236900010380",
                    icon: "file-contract",
                  },
                  { label: "Директор", val: "Михайлов А.А.", icon: "user-tie" },
                  {
                    label: "Офис",
                    val: "Тверь, Петербургское ш. 93к1",
                    icon: "map-marker-alt",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-slate-50 p-6 rounded-3xl flex gap-5 items-center border border-slate-100 shadow-sm"
                  >
                    <div className="w-14 h-14 bg-[#0b1a33] text-white rounded-2xl flex items-center justify-center text-2xl shrink-0">
                      <i className={`fas fa-${item.icon}`}></i>
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#f05a28] uppercase tracking-wider mb-1">
                        {item.label}
                      </div>
                      <div className="font-bold text-[#0b1a33] text-sm">
                        {item.val}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 px-6 bg-[#f8faff]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black text-[#0b1a33] mb-6 px-4">
              Наши услуги
            </h2>
            <div className="w-24 h-2 bg-[#f05a28] mx-auto rounded-full mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 mt-16">
            {[
              {
                title: "Грузоперевозки и переезды",
                desc: "От 1.5 до 20 тонн: Газели, 5т, 10т, Еврофуры. Офисные и домашние переезды с грузчиками. Бережная перевозка мебели и личных вещей.",
                icon: "truck-moving",
                img: imgWarehouse,
              },
              {
                title: "Грузоподъемная техника",
                desc: "Аренда манипуляторов, погрузчиков, кранов-бортов. Погрузо-разгрузочные работы любой сложности.",
                icon: "forklift",
                img: imgSpecTech,
              },
              {
                title: "Негабаритные перевозки",
                desc: "Перевозка крупногабаритных грузов с сопровождением. Разработка маршрута, получение разрешений, безопасная доставка.",
                icon: "trailer",
                img: imgLogistics,
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <div className="h-40 md:h-48 overflow-hidden relative shimmer-img">
                  <img
                    src={service.img}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={service.title}
                  />
                  <div className="absolute inset-0 bg-[#0b1a33]/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col text-center md:text-left">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#f05a28] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-xl shadow-[#f05a28]/30 -mt-12 md:-mt-16 mx-auto md:mx-0 relative z-10 transition-transform group-hover:scale-110">
                    <i
                      className={`fas fa-${service.icon} text-xl md:text-2xl text-white`}
                    ></i>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-[#0b1a33] mb-3 md:mb-4">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm mb-4 md:mb-6 flex-1">
                    {service.desc}
                  </p>
                  <button
                    onClick={() => scrollTo("form")}
                    className="text-[#f05a28] font-black text-sm flex items-center justify-center md:justify-start gap-3 hover:gap-5 transition-all"
                  >
                    Заказать услугу <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="partners" className="py-24 px-6 bg-white overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0b1a33] mb-6">
              Основные партнеры
            </h2>
            <div className="w-24 h-2 bg-[#f05a28] mx-auto rounded-full mb-8"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 px-4">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.05 }}
              >
                {getPartnerLogo(partner)}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="form"
        className="py-8 md:py-16 px-4 md:px-6 bg-[#0b1a33] relative overflow-hidden"
      >
        <div className="stars"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto bg-white p-5 md:p-8 rounded-2xl md:rounded-[3rem] shadow-2xl">
            <h2 className="text-2xl md:text-4xl font-black text-[#0b1a33] mb-4 md:mb-6 text-center uppercase tracking-tight">
              Оформить заявку
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-1.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Ваше имя *
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none font-bold text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Телефон *
                  </label>
                  <input
                    required
                    type="tel"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none font-bold text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none font-bold text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Откуда
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none font-bold text-sm"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700">
                    Куда
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none font-bold text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Длина (м)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Длина (м)"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none font-bold text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Ширина (м)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ширина (м)"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none font-bold text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Высота (м)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Высота (м)"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none font-bold text-sm"
                  />
                </div>
              </div>
              <p className="text-[8px] text-slate-400 mt-0.5">Укажите габариты в метрах</p>

              <div className="grid grid-cols-2 gap-1.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Тип груза
                  </label>
                  <select className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none font-bold text-sm">
                    <option value="">Выберите тип...</option>
                    <option value="equipment">Оборудование</option>
                    <option value="furniture">Мебель / Переезд</option>
                    <option value="construction">Стройматериалы</option>
                    <option value="food">Продукты питания</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Дата загрузки
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none font-bold text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-3 gap-y-1 py-0.5">
                {["Отдельная (FTL)", "Сборные грузы", "Страховка", "Вес (т)"].map(
                  (opt) =>
                    opt === "Вес (т)" ? (
                      <div key={opt} className="flex items-center gap-1.5">
                        <label className="text-[10px] font-bold text-slate-700">
                          Вес (т)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          className="flex-1 px-2 py-1 rounded bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none font-bold text-xs"
                        />
                      </div>
                    ) : (
                      <label
                        key={opt}
                        className="flex items-center gap-1.5 cursor-pointer group"
                      >
                        <div className="w-4 h-4 border-2 border-slate-200 rounded group-hover:border-[#f05a28] flex items-center justify-center transition-all shrink-0">
                          <input type="checkbox" className="hidden peer" />
                          <div className="w-full h-full bg-[#f05a28] rounded-sm flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-all">
                            <i className="fas fa-check text-[8px] text-white"></i>
                          </div>
                        </div>
                        <span className="font-bold text-slate-700 text-[10px]">
                          {opt}
                        </span>
                      </label>
                    ),
                )}
              </div>

              <div className="flex flex-row flex-wrap gap-3 py-0.5">
                {["С НДС", "Без НДС"].map((pay) => (
                  <label
                    key={pay}
                    className="flex items-center gap-1.5 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="payment"
                      className="w-3 h-3 accent-[#f05a28]"
                    />
                    <span className="font-bold text-slate-700 text-[10px]">
                      {pay}
                    </span>
                  </label>
                ))}
              </div>

              <textarea
                rows={1}
                placeholder="Комментарий..."
                className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none font-bold text-sm"
              ></textarea>

              <div className="text-center pt-1">
                <button
                  type="submit"
                  className="btn-orange bg-[#f05a28] text-white px-8 py-2 rounded-xl font-black text-base hover:bg-[#d44a1d] transition-all shadow-xl shadow-[#f05a28]/40 mb-1 w-full md:w-auto"
                >
                  ОТПРАВИТЬ
                </button>
                <p className="text-[#0b1a33] font-bold italic text-[10px] opacity-70 px-4">
                  «ООО АлМик — Ваш надежный партнер и помощник в решении
                  транспортных задач»
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section
        id="contacts"
        className="py-12 md:py-24 px-4 md:px-6 bg-white overflow-hidden"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-6xl font-black text-[#0b1a33] mb-8 md:mb-12 text-center">
            Наши контакты
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-4">
            {[
              {
                label: "Адрес офиса",
                val: "Тверь, Петербургское ш. 93к1, оф. 516",
                sub: "БЦ «Синтез», 5 этаж",
                icon: "map-marker-alt",
              },
              {
                label: "Юридический",
                val: "Тверь, ул. Седова, 55, кв. 80",
                sub: "ООО «АЛМИК»",
                icon: "building",
              },
              {
                label: "Связь",
                val: "+7 (900) 474-66-88",
                sub: "almik69@mail.ru",
                icon: "phone-alt",
              },
            ].map((c, i) => (
              <motion.div key={i} {...fadeInUp} className="text-center group">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 text-[#f05a28] rounded-2xl md:rounded-[2rem] flex items-center justify-center text-2xl md:text-3xl mx-auto mb-4 md:mb-6 group-hover:bg-[#f05a28] group-hover:text-white transition-all">
                  <i className={`fas fa-${c.icon}`}></i>
                </div>
                <p className="text-[#f05a28] font-black uppercase tracking-widest text-[10px] md:text-xs mb-1 md:mb-2">
                  {c.label}
                </p>
                <p className="text-lg md:text-xl font-black text-[#0b1a33] mb-1">
                  {c.val}
                </p>
                <p className="text-slate-500 font-bold text-sm md:text-base">
                  {c.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 pt-16 md:pt-24 pb-24 md:pb-32 overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20 mb-12 md:mb-20 border-b border-slate-900 pb-12 md:pb-20">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6 md:mb-10">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#f05a28] rounded-xl md:rounded-2xl flex items-center justify-center">
                  <span className="text-white font-black text-2xl md:text-3xl">
                    A
                  </span>
                </div>
                <span className="text-3xl md:text-5xl font-black tracking-tighter text-white">
                  АЛМИК
                </span>
              </div>
              <p className="text-slate-500 text-lg md:text-2xl leading-relaxed max-w-md mx-auto lg:mx-0">
                Надежная логистика для вашего бизнеса. Работаем на результат,
                ценим Ваше время.
              </p>
            </div>
            <div className="text-center lg:text-left">
              <h4 className="text-white text-lg md:text-xl font-black uppercase tracking-widest mb-6 md:mb-10 border-b-2 border-[#f05a28] inline-block pb-2">
                Реквизиты
              </h4>
              <ul className="space-y-3 md:space-y-4 text-slate-400 font-bold text-sm md:text-base">
                <li>ИНН: 6900000798</li>
                <li>ОГРН: 1236900010380</li>
                <li>ООО «АЛМИК»</li>
              </ul>
            </div>
            <div className="text-center lg:text-left">
              <h4 className="text-white text-lg md:text-xl font-black uppercase tracking-widest mb-6 md:mb-10 border-b-2 border-[#f05a28] inline-block pb-2">
                Контакты
              </h4>
              <a
                href="tel:+79004746688"
                className="text-2xl md:text-3xl font-black text-white block mb-3 md:mb-4 hover:text-[#f05a28]"
              >
                +7 (900) 474-66-88
              </a>
              <a
                href="mailto:almik69@mail.ru"
                className="text-lg md:text-2xl font-bold text-slate-500 hover:text-[#f05a28]"
              >
                almik69@mail.ru
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 font-bold tracking-widest text-[10px] md:text-sm uppercase text-center">
            <span>© {new Date().getFullYear()} ООО «АЛМИК»</span>
            <span>Грузоперевозки по России</span>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full h-16 bg-slate-900/90 backdrop-blur-sm pointer-events-none border-t border-white/10 z-[4000] overflow-hidden">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10"></div>
          {truckFleet.map((truck, i) => (
            <motion.div
              key={i}
              initial={{ x: "-300px" }}
              animate={{ x: "calc(100vw + 300px)" }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
                delay: truck.delay,
              }}
              className="absolute bottom-2"
            >
              <div className="relative">
                <div className="absolute -bottom-2 left-5 right-5 h-3 bg-black/30 blur-md rounded-full"></div>
                <TruckIcon type={truck.type} />
              </div>
            </motion.div>
          ))}
        </div>
      </footer>
    </div>
  );
}

const TruckIcon = ({ type, color }: { type: string; color: string }) => {
  // Стандартные грузовики как на фото
  if (type === "20t") {
    return (
      <svg width="120" height="45" viewBox="0 0 120 45" fill="none">
        {/* Тягач с тентом - 20 тонн */}
        <rect x="10" y="10" width="35" height="20" rx="3" fill={color} />
        <rect x="45" y="5" width="60" height="25" rx="3" fill={color} fillOpacity="0.9" />
        <circle cx="20" cy="35" r="8" fill="#222" />
        <circle cx="90" cy="35" r="8" fill="#222" />
        <circle cx="20" cy="35" r="4" fill="#666" />
        <circle cx="90" cy="35" r="4" fill="#666" />
      </svg>
    );
  }
  if (type === "5t") {
    return (
      <svg width="100" height="45" viewBox="0 0 100 45" fill="none">
        {/* Средний грузовик - 5 тонн */}
        <rect x="5" y="12" width="30" height="18" rx="3" fill={color} />
        <rect x="35" y="8" width="50" height="22" rx="3" fill={color} fillOpacity="0.9" />
        <circle cx="15" cy="35" r="7" fill="#222" />
        <circle cx="70" cy="35" r="7" fill="#222" />
      </svg>
    );
  }
  return (
    <svg width="140" height="45" viewBox="0 0 140 45" fill="none">
      {/* Трал для негабарита */}
      <rect x="5" y="20" width="30" height="10" rx="2" fill={color} />
      <rect x="35" y="18" width="90" height="12" rx="2" fill={color} fillOpacity="0.8" />
      <circle cx="15" cy="35" r="7" fill="#222" />
      <circle cx="25" cy="35" r="7" fill="#222" />
      <circle cx="100" cy="35" r="7" fill="#222" />
      <circle cx="115" cy="35" r="7" fill="#222" />
    </svg>
  );
};
