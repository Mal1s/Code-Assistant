import { useRef } from "react";
import emailjs from "@emailjs/browser";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import thirdIcon from "@assets/photo_2026.jpg";
import logoRussvet from "@assets/tf9kyzh0hxdjbmfjccwy6c24pnlojmaw_1772480087609.png";
import logoOzon from "@assets/logo_ozon_new.png";
import logoTvz from "@assets/ТВЗ_1772480095190.png";
import logoMetallprofil from "@assets/Logo-new2_1772480101124.png";

import logoTechnonicol from "@assets/medium_a4cfeb09a569425cb6fb66eaa87f79a5_1772480106124.jpg";
import imgHero from "@assets/sleek-truck-drives-down-winding-road-surrounded-by-lush-greene_1772480378551.jpg";
import logoUvmStal from "@assets/____________1772480110697.png";
import logoWb from "@assets/1irjwkgp3m2z5rszv972wbwxjhjjl2kx_1772480113923.png";
import logoMelkom from "@assets/tild3031-6237-4533-b534-613333326531__photo_1772480116794.png";
import manipulatorIcon from "@assets/photo_2026-03-09_23-29-36.jpg";
import imgNewPhoto from "@assets/newPhoto.jpg";
import logoSalair from "@assets/888580_1772480120316.png";
import logoSvetofor from "@assets/Svetofor-logo_1772480123422.png";
import truckIcon1 from "@assets/black-silhouette-truck-logo-icon-car-cargo-cabin-vector-illustration-truck-vector_769314-4443.jpg";
import imgTrucks from "@assets/ed5s9fvz.jpg";
import imgWarehouse from "@assets/tk_1772480287120.jpg";
import imgLogistics from "@assets/istockphoto-518279013-170667a_1773061575970.jpg";
import imgSpecTech from "@assets/large.509979422.jpg.eba12aa69494049409401ac8b79190b4_1772524044839.jpg";
import truckSmall from "@assets/truck_van.png";
import truckMedium from "@assets/truck_orange.png";
import truckLarge from "@assets/truck_flatbed.png";
import truckCrane from "@assets/truck_crane.png";

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
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState({
    from: "",
     to: "",   
    cargoName: "",
    readyDate: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    name: "",
    email: "",
    phone: "",
    comment: ""
  });
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
              logoSize = "max-h-14 md:max-h-16";  // было max-h-10 md:max-h-12
              break;
              case "Wildberries":
              logoSize = "max-h-18 md:max-h-22";
              break;
        case "ТехноНИКОЛЬ":
          logoSize = "max-h-14 md:max-h-16";
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
            className={`${logoSize} max-w-full object-contain transition-all duration-300`}
            style={{}}
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
      const header = document.querySelector('header');
      const headerHeight = header?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      if (navigator.vibrate) navigator.vibrate(10);
    }
  };
  const handleFieldChange = (field: string, value: string) => {
    setFieldValues(prev => ({ ...prev, [field]: value }));
  };

  const handleFieldFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleFieldBlur = () => {
    setFocusedField(null);
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
        alert("❌ Ошибка отправки. Позвоните нам +7 (901) 117-23-71");
      },
    )
    .finally(() => {
      if (submitBtn) {
        submitBtn.innerHTML = originalText || "✉️ Отправить заявку";
        submitBtn.removeAttribute("disabled");
      }
    });


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

  const TruckIcon = ({ type, height, bottomOffset, widthScale, clipPath }: { type: string; height?: string; bottomOffset?: string; widthScale?: number; clipPath?: string }) => {
    const truckMap: { [key: string]: string } = {
      "20t": truckSmall,
      "5t": truckMedium,
      trall: truckLarge,
      crane: truckCrane,
    };

    const getHeight = () => {
      if (height) return height;
      switch (type) {
        case "20t":
          return "45px";
        case "5t":
          return "72px";
        case "trall":
          return "78px";
        default:
          return "70px";
      }
    };

    return (
      <img
        src={truckMap[type]}
        alt={type}
        style={{
          height: getHeight(),
          width: widthScale ? `calc(${getHeight()} * ${widthScale})` : "auto",
          objectFit: "contain",
          objectPosition: "bottom",
          display: "block",
          transform: `translateY(${bottomOffset || '0px'})`,
          clipPath: clipPath,
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
            <a href="tel:+79011172371" className="text-3xl font-extrabold text-[#f05a28]">
              +7 (901) 117-23-71
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
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#f05a28] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white text-xl md:text-2xl font-black">А</span>
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

              { id: "form", label: "Заявка" },     // ← Заявка теперь первая
              { id: "partners", label: "Партнеры" }, // ← Партнеры после заявки
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
            <a href="tel:+79011172371" className={`
                block sm:hidden text-sm font-black whitespace-nowrap transition-colors hover:text-[#f05a28]
                ${scrolled ? "text-[#0b1a33]" : "text-white"}
              `}>
              +7 (901) 117-23-71
            </a>
            {/* Для ПК - обычный номер */}
            <a href="tel:+79011172371" className={`
                hidden sm:block text-lg md:text-xl font-black transition-colors hover:text-[#f05a28]
                ${scrolled ? "text-[#0b1a33]" : "text-white"}
              `}>
              +7 (901) 117-23-71
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16 px-4">
            {[
              { num: 15, text: "лет", suffix: "+" },
              { num: 5000, text: "клиентов", suffix: "+" },
              { num: 24, text: "часа", suffix: "/7" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black text-[#f05a28] mb-0 md:mb-1">
                  {item.num}
                  {item.suffix}
                </div>
                <div className="text-xs md:text-base opacity-80 font-bold text-[#0b1a33]">
                  {item.text}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div {...fadeInUp} className="relative mt-4 lg:mt-0 flex justify-center">
              <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-[6px] md:border-[8px] border-slate-50 w-full max-w-64 md:max-w-72 lg:max-h-110">
                <img
                  src={imgTrucks}
                  alt="Trucks"
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-[#f05a28] p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl shadow-[#f05a28]/30 hidden sm:block">
                <span className="text-2xl md:text-3xl font-black text-white">
                  15+
                </span>
                <p className="text-white/80 font-bold uppercase tracking-widest text-[8px] md:text-[10px] mt-0 md:mt-1">
                  лет в логистике
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-black text-[#0b1a33] mb-4 md:mb-6 leading-tight">
                Ваш надежный <br />
                партнер на дороге
              </h2>
              <div className="space-y-4 text-slate-600 mb-8 text-base leading-relaxed">
                <p className="font-bold text-[#0b1a33] text-xl md:text-2xl">
                  ООО «АлМик» — ваш надежный партнер
                </p>
                <p className="text-sm md:text-base">
                  15+ лет в логистике, 5000+ клиентов, 24/7.
                </p>
                <p className="bg-slate-50 p-4 md:p-5 rounded-[1.5rem] border-l-4 border-[#f05a28] text-sm md:text-base">
                  Автопарк 2023+, страхование, официальное трудоустройство. <strong>Работаем с НДС 22%.</strong>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {[
                  { label: "ИНН", val: "6900000798", icon: "fingerprint" },
                  { label: "ОГРН", val: "1236900010380", icon: "file-contract" },
                  { label: "Директор", val: "Михайлов А.А.", icon: "user-tie" },
                  { label: "Офис", val: "Тверь, пр-кт Калинина, д.17", icon: "map-marker-alt" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-slate-50 p-4 md:p-5 rounded-xl flex gap-4 items-center border border-slate-100 shadow-sm"
                  >
                    <div className="w-11 h-11 md:w-14 md:h-14 bg-[#0b1a33] text-white rounded-xl flex items-center justify-center text-xl md:text-2xl shrink-0">
                      <i className={`fas fa-${item.icon}`}></i>
                    </div>
                    <div>
                      <div className="text-[11px] md:text-sm font-black text-[#f05a28] uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="font-bold text-[#0b1a33] text-sm md:text-base">
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

      {/* FORM SECTION */}
      {/* ФОРМА - БЕЛЫЙ ФОН, ОРАНЖЕВАЯ РАМКА, ОРАНЖЕВЫЕ ПОЛЯ */}
      <section id="form" className="py-6 sm:py-8 md:py-10 px-2 sm:px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-white"></div>

        <div className="relative z-10 flex justify-center">
          <div 
            className="relative bg-white rounded-3xl shadow-xl overflow-hidden w-full sm:w-[500px] md:w-[500px] max-w-[500px]"
            style={{ border: "2px solid #f05a28" }}
          >
            <div className="h-2 bg-[#f05a28]"></div>

            <div className="p-3 sm:p-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center mb-3 sm:mb-5"
              >
                <h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-800">РАССЧИТАТЬ СТОИМОСТЬ</h2>
                <div className="w-8 sm:w-12 h-0.5 bg-[#f05a28] mx-auto rounded-full mt-1 sm:mt-2"></div>
                <p className="text-gray-400 text-[9px] sm:text-xs mt-1 sm:mt-2">Заполните форму — менеджер свяжется с вами</p>
              </motion.div>

              <form onSubmit={handleFormSubmit} className="space-y-2 sm:space-y-3" ref={formRef}>

                {/* Строка 1: Откуда + Куда */}
                <div className="flex justify-center gap-1.5 sm:gap-3">
                  <div className="relative flex-1 sm:w-[210px] sm:flex-none">
                    <label className={`absolute left-2 sm:left-3 transition-all duration-200 pointer-events-none font-medium z-20 ${focusedField === "from" || fieldValues.from ? "top-0 -translate-y-1/2 bg-[#f05a28] text-white px-1 sm:px-2 py-0.5 rounded-full shadow-md text-[7px] sm:text-xs" : "top-1/2 -translate-y-1/2 text-gray-400 text-[9px] sm:text-sm"}`}>
                      Откуда
                    </label>
                    <input
                      type="text"
                      name="from_city"
                      value={fieldValues.from}
                      onChange={(e) => handleFieldChange("from", e.target.value)}
                      onFocus={() => handleFieldFocus("from")}
                      onBlur={handleFieldBlur}
                      className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg sm:rounded-xl border-2 transition-all outline-none bg-white text-gray-700 placeholder:text-gray-300 ${focusedField === "from" ? "border-[#f05a28] ring-2 ring-[#f05a28]/20" : "border-[#f05a28]"}`}
                    />
                  </div>
                  <div className="relative flex-1 sm:w-[210px] sm:flex-none">
                    <label className={`absolute left-2 sm:left-3 transition-all duration-200 pointer-events-none font-medium z-20 ${focusedField === "to" || fieldValues.to ? "top-0 -translate-y-1/2 bg-[#f05a28] text-white px-1 sm:px-2 py-0.5 rounded-full shadow-md text-[7px] sm:text-xs" : "top-1/2 -translate-y-1/2 text-gray-400 text-[9px] sm:text-sm"}`}>
                      Куда
                    </label>
                    <input
                      type="text"
                      name="to_city"
                      value={fieldValues.to}
                      onChange={(e) => handleFieldChange("to", e.target.value)}
                      onFocus={() => handleFieldFocus("to")}
                      onBlur={handleFieldBlur}
                      className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg sm:rounded-xl border-2 transition-all outline-none bg-white text-gray-700 placeholder:text-gray-300 ${focusedField === "to" ? "border-[#f05a28] ring-2 ring-[#f05a28]/20" : "border-[#f05a28]"}`}
                    />
                  </div>
                </div>

                {/* Строка 2: Дата готовности + Вес */}
                <div className="flex justify-center gap-1.5 sm:gap-3">
                  <div className="relative flex-1 sm:w-[210px] sm:flex-none">
                    <label className={`absolute left-2 sm:left-3 transition-all duration-200 pointer-events-none font-medium z-20 ${focusedField === "readyDate" || fieldValues.readyDate ? "top-0 -translate-y-1/2 bg-[#f05a28] text-white px-1 sm:px-2 py-0.5 rounded-full shadow-md text-[7px] sm:text-xs" : "top-1/2 -translate-y-1/2 text-gray-400 text-[9px] sm:text-sm"}`}>
                      Дата готовности
                    </label>
                    <input
                      type="text"
                      name="date"
                      placeholder={focusedField === "readyDate" ? "ДД.ММ.ГГГГ" : ""}
                      value={fieldValues.readyDate}
                      onChange={(e) => handleFieldChange("readyDate", e.target.value)}
                      onFocus={() => handleFieldFocus("readyDate")}
                      onBlur={handleFieldBlur}
                      className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg sm:rounded-xl border-2 transition-all outline-none bg-white text-gray-700 placeholder:text-gray-300 ${focusedField === "readyDate" || fieldValues.readyDate ? "border-[#f05a28] ring-2 ring-[#f05a28]/20" : "border-[#f05a28]"}`}
                    />
                  </div>
                  <div className="relative flex-1 sm:w-[210px] sm:flex-none">
                    <label className={`absolute left-2 sm:left-3 transition-all duration-200 pointer-events-none font-medium z-20 ${focusedField === "weight" || fieldValues.weight ? "top-0 -translate-y-1/2 bg-[#f05a28] text-white px-1 sm:px-2 py-0.5 rounded-full shadow-md text-[7px] sm:text-xs" : "top-1/2 -translate-y-1/2 text-gray-400 text-[9px] sm:text-sm"}`}>
                      Вес (кг)
                    </label>
                    <input
                      type="text"
                      name="weight"
                      value={fieldValues.weight}
                      onChange={(e) => handleFieldChange("weight", e.target.value)}
                      onFocus={() => handleFieldFocus("weight")}
                      onBlur={handleFieldBlur}
                      className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg sm:rounded-xl border-2 transition-all outline-none bg-white text-gray-700 placeholder:text-gray-300 ${focusedField === "weight" ? "border-[#f05a28] ring-2 ring-[#f05a28]/20" : "border-[#f05a28]"}`}
                    />
                  </div>
                </div>

                {/* Строка 3: Наименование груза + Габариты */}
                <div className="flex justify-center gap-1.5 sm:gap-3">
                  <div className="relative flex-1 sm:w-[210px] sm:flex-none">
                    <label className={`absolute left-2 sm:left-3 transition-all duration-200 pointer-events-none font-medium z-20 ${focusedField === "cargoName" || fieldValues.cargoName ? "top-0 -translate-y-1/2 bg-[#f05a28] text-white px-1 sm:px-2 py-0.5 rounded-full shadow-md text-[7px] sm:text-xs" : "top-1/2 -translate-y-1/2 text-gray-400 text-[9px] sm:text-sm"}`}>
                      Наименование груза
                    </label>
                    <input
                      type="text"
                      name="cargo_type"
                      value={fieldValues.cargoName}
                      onChange={(e) => handleFieldChange("cargoName", e.target.value)}
                      onFocus={() => handleFieldFocus("cargoName")}
                      onBlur={handleFieldBlur}
                      className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg sm:rounded-xl border-2 transition-all outline-none bg-white text-gray-700 placeholder:text-gray-300 ${focusedField === "cargoName" ? "border-[#f05a28] ring-2 ring-[#f05a28]/20" : "border-[#f05a28]"}`}
                    />
                  </div>

                  {/* ГАБАРИТЫ */}
                  <div className="flex-1 sm:w-[210px] sm:flex-none">
                    <div className="flex gap-1 sm:gap-2">
                      <div className="relative flex-1">
                        <label className={`absolute left-0.5 sm:left-1 transition-all duration-200 pointer-events-none font-medium z-20 ${focusedField === "length" || fieldValues.length ? "top-0 -translate-y-1/2 bg-[#f05a28] text-white px-0.5 sm:px-1 py-0.5 rounded-full shadow-md text-[5px] sm:text-[8px]" : "top-1/2 -translate-y-1/2 text-gray-400 text-[6px] sm:text-[9px]"}`}>
                          Длина(см)
                        </label>
                        <input
                          type="text"
                          name="length"
                          placeholder={focusedField === "length" ? "см" : ""}
                          value={fieldValues.length}
                          onChange={(e) => handleFieldChange("length", e.target.value)}
                          onFocus={() => handleFieldFocus("length")}
                          onBlur={handleFieldBlur}
                          className={`w-full px-0.5 sm:px-1 py-2 sm:py-2.5 text-[10px] sm:text-sm text-center rounded-lg sm:rounded-xl border-2 transition-all outline-none bg-white text-gray-700 placeholder:text-gray-300 ${focusedField === "length" || fieldValues.length ? "border-[#f05a28] ring-2 ring-[#f05a28]/20" : "border-[#f05a28]"}`}
                        />
                      </div>
                      <div className="relative flex-1">
                        <label className={`absolute left-0.5 sm:left-1 transition-all duration-200 pointer-events-none font-medium z-20 ${focusedField === "width" || fieldValues.width ? "top-0 -translate-y-1/2 bg-[#f05a28] text-white px-0.5 sm:px-1 py-0.5 rounded-full shadow-md text-[5px] sm:text-[8px]" : "top-1/2 -translate-y-1/2 text-gray-400 text-[6px] sm:text-[9px]"}`}>
                          Ширина(см)
                        </label>
                        <input
                          type="text"
                          name="width"
                          placeholder={focusedField === "width" ? "см" : ""}
                          value={fieldValues.width}
                          onChange={(e) => handleFieldChange("width", e.target.value)}
                          onFocus={() => handleFieldFocus("width")}
                          onBlur={handleFieldBlur}
                          className={`w-full px-0.5 sm:px-1 py-2 sm:py-2.5 text-[10px] sm:text-sm text-center rounded-lg sm:rounded-xl border-2 transition-all outline-none bg-white text-gray-700 placeholder:text-gray-300 ${focusedField === "width" || fieldValues.width ? "border-[#f05a28] ring-2 ring-[#f05a28]/20" : "border-[#f05a28]"}`}
                        />
                      </div>
                      <div className="relative flex-1">
                        <label className={`absolute left-0.5 sm:left-1 transition-all duration-200 pointer-events-none font-medium z-20 ${focusedField === "height" || fieldValues.height ? "top-0 -translate-y-1/2 bg-[#f05a28] text-white px-0.5 sm:px-1 py-0.5 rounded-full shadow-md text-[5px] sm:text-[8px]" : "top-1/2 -translate-y-1/2 text-gray-400 text-[6px] sm:text-[9px]"}`}>
                          Высота(см)
                        </label>
                        <input
                          type="text"
                          name="height"
                          placeholder={focusedField === "height" ? "см" : ""}
                          value={fieldValues.height}
                          onChange={(e) => handleFieldChange("height", e.target.value)}
                          onFocus={() => handleFieldFocus("height")}
                          onBlur={handleFieldBlur}
                          className={`w-full px-0.5 sm:px-1 py-2 sm:py-2.5 text-[10px] sm:text-sm text-center rounded-lg sm:rounded-xl border-2 transition-all outline-none bg-white text-gray-700 placeholder:text-gray-300 ${focusedField === "height" || fieldValues.height ? "border-[#f05a28] ring-2 ring-[#f05a28]/20" : "border-[#f05a28]"}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Разделитель */}
                <div className="border-t border-gray-200 pt-2">
                  <h3 className="text-[8px] sm:text-xs font-semibold text-[#f05a28] mb-1 sm:mb-2 uppercase tracking-wider text-center">Ваши данные</h3>

                  {/* Имя + Email */}
                  <div className="flex justify-center gap-1.5 sm:gap-3 mb-1 sm:mb-2">
                    <div className="relative flex-1 sm:w-[210px] sm:flex-none">
                      <label className={`absolute left-2 sm:left-3 transition-all duration-200 pointer-events-none font-medium z-20 ${focusedField === "name" || fieldValues.name ? "top-0 -translate-y-1/2 bg-[#f05a28] text-white px-1 sm:px-2 py-0.5 rounded-full shadow-md text-[7px] sm:text-xs" : "top-1/2 -translate-y-1/2 text-gray-400 text-[9px] sm:text-sm"}`}>
                        Имя <span className="text-[#f05a28]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={fieldValues.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        onFocus={() => handleFieldFocus("name")}
                        onBlur={handleFieldBlur}
                        className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg sm:rounded-xl border-2 transition-all outline-none bg-white text-gray-700 placeholder:text-gray-300 ${focusedField === "name" ? "border-[#f05a28] ring-2 ring-[#f05a28]/20" : "border-[#f05a28]"}`}
                      />
                    </div>
                    <div className="relative flex-1 sm:w-[210px] sm:flex-none">
                      <label className={`absolute left-2 sm:left-3 transition-all duration-200 pointer-events-none font-medium z-20 ${focusedField === "email" || fieldValues.email ? "top-0 -translate-y-1/2 bg-[#f05a28] text-white px-1 sm:px-2 py-0.5 rounded-full shadow-md text-[7px] sm:text-xs" : "top-1/2 -translate-y-1/2 text-gray-400 text-[9px] sm:text-sm"}`}>
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={fieldValues.email}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        onFocus={() => handleFieldFocus("email")}
                        onBlur={handleFieldBlur}
                        className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg sm:rounded-xl border-2 transition-all outline-none bg-white text-gray-700 placeholder:text-gray-300 ${focusedField === "email" ? "border-[#f05a28] ring-2 ring-[#f05a28]/20" : "border-[#f05a28]"}`}
                      />
                    </div>
                  </div>

                  {/* Телефон */}
                  <div className="flex justify-center">
                    <div className="relative w-full sm:w-[432px]">
                      <label className={`absolute left-2 sm:left-3 transition-all duration-200 pointer-events-none font-medium z-20 ${focusedField === "phone" || fieldValues.phone ? "top-0 -translate-y-1/2 bg-[#f05a28] text-white px-1 sm:px-2 py-0.5 rounded-full shadow-md text-[7px] sm:text-xs" : "top-1/2 -translate-y-1/2 text-gray-400 text-[9px] sm:text-sm"}`}>
                        Телефон <span className="text-[#f05a28]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="user_phone"
                        required
                        value={fieldValues.phone}
                        onChange={(e) => handleFieldChange("phone", e.target.value)}
                        onFocus={() => handleFieldFocus("phone")}
                        onBlur={handleFieldBlur}
                        className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg sm:rounded-xl border-2 transition-all outline-none bg-white text-gray-700 placeholder:text-gray-300 ${focusedField === "phone" ? "border-[#f05a28] ring-2 ring-[#f05a28]/20" : "border-[#f05a28]"}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Комментарий */}
                <div className="flex justify-center">
                  <div className="relative w-full sm:w-[432px]">
                    <label className={`absolute left-2 sm:left-3 transition-all duration-200 pointer-events-none font-medium z-20 ${focusedField === "comment" || fieldValues.comment ? "top-0 -translate-y-1/2 bg-[#f05a28] text-white px-1 sm:px-2 py-0.5 rounded-full shadow-md text-[7px] sm:text-xs" : "top-2 sm:top-3 text-gray-400 text-[9px] sm:text-sm"}`}>
                      Комментарий
                    </label>
                    <textarea
                      rows={1}
                      name="comment"
                      value={fieldValues.comment}
                      onChange={(e) => handleFieldChange("comment", e.target.value)}
                      onFocus={() => handleFieldFocus("comment")}
                      onBlur={handleFieldBlur}
                      className={`w-full px-2 sm:px-3 pt-3 sm:pt-4 pb-1 sm:pb-2 text-xs sm:text-sm rounded-lg sm:rounded-xl border-2 transition-all outline-none bg-white text-gray-700 resize-none ${focusedField === "comment" ? "border-[#f05a28] ring-2 ring-[#f05a28]/20" : "border-[#f05a28]"}`}
                    ></textarea>
                  </div>
                </div>

                {/* Кнопка */}
                <div className="flex justify-center pt-1 sm:pt-2">
                  <button
                    type="submit"
                    className="bg-[#f05a28] hover:bg-[#d44a1d] text-white font-extrabold py-3 sm:py-3.5 px-4 sm:px-8 rounded-xl transition-all shadow-lg hover:shadow-xl text-sm sm:text-base uppercase tracking-wide w-full sm:w-[280px]"
                    style={{ fontWeight: 900 }}
                  >
                    Рассчитать стоимость
                  </button>
                </div>

                <p className="text-center text-gray-400 text-[7px] sm:text-[9px] mt-1 sm:mt-2">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            </div>
          </div>
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
          {/* Исправленный заголовок */}
          <div className="text-center w-full">
            <h2 className="text-3xl md:text-6xl font-black text-[#0b1a33] text-center mb-6 md:mb-8">
              Наши контакты
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-4">
              {[
                {
                  label: "Адрес офиса",
                  val: "170001, г. Тверь, пр-кт Калинина, д.17, офис 316в",
                  sub: "",
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
          val: "+7 (901) 117-23-71",
          sub: "almik.ks@yandex.ru",
          icon: "phone-alt",
        }
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

              {/* Левая колонка - Логотип */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-6 md:mb-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#f05a28] rounded-xl flex items-center justify-center shadow-xl">
                    <span className="text-white text-2xl md:text-3xl font-black">А</span>
                  </div>
                  <span className="text-3xl md:text-5xl font-black tracking-tighter text-white">АЛМИК</span>
                </div>
                <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-md mx-auto lg:mx-0 font-bold">
                  Надежная логистика для вашего бизнеса.<br />
                  Работаем на результат, ценим Ваше время.
                </p>
              </div>

              {/* Средняя колонка - Реквизиты */}
              <div className="text-center lg:text-left">
                <h4 className="text-white text-lg md:text-xl font-black uppercase tracking-widest border-b-2 border-[#f05a28] inline-block pb-2 mb-6 md:mb-10 mt-4 md:mt-6">
                  Реквизиты
                </h4>
                <ul className="space-y-3 md:space-y-4 text-slate-400 font-bold text-sm md:text-base">
                  <li className="leading-relaxed">ИНН: 6900000798</li>
                  <li className="leading-relaxed">ОГРН: 1236900010380</li>
                  <li className="leading-relaxed">ООО «АЛМИК»</li>
                </ul>
              </div>

              {/* Правая колонка - Контакты */}
              <div className="text-center lg:text-left">
                <h4 className="text-white text-lg md:text-xl font-black uppercase tracking-widest border-b-2 border-[#f05a28] inline-block pb-2 mb-6 md:mb-10 mt-4 md:mt-6">
                  Контакты
                </h4>
                <div className="space-y-3 md:space-y-4">
                  <a
                    href="tel:+79011172371"
                    className="text-xl md:text-2xl font-black text-white block hover:text-[#f05a28] transition-colors leading-relaxed"
                  >
                    +7 (901) 117-23-71
                  </a>
                  <a
                    href="mailto:almik.ks@yandex.ru"
                    className="text-base md:text-lg font-bold text-slate-500 block hover:text-[#f05a28] transition-colors leading-relaxed"
                  >
                    almik.ks@yandex.ru
                  </a>
                </div>
              </div>
            </div>

            {/* Нижняя строка */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 font-bold tracking-widest text-[10px] md:text-sm uppercase text-center">
              <span>© ООО «АЛМИК»</span>
              <span>Грузоперевозки по России</span>
            </div>
          </div>

          {/* TRUCK ANIMATION */}
          <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-gray-800 via-gray-700 to-gray-800 pointer-events-none border-t border-white/20 z-[4000] overflow-hidden" style={{ height: "65px" }}>
            {/* ДОРОГА С АСФАЛЬТОМ И РАЗМЕТКОЙ */}
            <div className="absolute bottom-0 left-0 w-full bg-gray-700" style={{ height: "45px" }}>
              {/* Асфальт с текстурой */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.15) 20px, rgba(255,255,255,0.15) 40px)`
              }}></div>

              {/* Прерывистая разделительная полоса (жёлтая) */}
              <div className="absolute top-1/2 left-0 w-full -translate-y-1/2" style={{ height: "5px" }}>
                <div className="w-full h-full" style={{
                  backgroundImage: `repeating-linear-gradient(90deg, #ffcc44, #ffcc44 35px, transparent 35px, transparent 70px)`,
                  backgroundRepeat: "repeat-x"
                }}></div>
              </div>

              {/* Боковая линия снизу (белая) */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/80"></div>

              {/* Боковая линия сверху (серая) */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/30"></div>
            </div>

            {/* ПК версия - большие экраны */}
            {/* Для 4 машин на ПК: duration = 24 секунды, интервал = 6 секунд (24/4) */}

            {/* ПЕРВАЯ МАШИНКА */}
            <motion.div
              initial={{ x: "-500px" }}
              animate={{ x: "calc(100vw + 500px)" }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "linear",
                delay: 0,
              }}
              className="absolute hidden sm:block"
              style={{ 
                zIndex: 3, 
                bottom: "-25px",
                left: 0
              }}
            >
              <div className="relative">
                <div className="absolute -bottom-1 left-5 right-5 h-3 bg-black/50 blur-md rounded-full"></div>
                <TruckIcon type="20t" height="115px" bottomOffset="0px" widthScale={1.4} />
              </div>
            </motion.div>

            {/* ВТОРАЯ МАШИНКА - стартует через 6 секунд */}
            <motion.div
              initial={{ x: "-500px" }}
              animate={{ x: "calc(100vw + 500px)" }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "linear",
                delay: 6,
              }}
              className="absolute hidden sm:block"
              style={{ 
                zIndex: 2, 
                bottom: "-40px",
                left: 0
              }}
            >
              <div className="relative">
                <div className="absolute -bottom-1 left-5 right-5 h-3 bg-black/50 blur-md rounded-full"></div>
                <TruckIcon type="5t" height="130px" bottomOffset="0px" widthScale={3.1} />
              </div>
            </motion.div>

            {/* ТРЕТЬЯ МАШИНКА - стартует через 12 секунд */}
            <motion.div
              initial={{ x: "-500px" }}
              animate={{ x: "calc(100vw + 500px)" }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "linear",
                delay: 12,
              }}
              className="absolute hidden sm:block"
              style={{ 
                zIndex: 1, 
                bottom: "-47px",
                left: 0
              }}
            >
              <div className="relative">
                <div className="absolute -bottom-1 left-5 right-5 h-2.5 bg-black/40 blur-sm rounded-full"></div>
                <TruckIcon type="trall" height="160px" bottomOffset="0px" />
              </div>
            </motion.div>

            {/* ЧЕТВЁРТАЯ МАШИНКА - стартует через 18 секунд */}
            <motion.div
              initial={{ x: "-500px" }}
              animate={{ x: "calc(100vw + 500px)" }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "linear",
                delay: 18,
              }}
              className="absolute hidden sm:block"
              style={{ 
                zIndex: 0, 
                bottom: "-20px",
                left: 0
              }}
            >
              <div className="relative">
                <div className="absolute -bottom-1 left-5 right-5 h-3 bg-black/50 blur-md rounded-full"></div>
                <TruckIcon type="crane" height="100px" bottomOffset="0px" />
              </div>
            </motion.div>

            {/* МОБИЛЬНАЯ ВЕРСИЯ */}
            {/* Для 4 машин на мобилке: duration = 12 секунд, интервал = 3 секунды (12/4) */}

            {/* Первая машина - мобилка */}
            <motion.div
              initial={{ x: "-400px" }}
              animate={{ x: "calc(100vw + 400px)" }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
                delay: 0,
              }}
              className="absolute block sm:hidden"
              style={{ 
                zIndex: 3, 
                bottom: "-20px",
                left: 0
              }}
            >
              <div className="relative">
                <div className="absolute -bottom-1 left-5 right-5 h-2.5 bg-black/40 blur-sm rounded-full"></div>
                <TruckIcon type="20t" height="103px" bottomOffset="0px" widthScale={1.4} />
              </div>
            </motion.div>

            {/* Вторая машина - мобилка - стартует через 3 секунды */}
            <motion.div
              initial={{ x: "-400px" }}
              animate={{ x: "calc(100vw + 400px)" }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
                delay: 3,
              }}
              className="absolute block sm:hidden"
              style={{ 
                zIndex: 2, 
                bottom: "-40px",
                left: 0
              }}
            >
              <div className="relative">
                <div className="absolute -bottom-1 left-5 right-5 h-2.5 bg-black/40 blur-sm rounded-full"></div>
                <TruckIcon type="5t" height="130px" bottomOffset="0px" widthScale={2.05} />
              </div>
            </motion.div>

            {/* Третья машина - мобилка - стартует через 6 секунд */}
            <motion.div
              initial={{ x: "-400px" }}
              animate={{ x: "calc(100vw + 400px)" }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
                delay: 6,
              }}
              className="absolute block sm:hidden"
              style={{ 
                zIndex: 1, 
                bottom: "-40px",
                left: 0
              }}
            >
              <div className="relative">
                <div className="absolute -bottom-1 left-5 right-5 h-2 bg-black/40 blur-sm rounded-full"></div>
                <TruckIcon type="trall" height="150px" bottomOffset="0px" />
              </div>
            </motion.div>

            {/* Четвёртая машина - мобилка - стартует через 9 секунд */}
            <motion.div
              initial={{ x: "-400px" }}
              animate={{ x: "calc(100vw + 400px)" }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
                delay: 9,
              }}
              className="absolute block sm:hidden"
              style={{ 
                zIndex: 0, 
                bottom: "-20px",
                left: 0
              }}
            >
              <div className="relative">
                <div className="absolute -bottom-1 left-5 right-5 h-2 bg-black/40 blur-sm rounded-full"></div>
                <TruckIcon type="crane" height="100px" bottomOffset="0px" />
              </div>
            </motion.div>
          </div>
        {" "}

      </footer>
    </div>
  );
}
