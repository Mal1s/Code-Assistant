import { useRef } from "react";
import emailjs from "@emailjs/browser";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import thirdIcon from "@assets/photo_2026.jpg";
import logoRussvet from "@assets/tf9kyzh0hxdjbmfjccwy6c24pnlojmaw_1772480087609.png";
import logoOzon from "@assets/1200x630wa_1772480091883.png";
import logoTvz from "@assets/ТВЗ_1772480095190.png";
import logoMetallprofil from "@assets/Logo-new2_1772480101124.png";
import logoTechnonicol from "@assets/medium_a4cfeb09a569425cb6fb66eaa87f79a5_1772480106124.jpg";

import logoUvmStal from "@assets/____________1772480110697.png";
import logoWb from "@assets/1irjwkgp3m2z5rszv972wbwxjhjjl2kx_1772480113923.png";
import logoMelkom from "@assets/tild3031-6237-4533-b534-613333326531__photo_1772480116794.png";
import manipulatorIcon from "@assets/photo_2026-03-09_23-29-36.jpg";
import imgNewPhoto from "@assets/newPhoto.jpg";
import logoSalair from "@assets/888580_1772480120316.png";
import logoSvetofor from "@assets/Svetofor-logo_1772480123422.png";
import truckIcon1 from "@assets/black-silhouette-truck-logo-icon-car-cargo-cabin-vector-illustration-truck-vector_769314-4443.jpg";
import imgHero from "@assets/sleek-truck-drives-down-winding-road-surrounded-by-lush-greene_1772480378551.jpg";
import imgTrucks from "@assets/ed5s9fvz.jpg";
import imgWarehouse from "@assets/tk_1772480287120.jpg";
import imgLogistics from "@assets/istockphoto-518279013-170667a_1773061575970.jpg";
import imgSpecTech from "@assets/large.509979422.jpg.eba12aa69494049409401ac8b79190b4_1772524044839.jpg";
import truckSmall from "@assets/truck_van.png";
import truckMedium from "@assets/truck_orange.png";
import truckLarge from "@assets/truck_flatbed.png";
import truckSmallMobile from "@assets/truck_van_mobile.png";
import truckMediumMobile from "@assets/truck_orange_mobile.png";
import truckLargeMobile from "@assets/truck_flatbed_mobile.png";

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
  const [activePartner, setActivePartner] = useState<string | null>(null); // ← ДОБАВЬ ЭТУ СТРОКУ
  const formRef = useRef<HTMLFormElement>(null); //

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
      // Размеры логотипов (высота)
      let logoSize = "";

      switch (partnerName) {
        case "Ozon":
          logoSize = "max-h-16 md:max-h-20"; // ВЕРНУЛ КАК БЫЛО
          break;
        case "Wildberries":
          logoSize = "max-h-20 md:max-h-20"; // Wildberries без изменений
          break;
        case "ТехноНИКОЛЬ":
          logoSize = "max-h-20 md:max-h-24";
          break;
        case "Тверской Вагоностроительный Завод":
          logoSize = "max-h-16 md:max-h-20"; // на телефоне поменьше
          break;
        case "УВМ-Сталь":
          logoSize = "max-h-14 md:max-h-16";
          break;
        case "Светофор":
          logoSize = "max-h-12 md:max-h-14";
          break;
        case "Мелькомбинат":
          logoSize = "max-h-8 md:max-h-12";
          break;
        case "Салаир":
          logoSize = "max-h-4 md:max-h-10";
          break;
        default:
          logoSize = "max-h-16 md:max-h-16";
      }

      // Классы для подсказки (чтобы длинные названия помещались)
      const getTooltipClasses = (name: string, isMobile: boolean) => {
        let baseClasses =
          "absolute -top-12 left-1/2 -translate-x-1/2 bg-[#f05a28] text-white font-bold px-3 py-1.5 rounded-xl z-30 shadow-xl";

        if (name === "Тверской Вагоностроительный Завод") {
          if (isMobile) {
            return (
              baseClasses +
              " text-[9px] max-w-[150px] text-center whitespace-normal break-words"
            );
          } else {
            return baseClasses + " text-xs md:text-sm whitespace-nowrap";
          }
        } else {
          return baseClasses + " text-sm md:text-sm whitespace-nowrap";
        }
      };

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{
            y: -10,
            boxShadow: "0 20px 30px -10px rgba(240, 90, 40, 0.3)",
            borderColor: "#f05a28",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setActivePartner(partnerName);
            setTimeout(() => setActivePartner(null), 2000);
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="h-24 w-full flex items-center justify-center p-4 bg-white rounded-2xl shadow-lg border-2 border-transparent group transition-all duration-300 relative cursor-pointer"
        >
          <img
            src={logoUrl}
            alt={partnerName}
            className={`${logoSize} max-w-full object-contain transition-all duration-300 ${
              // На телефоне Ozon чуть-чуть уменьшаем ширину (на 5%)
              partnerName === "Ozon" ? "scale-[0.95] md:scale-100" : ""
            } `}
          />

          {/* Подсказка при клике (телефон) */}
          <AnimatePresence>
            {activePartner === partnerName && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={getTooltipClasses(partnerName, true)}
              >
                {partnerName}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#f05a28]"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Подсказка при наведении (ПК) */}
          <div
            className={`hidden sm:block ${getTooltipClasses(partnerName, false)} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
          >
            {partnerName}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#f05a28]"></div>
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

    const submitBtn = (e.target as HTMLFormElement).querySelector(
      'button[type="submit"]',
    );
    const originalText = submitBtn?.innerHTML;
    if (submitBtn) {
      submitBtn.innerHTML = "⏳ Отправка...";
      submitBtn.setAttribute("disabled", "true");
    }

    // Собираем данные из формы
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    // 1. Отправка в EmailJS (письмо менеджеру)
    emailjs.sendForm(
      'service_7pkg0hu',
      'template_q692thu',
      e.target as HTMLFormElement,
      'NtVl5WnbuBxR_EQNl'
    )
    .then(
      () => {
        setShowSuccess(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setShowSuccess(false), 4000);
      },
      (error) => {
        console.error("Ошибка отправки EmailJS:", error);
        alert("❌ Ошибка отправки. Позвоните нам +7 (900) 474-66-88");
      },
    )
    .finally(() => {
      if (submitBtn) {
        submitBtn.innerHTML = originalText || "✉️ Отправить заявку";
        submitBtn.removeAttribute("disabled");
      }
    });

    // 2. Отправка в OkoCRM (создание сделки)
    const formDataOko = new FormData();
    formDataOko.append('cf_16', data.name);           // ФИО
    formDataOko.append('cf_2', data.user_phone);      // Телефон
    formDataOko.append('cf_64', data.email || '');    // Email
    formDataOko.append('cf_62', data.from_city || ''); // Откуда
    formDataOko.append('cf_114', data.to_city || '');  // Куда
    formDataOko.append('page_url', window.location.href); // Ссылка на страницу
    // Дополнительные поля (если есть в форме OkoCRM, нужно добавить)
    if (data.weight) formDataOko.append('weight', data.weight);
    if (data.cargo_type) formDataOko.append('cargo_type', data.cargo_type);
    if (data.length) formDataOko.append('length', data.length);
    if (data.width) formDataOko.append('width', data.width);
    if (data.height) formDataOko.append('height', data.height);
    if (data.date) formDataOko.append('date', data.date);
    if (data.nds) formDataOko.append('nds', data.nds);
    if (data.comment) formDataOko.append('comment', data.comment);

    fetch('https://forms.okocrm.com/fc11522e-e4d6-4c9c-b4fa-28d8f8b26d0a', {
      method: 'POST',
      body: formDataOko
    })
    .then(async response => {
      const text = await response.text(); // Читаем ответ сервера
      console.log("Статус OkoCRM:", response.status);
      console.log("Ответ OkoCRM:", text);

      if (!response.ok) {
        console.error("Ошибка OkoCRM:", response.status, text);
      } else {
        console.log("Заявка отправлена в OkoCRM");
      }
    })
    .catch(error => console.error("Ошибка отправки в OkoCRM:", error));
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
    { type: "trall", width: 140, delay: 8 },
  ];

  const TruckIcon = ({ type, height = "80px", mobile = false }: { type: string; height?: string; mobile?: boolean }) => {
    const desktopMap: { [key: string]: string } = {
      "20t": truckSmall,
      "5t": truckMedium,
      trall: truckLarge,
    };
    const mobileMap: { [key: string]: string } = {
      "20t": truckSmallMobile,
      "5t": truckMediumMobile,
      trall: truckLargeMobile,
    };

    const src = mobile ? mobileMap[type] : desktopMap[type];

    return (
      <img
        src={src}
        alt={type}
        style={{
          height,
          width: "auto",
          maxWidth: "none",
          objectFit: "contain",
          objectPosition: "bottom",
          display: "block",
        }}
      />
    );
  };

  return (
    <div className="flex flex-col w-full bg-[#f8faff] overflow-x-hidden">
      {/* SUCCESS NOTIFICATION */}
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

      {/* MOBILE MENU */}
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
              onClick={() => scrollTo("geography")}
              className="text-2xl font-bold"
            >
              География
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

      {/* HEADER */}
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
            {[
              { id: "hero", label: "Главная" },
              { id: "about", label: "О компании" },
              { id: "services", label: "Услуги" },
              { id: "geography", label: "География" },
              { id: "partners", label: "Партнеры" },
              { id: "form", label: "Заявка" }, // Добавлено!
              { id: "contacts", label: "Контакты" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`transition-colors hover:text-[#f05a28] ${scrolled ? "text-slate-600" : "text-white/90"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Для телефонов - компактный номер */}
            <a
              href="tel:+79004746688"
              className={`
                  block sm:hidden text-sm font-black whitespace-nowrap transition-colors hover:text-[#f05a28]
                  ${scrolled ? "text-[#0b1a33]" : "text-white"}
                `}
            >
              +7 (900) 474-66-88
            </a>
            {/* Для ПК - обычный номер */}
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

      {/* HERO SECTION */}
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
            className="max-w-4xl text-left"
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
            <p className="text-lg md:text-2xl text-slate-300 mb-8 md:mb-12 max-w-2xl leading-relaxed">
              Современный автопарк 2023 года выпуска. Полное страхование грузов.
              <br />
              Команда с 15-летним экспертным опытом в сфере грузоперевозок.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
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

      {/* ABOUT SECTION */}
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
                <p>
                  Наша команда обладает более чем 15‑летним опытом в сфере
                  логистики.
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

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 px-6 bg-[#f8faff]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#0b1a33] px-4">
              НАШИ УСЛУГИ
            </h2>
            <div className="w-24 h-2 bg-[#f05a28] mx-auto rounded-full mt-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 mt-16">
            {[
              {
                title: "Грузоперевозки и переезды",
                desc: "От 1.5 до 20 тонн: Газели, 5т, 10т, Еврофуры. Офисные и домашние переезды с грузчиками. Бережная перевозка мебели и личных вещей.",
                icon: truckIcon1,
                isImage: true,
                img: imgWarehouse,
                imgScale: "scale-125",
              },
              {
                title: "Грузоподъемная техника",
                desc: "Аренда манипуляторов, погрузчиков, краны различной тоннажности. Погрузо-разгрузочные работы любой сложности.",
                icon: manipulatorIcon,
                isImage: true,
                img: imgSpecTech,
                imgScale: "scale-125",
              },
              {
                title: "Негабаритные перевозки",
                desc: "Перевозка крупногабаритных грузов с сопровождением. Разработка маршрута, получение разрешений, безопасная доставка.",
                icon: thirdIcon,
                isImage: true,
                img: imgNewPhoto,
                imgScale: "scale-125",
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <div className="h-50 md:h-80 overflow-hidden relative shimmer-img bg-gradient-to-br from-[#f05a28]/10 via-[#f05a28]/5 to-blue-500/10 flex items-center justify-center">
                  <img
                    src={service.img}
                    className={`w-full h-full object-contain ${service.imgScale} relative z-10`}
                    alt={service.title}
                  />
                  <div className="absolute inset-0 bg-[#0b1a33]/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col text-center md:text-left">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-xl -mt-12 md:-mt-16 mx-auto md:mx-0 relative z-10 transition-transform group-hover:scale-110 overflow-hidden border border-gray-200">
                    {service.isImage ? (
                      <img
                        src={service.icon}
                        alt={service.title}
                        className={`w-full h-full object-cover ${
                          idx === 1 ? "scale-70 object-[60%]" : ""
                        } ${idx === 2 ? "scale-90 object-right" : ""}`}
                      />
                    ) : (
                      <i
                        className={`fas fa-${service.icon} text-xl md:text-2xl text-[#f05a28]`}
                      ></i>
                    )}
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
      {/* ТРАССА М8 "АЛМИК" - С АНИМАЦИЕЙ ФОНА */}
      <section
        id="geography" // ← ID СТАВИМ ЗДЕСЬ!
        className="relative py-16 overflow-hidden bg-[#0b1a33]"
      >
        {/* ===== АНИМИРОВАННЫЙ ФОН ===== */}

        {/* 1. ДВИЖУЩИЕСЯ ТОЧКИ */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className="absolute w-0.5 h-0.5 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: "#ff9f4b",
                filter: "blur(1px)",
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0.1, 0.8, 0.1],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* 2. ПЛЫВУЩИЕ ЛИНИИ */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-px w-full"
              style={{
                top: `${i * 12}%`,
                background: `linear-gradient(90deg, transparent, #ff9f4b, #ffb347, #ff9f4b, transparent)`,
                filter: "blur(2px)",
              }}
              animate={{
                x: ["-100%", "100%"],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* 3. ПУЛЬСИРУЮЩИЙ ГРАДИЕНТ */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, rgba(255,159,75,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, rgba(255,159,75,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 40%, rgba(255,159,75,0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 opacity-30 blur-3xl"
        />

        {/* 4. СВЕТЯЩИЕСЯ ЧАСТИЦЫ */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`glow-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: "#ff9f4b",
                boxShadow: "0 0 10px #ff9f4b",
              }}
              animate={{
                scale: [0, 3, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* 5. МЕРЦАЮЩАЯ СЕТКА */}
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
                linear-gradient(45deg, #ff9f4b 1px, transparent 1px),
                linear-gradient(-45deg, #ff9f4b 1px, transparent 1px)
              `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* 6. ДЫМ */}
        <motion.div
          animate={{
            x: [-100, 100, -100],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff9f4b]/20 to-transparent blur-3xl"
        />

        {/* 7. ДОРОЖНАЯ РАЗМЕТКА */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #ff9f4b 0px, #ff9f4b 10px, transparent 10px, transparent 20px)",
              backgroundSize: "20px 100%",
            }}
          ></div>
        </div>

        {/* КОНТЕНТ */}
        <div className="container mx-auto px-4 relative z-10">
          {/* Заголовок - ПЕРСИКОВЫЙ ГРАДИЕНТ */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="relative w-fit mx-auto mb-12"
          >
            <div className="bg-[#0b1a33] border-2 border-[#ff9f4b] rounded-2xl p-4 shadow-lg rotate-[-2deg] hover:rotate-0 transition-transform">
              <h2 className="text-3xl md:text-5xl font-bold text-center">
                <span className="bg-gradient-to-r from-[#ff9f4b] via-[#ffb347] to-[#ffcc99] bg-clip-text text-transparent">
                  М8 "АЛМИК"
                </span>
              </h2>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gradient-to-r from-[#ff9f4b] to-[#ffb347] clip-triangle"></div>
            </div>
          </motion.div>

          {/* КИЛОМЕТРОВЫЕ СТОЛБЫ */}
          <div className="space-y-2 relative">
            {/* Линия трассы */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff9f4b] via-white to-[#ff9f4b]"></div>

            {/* Города на трассе */}
            {[
              {
                km: "0",
                city: "ТВЕРЬ",
                desc: "ЦЕНТРАЛЬНЫЙ ОФИС",
                type: "start",
              },
              { km: "168", city: "МОСКВА", desc: "СТОЛИЦА", type: "capital" },
              {
                km: "714",
                city: "С.-ПЕТЕРБУРГ",
                desc: "СЕВЕРНАЯ СТОЛИЦА",
                type: "major",
              },
              { km: "1540", city: "МУРМАНСК", desc: "АРКТИКА", type: "north" },
              {
                km: "3340",
                city: "НОВЫЙ УРЕНГОЙ",
                desc: "ГАЗ",
                type: "extreme",
              },
              { km: "5180", city: "ЯКУТСК", desc: "АЛМАЗЫ", type: "extreme" },
              {
                km: "7520",
                city: "ВЛАДИВОСТОК",
                desc: "ТИХИЙ ОКЕАН",
                type: "finish",
              },
            ].map((point, index) => (
              <motion.div
                key={point.city}
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className="relative flex items-start gap-3 group"
              >
                {/* Км столб */}
                <div className="relative z-20 w-12 flex-shrink-0">
                  <div
                    className={`font-mono text-sm font-medium text-white px-2 py-1 rounded-lg text-center shadow
                      ${
                        point.type === "capital"
                          ? "bg-yellow-500/80"
                          : point.type === "extreme"
                            ? "bg-purple-600/80"
                            : point.type === "north"
                              ? "bg-blue-500/80"
                              : point.type === "finish"
                                ? "bg-green-600/80"
                                : "bg-[#ff9f4b]/80"
                      }`}
                  >
                    {point.km}
                  </div>
                </div>

                {/* Город */}
                <div className="relative z-20 flex-1 bg-white/5 backdrop-blur rounded-xl px-3 py-2 border border-white/10 group-hover:border-[#ff9f4b] transition-all">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white">
                      {point.city}
                    </h3>
                    <p className="text-white/60 text-[10px] font-normal">
                      {point.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ТРИ ТАБЛИЧКИ */}
          <div className="mt-12 grid md:grid-cols-3 gap-3">
            {[
              {
                sign: "🛑",
                title: "ДОКУМЕНТЫ",
                items: [
                  "Устав автомобильного транспорта (УАТ РФ)",
                  "Полный пакет документов",
                  "Отсутствие штрафов у юр.лиц",
                  "Налогообложение по закону РФ",
                  "Страхование каждого груза",
                ],
                color: "#ff9f4b",
              },
              {
                sign: "⚠️",
                title: "ОСОБЫЕ УСЛОВИЯ",
                items: [
                  "Зимники и паромы",
                  "Труднодоступные месторождения",
                  "Драгоценные ископаемые",
                  "Такелажные работы (станки, оборудование)",
                  "Монтаж тяжеловесных грузов",
                ],
                color: "#ffaa00",
              },
              {
                sign: "⛽",
                title: "СПЕЦТЕХНИКА",
                items: [
                  "Манипуляторы",
                  "Краны различной тоннажности",
                  "Лебедки и домкраты",
                  "Стропы и такелаж",
                  "Сопровождение (ГИБДД)",
                ],
                color: "#00cc88",
              },
            ].map((block, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10 hover:border-[#ff9f4b] transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{block.sign}</span>
                  <h4
                    className="text-base font-bold text-white"
                    style={{ color: block.color }}
                  >
                    {block.title}
                  </h4>
                </div>
                <ul className="space-y-1.5">
                  {block.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-white/80 text-xs flex items-start gap-2"
                    >
                      <span className="text-[#ff9f4b] text-sm">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ГЕОГРАФИЯ ПРИСУТСТВИЯ - АДАПТИВНАЯ ВЕРСИЯ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full"
      >
        {/* Градиентный фон */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] via-[#4a4a4a] to-[#1a1a1a]"></div>
          {/* Статичная текстура */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Основной контейнер */}
        <div className="relative z-10 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-[#f05a28] via-orange-400 to-[#f05a28]"></div>

          {/* Заголовок */}
          <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-3 sm:pb-4 text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <span className="text-2xl sm:text-4xl">🗺️</span>
              <h4 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                ГЕОГРАФИЯ <span className="text-[#f05a28]">ПЕРЕВОЗОК</span>
              </h4>
              <span className="text-2xl sm:text-4xl">🌍</span>
            </div>
            <p className="text-white/70 text-[10px] sm:text-sm">
              от Калининграда до Сахалина • 8 стран Таможенного союза
            </p>
          </div>

          {/* Карточки регионов - адаптивная сетка */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 p-3 sm:p-6">
            {/* Центр • СЗФО */}
            <div className="bg-white/10 sm:backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10 sm:border-white/20 hover:bg-white/15 sm:hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-xl sm:text-2xl">🏛️</span>
                <h5 className="text-[#f05a28] font-bold text-[10px] sm:text-sm tracking-wider">
                  ЦЕНТР • СЗФО
                </h5>
              </div>
              <p className="text-white/80 text-[9px] sm:text-xs leading-relaxed">
                <span className="text-white font-bold">Москва</span> • Санкт-Петербург •{" "}
                <span className="text-[#f05a28] font-bold">Тверь</span> • Псков • 
                Великий Новгород • Петрозаводск • Мурманск • Архангельск • Вологда • 
                Калининград
              </p>
            </div>

            {/* Юг • Кавказ */}
            <div className="bg-white/10 sm:backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10 sm:border-white/20 hover:bg-white/15 sm:hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-xl sm:text-2xl">🌴</span>
                <h5 className="text-[#f05a28] font-bold text-[10px] sm:text-sm tracking-wider">
                  ЮГ • КАВКАЗ
                </h5>
              </div>
              <p className="text-white/80 text-[9px] sm:text-xs leading-relaxed">
                Краснодар • Симферополь • Севастополь • Ялта • Ростов-на-Дону • 
                Волгоград • Астрахань • Махачкала • Владикавказ • Грозный
              </p>
            </div>

            {/* Урал • Сибирь */}
            <div className="bg-white/10 sm:backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10 sm:border-white/20 hover:bg-white/15 sm:hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-xl sm:text-2xl">⛰️</span>
                <h5 className="text-[#f05a28] font-bold text-[10px] sm:text-sm tracking-wider">
                  УРАЛ • СИБИРЬ
                </h5>
              </div>
              <p className="text-white/80 text-[9px] sm:text-xs leading-relaxed">
                Екатеринбург • Тюмень •{" "}
                <span className="text-white font-bold">Новый Уренгой</span> • Салехард • 
                Ханты-Мансийск • Сургут • Новосибирск • Омск • Томск • Красноярск • 
                Иркутск
              </p>
            </div>

            {/* Восток • СНГ */}
            <div className="bg-white/10 sm:backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10 sm:border-white/20 hover:bg-white/15 sm:hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-xl sm:text-2xl">🌏</span>
                <h5 className="text-[#f05a28] font-bold text-[10px] sm:text-sm tracking-wider">
                  ВОСТОК • СНГ
                </h5>
              </div>
              <p className="text-white/80 text-[9px] sm:text-xs leading-relaxed">
                Якутск • Магадан • Владивосток • Хабаровск • Южно-Сахалинск • Минск • 
                Баку • Ереван • Алматы • Ташкент • Бишкек • Астана
              </p>
            </div>
          </div>

          {/* Статистика */}
          <div className="mt-1 sm:mt-2 mb-3 sm:mb-4 p-2 sm:p-3 bg-gradient-to-r from-[#f05a28]/20 via-[#f05a28]/10 to-transparent border-t border-[#f05a28]/30 text-center">
            <p className="text-white/70 text-[8px] sm:text-xs font-bold tracking-wider">
              ⚡ БОЛЕЕ 200 ГОРОДОВ • 15 ЛЕТ НА РЫНКЕ • 5000+ ПЕРЕВОЗОК ⚡
            </p>
          </div>
        </div>
      </motion.div>

      {/* FORM SECTION */}
      <section
        id="form"
        className="py-12 md:py-16 px-4 md:px-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0b1a33 0%, #1a2b45 100%)",
        }}
      >
        {/* Декоративные элементы */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#f05a28] rounded-full filter blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Сетка для текстуры */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Дополнительные декоративные линии для ПК */}
        <div className="hidden md:block absolute top-20 left-10 w-40 h-40 border border-white/5 rounded-full"></div>
        <div className="hidden md:block absolute bottom-20 right-10 w-60 h-60 border border-white/5 rounded-full"></div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto"
          >
            {/* ===== ДЛЯ ПК (НОВЫЙ УЛУЧШЕННЫЙ ДИЗАЙН) ===== */}
            <div className="hidden md:block text-center mb-10">
              {/* Иконки с анимацией - ЗАКОММЕНТИРОВАНО */}
              {/*
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="flex items-center justify-center gap-4 mb-6"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#f05a28]/20 to-orange-500/20 rounded-2xl flex items-center justify-center border border-[#f05a28]/30 backdrop-blur-sm transform rotate-3 hover:rotate-6 transition-transform">
                    <span className="text-4xl">🤝</span>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30 backdrop-blur-sm transform -rotate-3 hover:-rotate-6 transition-transform">
                    <span className="text-4xl">✨</span>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#f05a28]/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-[#f05a28]/30 backdrop-blur-sm transform rotate-3 hover:rotate-6 transition-transform">
                    <span className="text-4xl">🚀</span>
                  </div>
                </motion.div>
                */}
              {/* "НАЧНЕМ" - остальное без изменений */}
              ...
              {/* "НАЧНЕМ" - персиковый градиент с эффектом */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative inline-block mb-2"
              >
                <h2 className="text-5xl md:text-6xl font-black tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9f4b] via-[#f05a28] to-[#ff7e5f] drop-shadow-2xl">
                    НАЧНЕМ
                  </span>
                </h2>
                {/* Декоративная линия под текстом */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#f05a28] to-transparent rounded-full"
                ></motion.div>
              </motion.div>
              {/* "СОТРУДНИЧЕСТВО" - еще более яркий градиент */}
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl font-black mb-6"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f05a28] via-[#ff9f4b] to-[#ffd966] drop-shadow-xl">
                  СОТРУДНИЧЕСТВО
                </span>
              </motion.h3>
              {/* Украшение - вращающиеся точки */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center gap-2 mb-4"
              >
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-[#f05a28] to-orange-400"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  ></motion.div>
                ))}
              </motion.div>
              {/* Подзаголовок с бликом */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative inline-block"
              >
                <p className="text-white/80 text-sm max-w-md mx-auto px-6 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                  ✨ Оставьте заявку — и мы свяжемся с вами
                </p>
              </motion.div>
            </div>

            {/* ===== ДЛЯ ТЕЛЕФОНА (КАК БЫЛО) ===== */}
            <div className="block md:hidden text-center mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-[#f05a28] font-bold text-[10px] uppercase tracking-wider rounded-full mb-3 border border-white/20"
              >
                Начнем сотрудничество
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-black mb-2 text-center"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f05a28] via-[#ff9f4b] to-[#ffd966]">
                  ОФОРМИТЬ ЗАЯВКУ
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/70 text-xs max-w-md mx-auto"
              >
                Заполните форму — мы свяжемся с вами в ближайшее время
              </motion.p>
            </div>

            {/* Карточка формы (улучшенная для ПК) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="backdrop-blur-xl bg-white/95 rounded-2xl shadow-2xl border border-white/30 overflow-hidden hover:shadow-[0_20px_40px_-10px_rgba(240,90,40,0.3)] transition-shadow"
            >
              <div className="h-1 w-full bg-gradient-to-r from-[#f05a28] via-[#ff9f4b] to-blue-500"></div>
              <div className="p-4 md:p-6">
                <form
                  onSubmit={handleFormSubmit}
                  className="space-y-3"
                  ref={formRef}
                >
                  {/* Поля формы (без изменений, но с улучшенным фокусом) */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-[#0b1a33] uppercase tracking-wider mb-1">
                        <span className="mr-1">👤</span> Имя *
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="Александр"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-200 focus:border-[#f05a28] focus:ring-2 focus:ring-[#f05a28]/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#0b1a33] uppercase tracking-wider mb-1">
                        <span className="mr-1">📞</span> Телефон *
                      </label>
                      <input
                        required
                        type="tel"
                        name="user_phone"
                        placeholder="+7 (900) 123-45-67"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-200 focus:border-[#f05a28] focus:ring-2 focus:ring-[#f05a28]/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  {/* ПОЛЕ EMAIL - ДОБАВИТЬ */}
                  <div>
                    <label className="block text-[10px] font-bold text-[#0b1a33] uppercase tracking-wider mb-1">
                      <span className="mr-1">📧</span> Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="example@mail.ru"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-200 focus:border-[#f05a28] focus:ring-2 focus:ring-[#f05a28]/20 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-[#0b1a33] uppercase tracking-wider mb-1">
                        <span className="mr-1">📍</span> Откуда
                      </label>
                      <input
                        type="text"
                        name="from_city"
                        placeholder="Москва"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-200 focus:border-[#f05a28] focus:ring-2 focus:ring-[#f05a28]/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#0b1a33] uppercase tracking-wider mb-1">
                        <span className="mr-1">📍</span> Куда
                      </label>
                      <input
                        type="text"
                        name="to_city"
                        placeholder="Тверь"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-200 focus:border-[#f05a28] focus:ring-2 focus:ring-[#f05a28]/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-[#0b1a33] uppercase tracking-wider mb-1">
                        <span className="mr-1">⚖️</span> Вес (т)
                      </label>
                      <input
                        type="text"
                        name="weight"
                        placeholder="5.0"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-200 focus:border-[#f05a28] focus:ring-2 focus:ring-[#f05a28]/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#0b1a33] uppercase tracking-wider mb-1">
                        <span className="mr-1">📦</span> Тип груза
                      </label>
                      <input
                        type="text"
                        name="cargo_type"
                        placeholder="Оборудование, мебель..."
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-200 focus:border-[#f05a28] focus:ring-2 focus:ring-[#f05a28]/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#0b1a33] uppercase tracking-wider mb-1">
                      <span className="mr-1">📏</span> Габариты (м)
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      <input
                        type="text"
                        name="length"
                        placeholder="Длина"
                        className="w-full px-2 py-2 text-xs rounded-lg bg-white border border-slate-200 text-center focus:border-[#f05a28] focus:ring-2 focus:ring-[#f05a28]/20 outline-none transition-all"
                      />
                      <input
                        type="text"
                        name="width"
                        placeholder="Ширина"
                        className="w-full px-2 py-2 text-xs rounded-lg bg-white border border-slate-200 text-center focus:border-[#f05a28] focus:ring-2 focus:ring-[#f05a28]/20 outline-none transition-all"
                      />
                      <input
                        type="text"
                        name="height"
                        placeholder="Высота"
                        className="w-full px-2 py-2 text-xs rounded-lg bg-white border border-slate-200 text-center focus:border-[#f05a28] focus:ring-2 focus:ring-[#f05a28]/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-[#0b1a33] uppercase tracking-wider mb-1">
                        <span className="mr-1">📅</span> Дата
                      </label>
                      <input
                        type="text"
                        name="date"
                        placeholder="ДД.ММ.ГГГГ"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-200 focus:border-[#f05a28] focus:ring-2 focus:ring-[#f05a28]/20 outline-none transition-all"
                      />
                      <p className="text-[8px] text-slate-400 mt-1">
                        Например: 25.12.2024
                      </p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#0b1a33] uppercase tracking-wider mb-1">
                        <span className="mr-1">💰</span> НДС
                      </label>
                      <div className="flex gap-3 bg-white rounded-lg border border-slate-200 p-2">
                        {["С НДС", "Без НДС"].map((pay) => (
                          <label key={pay} className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="nds"
                              value={pay}
                              className="w-3 h-3 accent-[#f05a28]"
                            />
                            <span className="text-[10px] text-slate-700">
                              {pay}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#0b1a33] uppercase tracking-wider mb-1">
                      <span className="mr-1">💬</span> Комментарий
                    </label>
                    <textarea
                      rows={2}
                      name="comment"
                      placeholder="Дополнительная информация..."
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-200 focus:border-[#f05a28] focus:ring-2 focus:ring-[#f05a28]/20 outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#f05a28] to-[#ff9f4b] text-white py-3 rounded-lg font-bold text-xs uppercase hover:from-[#d44a1d] hover:to-[#f05a28] transition-all shadow-lg hover:shadow-xl"
                  >
                    ✉️ Отправить заявку
                  </button>

                  <p className="text-center text-slate-400 text-[8px] mt-2">
                    🔒 Нажимая кнопку, вы соглашаетесь с обработкой персональных
                    данных
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* PARTNERS SECTION */}
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

      {/* CONTACTS SECTION */}
      <section
        id="contacts"
        className="pt-8 md:pt-12 pb-12 md:pb-16 px-4 md:px-6 bg-white overflow-hidden"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-6xl font-black text-[#0b1a33] pl-8 md:pl-115 text-center md:text-center mb-6 md:mb-8">
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

      {/* FOOTER */}
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
        {/* TRUCK ANIMATION */}
        <div className="fixed bottom-0 left-0 w-full h-16 bg-slate-900/90 backdrop-blur-sm pointer-events-none border-t border-white/10 z-[4000] overflow-hidden">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10"></div>

          {/* ПК версия - большие экраны */}
          {/* Первый грузовик (20т) - ПК */}
          <motion.div
            initial={{ x: "-300px" }}
            animate={{ x: "calc(100vw + 300px)" }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              delay: 0,
            }}
            className="absolute bottom--1 hidden sm:block"
            style={{ zIndex: 3 }}
          >
            <div className="relative">
              <div className="absolute -bottom-2 left-5 right-5 h-3 bg-black/30 blur-md rounded-full"></div>
              <TruckIcon type="20t" height="85px" />
            </div>
          </motion.div>

          {/* Второй грузовик (5т) - ПК */}
          <motion.div
            initial={{ x: "-300px" }}
            animate={{ x: "calc(100vw + 300px)" }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              delay: 7,
            }}
            className="absolute bottom-0 hidden sm:block"
            style={{ zIndex: 2 }}
          >
            <div className="relative">
              <div className="absolute -bottom-2 left-5 right-5 h-3 bg-black/30 blur-md rounded-full"></div>
              <TruckIcon type="5t" height="90px" />
            </div>
          </motion.div>

          {/* Третий грузовик (trall) - ПК */}
          <motion.div
            initial={{ x: "-300px" }}
            animate={{ x: "calc(100vw + 300px)" }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              delay: 14,
            }}
            className="absolute bottom-0 hidden sm:block"
            style={{ zIndex: 1 }}
          >
            <div className="relative">
              <div className="absolute -bottom-2 left-5 right-5 h-3 bg-black/30 blur-md rounded-full"></div>
              <TruckIcon type="trall" height="90px" />
            </div>
          </motion.div>

          {/* МОБИЛЬНАЯ ВЕРСИЯ - БЕСКОНЕЧНЫЙ ПОТОК С РАССТОЯНИЕМ 4.5 */}

          {/* Первая машина (20т) */}
          <motion.div
            initial={{ x: "-300px" }}
            animate={{ x: "calc(100vw + 300px)" }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 0,
            }}
            className="absolute bottom-2 block sm:hidden"
            style={{ zIndex: 3 }}
          >
            <div className="relative">
              <div className="absolute -bottom-2 left-5 right-5 h-2 bg-black/30 blur-md rounded-full"></div>
              <TruckIcon type="20t" height="65px" mobile />
            </div>
          </motion.div>

          {/* Вторая машина (5т) - через 4.5 сек после первой */}
          <motion.div
            initial={{ x: "-300px" }}
            animate={{ x: "calc(100vw + 300px)" }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 4.5,
            }}
            className="absolute bottom-2 block sm:hidden"
            style={{ zIndex: 2 }}
          >
            <div className="relative">
              <div className="absolute -bottom-2 left-5 right-5 h-2 bg-black/30 blur-md rounded-full"></div>
              <TruckIcon type="5t" height="65px" mobile />
            </div>
          </motion.div>

          {/* Третья машина (trall) - через 9.0 сек после первой (4.5 + 4.5) */}
          <motion.div
            initial={{ x: "-300px" }}
            animate={{ x: "calc(100vw + 300px)" }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 9.0,
            }}
            className="absolute bottom-2 block sm:hidden"
            style={{ zIndex: 1 }}
          >
            <div className="relative">
              <div className="absolute -bottom-2 left-5 right-5 h-2 bg-black/30 blur-md rounded-full"></div>
              <TruckIcon type="trall" height="65px" mobile />
            </div>
          </motion.div>
        </div>{" "}
      </footer>
    </div>
  );
}
