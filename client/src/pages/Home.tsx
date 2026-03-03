import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
import imgTrucks from "@assets/image_1772480282842.png";
import imgWarehouse from "@assets/tk_1772480287120.jpg";
import imgLogistics from "@assets/9ce8d2a17992f3891548dd932eb49e17_1772480373987.jpg";
import imgSpecTech from "@assets/large.509979422.jpg.eba12aa69494049409401ac8b79190b4_1772524044839.jpg";
import imgSmallTruck from "@assets/y91wxu8z_1772480362456.jpg";
import imgMovingAnim from "@assets/1691346515_grizly-club-p-kartinki-gruzovik-bez-fona-47_1772523819759.png";
import imgHouseholdMoving from "@assets/XXL_height_1772524493045.jfif";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const getPartnerLogo = (partnerName: string) => {
    const logoMap: { [key: string]: string } = {
      'Русский Свет': logoRussvet,
      'Ozon': logoOzon,
      'Тверской Вагоностроительный Завод': logoTvz,
      'Металл Профиль': logoMetallprofil,
      'ТехноНИКОЛЬ': logoTechnonicol,
      'УВМ-Сталь': logoUvmStal,
      'Wildberries': logoWb,
      'Мелькомбинат': logoMelkom,
      'Салаир': logoSalair,
      'Светофор': logoSvetofor
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
            borderColor: "#f05a28"
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="h-24 w-full flex items-center justify-center p-4 bg-white rounded-2xl shadow-lg border-2 border-transparent group transition-all duration-300"
        >
          <img 
            src={logoUrl} 
            alt={partnerName} 
            className="max-h-16 max-w-full object-contain transition-all duration-300" 
          />
        </motion.div>
      );
    }
    return null;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      // Легкая вибрация при нажатии (на мобилках)
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
    'Русский Свет', 'Ozon', 'Тверской Вагоностроительный Завод',
    'Металл Профиль', 'ТехноНИКОЛЬ', 'УВМ-Сталь',
    'Wildberries', 'Мелькомбинат', 'Салаир', 'Светофор'
  ];

  return (
    <div className="flex flex-col w-full bg-[#f8faff]">
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-[5000] bg-[#0b1a33] flex flex-col items-center justify-center gap-8 text-white p-6"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-4xl">✕</button>
            <button onClick={() => scrollTo('hero')} className="text-2xl font-bold">Главная</button>
            <button onClick={() => scrollTo('about')} className="text-2xl font-bold">О компании</button>
            <button onClick={() => scrollTo('services')} className="text-2xl font-bold">Услуги</button>
            <button onClick={() => scrollTo('partners')} className="text-2xl font-bold">Партнеры</button>
            <button onClick={() => scrollTo('form')} className="text-2xl font-bold">Заявка</button>
            <button onClick={() => scrollTo('contacts')} className="text-2xl font-bold">Контакты</button>
            <a href="tel:+79004746688" className="text-3xl font-extrabold text-[#f05a28]">+7 (900) 474-66-88</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className={`fixed top-0 left-0 w-full z-[2000] transition-all duration-300 py-4 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-12 h-12 bg-[#f05a28] rounded-2xl flex items-center justify-center shadow-xl shadow-[#f05a28]/20">
              <span className="text-white font-black text-2xl">A</span>
            </div>
            <span className={`text-3xl font-black tracking-tighter ${scrolled ? 'text-[#0b1a33]' : 'text-white'}`}>АЛМИК</span>
          </div>

          <nav className="hidden lg:flex gap-8 font-bold text-sm uppercase tracking-widest">
            {['hero', 'about', 'services', 'partners', 'contacts'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item)} 
                className={`transition-colors hover:text-[#f05a28] ${scrolled ? 'text-slate-600' : 'text-white/90'}`}
              >
                {item === 'hero' ? 'Главная' : item === 'about' ? 'О компании' : item === 'services' ? 'Услуги' : item === 'partners' ? 'Партнеры' : 'Контакты'}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <a href="tel:+79004746688" className={`hidden sm:block text-xl font-black transition-colors hover:text-[#f05a28] ${scrolled ? 'text-[#0b1a33]' : 'text-white'}`}>
              +7 (900) 474-66-88
            </a>
            <button onClick={() => setIsMenuOpen(true)} className={`lg:hidden text-4xl p-2 ${scrolled ? 'text-[#0b1a33]' : 'text-white'}`}>☰</button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={imgHero} className="w-full h-full object-cover" alt="Logistic background" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a33] via-[#0b1a33]/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
            <div className="inline-block px-5 py-2 bg-[#f05a28]/20 border border-[#f05a28]/30 rounded-full mb-8">
              <span className="text-[#f05a28] font-black text-sm tracking-widest uppercase">Логистика высшего уровня 24/7</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.05]">
              ГРУЗОПЕРЕВОЗКИ <br />ПО <span className="text-[#f05a28]">РОССИИ</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl leading-relaxed">
              Современный автопарк ТС от 2023 года. Полная страховка грузов. Команда с 15-летним экспертным опытом в логистике.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button onClick={() => scrollTo('form')} className="btn-orange bg-[#f05a28] text-white px-12 py-5 rounded-[2rem] font-black text-xl hover:bg-[#d44a1d] transition-all shadow-2xl shadow-[#f05a28]/30">
                Рассчитать стоимость
              </button>
              <button onClick={() => scrollTo('about')} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-12 py-5 rounded-[2rem] font-black text-xl hover:bg-white/20 transition-all">
                О компании
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 px-6 bg-white overflow-hidden">
        <div className="container mx-auto">
          {/* Цифры в цифрах */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
            {[
              { num: 15, text: 'лет опыта', suffix: '+' },
              { num: 5000, text: 'довольных клиентов', suffix: '+' },
              { num: 50, text: 'единиц техники', suffix: '' },
              { num: 24, text: 'часа в сутки', suffix: '/7' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-black text-[#f05a28] mb-2">
                  {item.num}{item.suffix}
                </div>
                <div className="text-lg opacity-80 font-bold text-[#0b1a33]">{item.text}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp} className="relative">
              <div className="rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-slate-50 aspect-video lg:aspect-square shimmer-img">
                <img src={imgTrucks} alt="Trucks" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-[#f05a28] p-10 rounded-[3rem] shadow-2xl shadow-[#f05a28]/30 hidden md:block">
                <span className="text-5xl font-black text-white">15+</span>
                <p className="text-white/80 font-bold uppercase tracking-widest text-xs mt-3">лет в логистике</p>
              </div>
            </motion.div>
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl md:text-6xl font-black text-[#0b1a33] mb-8 leading-tight">Ваш надежный <br />партнер на дороге</h2>
              <div className="space-y-6 text-slate-600 mb-12 text-lg leading-relaxed">
                <p className="font-bold text-[#0b1a33] text-2xl">ООО «АлМик» — эксперты в области комплексных транспортных решений.</p>
                <p>Несмотря на то, что бренд АлМик официально зарегистрирован в 2023 году, ядро нашей команды обладает более чем 15-летним опытом в сфере логистики.</p>
                <p className="bg-slate-50 p-6 rounded-[2rem] border-l-8 border-[#f05a28]">
                  Мы используем собственный парк новых ТС 2023+ года выпуска. Все перевозки застрахованы, а каждый водитель оформлен официально. <strong>Работаем с НДС 22% (ОСНО).</strong>
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: 'ИНН', val: '6900000798', icon: 'fingerprint' },
                  { label: 'ОГРН', val: '1236900010380', icon: 'file-contract' },
                  { label: 'Директор', val: 'Михайлов А.А.', icon: 'user-tie' },
                  { label: 'Офис', val: 'Тверь, Петербургское ш. 93к1', icon: 'map-marker-alt' }
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 p-6 rounded-3xl flex gap-5 items-center border border-slate-100 shadow-sm">
                    <div className="w-14 h-14 bg-[#0b1a33] text-white rounded-2xl flex items-center justify-center text-2xl shrink-0">
                      <i className={`fas fa-${item.icon}`}></i>
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#f05a28] uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="font-bold text-[#0b1a33] text-sm">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 bg-[#f8faff] overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0b1a33] mb-6">Наши услуги</h2>
            <div className="w-24 h-2 bg-[#f05a28] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Грузоперевозки', desc: 'От 1.5 до 20 тонн: Газели, 5т, 10т, Еврофуры.', icon: 'truck-moving', img: imgWarehouse },
              { title: 'Офисные и домашние переезды', desc: 'Комплексное решение для бизнеса и частных лиц. Бережная перевозка мебели и вещей.', icon: 'home', img: imgHouseholdMoving },
              { title: 'Спецтехника', desc: 'Аренда манипуляторов, погрузчиков и кранов.', icon: 'forklift', img: imgSpecTech }
            ].map((service, idx) => (
              <motion.div key={idx} {...fadeInUp} transition={{ delay: idx * 0.1 }} className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div className="h-48 overflow-hidden relative shimmer-img">
                  <img src={service.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={service.title} />
                  <div className="absolute inset-0 bg-[#0b1a33]/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="w-14 h-14 bg-[#f05a28] rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-[#f05a28]/30 -mt-16 relative z-10 transition-transform group-hover:scale-110">
                    <i className={`fas fa-${service.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-2xl font-black text-[#0b1a33] mb-4">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm mb-6 flex-1">{service.desc}</p>
                  <button onClick={() => scrollTo('form')} className="text-[#f05a28] font-black text-sm flex items-center gap-3 hover:gap-5 transition-all">
                    Заказать услугу <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="py-24 px-6 bg-white overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0b1a33] mb-6">Основные партнеры</h2>
            <div className="w-24 h-2 bg-[#f05a28] mx-auto rounded-full mb-8"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {partners.map((partner, index) => (
              <motion.div key={index} {...fadeInUp} transition={{ delay: index * 0.05 }}>
                {getPartnerLogo(partner)}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="form" className="py-24 px-6 bg-[#0b1a33] relative overflow-hidden">
        <div className="stars"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto bg-white p-8 md:p-16 rounded-[4rem] shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-[#0b1a33] mb-12 text-center uppercase tracking-tight">Оформить заявку</h2>
            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Ваше имя *</label>
                  <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none transition-all font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Телефон *</label>
                  <input required type="tel" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none transition-all font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email</label>
                  <input type="email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none transition-all font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Откуда (город, адрес)</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none transition-all font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Куда (город, адрес)</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none transition-all font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Длина (м)</label>
                  <input type="number" step="0.1" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none transition-all font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Ширина (м)</label>
                  <input type="number" step="0.1" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none transition-all font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Высота (м)</label>
                  <input type="number" step="0.1" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none transition-all font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Вес (тонн)</label>
                  <input type="number" step="0.1" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none transition-all font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Тип груза</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none transition-all font-bold" placeholder="Оборудование, мебель..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Тип кузова</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none transition-all font-bold" placeholder="Тент, фургон..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Машин / Дата загрузки</label>
                  <div className="flex gap-2">
                    <input type="number" defaultValue="1" className="w-20 px-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none font-bold" />
                    <input type="date" className="flex-1 px-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none font-bold" />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 py-4">
                {['Отдельной машиной (FTL)', 'Догрузом (LTL)', 'Страховка груза'].map(opt => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-6 h-6 border-2 border-slate-200 rounded-lg group-hover:border-[#f05a28] flex items-center justify-center transition-all">
                      <input type="checkbox" className="hidden peer" />
                      <div className="w-full h-full bg-[#f05a28] rounded-sm flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-all">
                        <i className="fas fa-check text-xs text-white"></i>
                      </div>
                    </div>
                    <span className="font-bold text-slate-700">{opt}</span>
                  </label>
                ))}
              </div>

              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 w-full max-w-xs">
                  <label className="text-sm font-bold text-slate-700 block mb-2">Ставка (руб)</label>
                  <input type="number" placeholder="0.00" className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-[#f05a28] outline-none font-bold" />
                </div>
                <div className="flex flex-wrap gap-4">
                  {['С НДС, безнал', 'Без НДС, безнал', 'Наличными'].map(pay => (
                    <label key={pay} className="flex items-center gap-2 cursor-radio">
                      <input type="radio" name="payment" className="w-5 h-5 accent-[#f05a28]" />
                      <span className="font-bold text-slate-700">{pay}</span>
                    </label>
                  ))}
                </div>
              </div>

              <textarea rows={3} placeholder="Дополнительный комментарий..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#f05a28] outline-none transition-all font-bold"></textarea>
              
              <div className="text-center">
                <button type="submit" className="btn-orange bg-[#f05a28] text-white px-20 py-6 rounded-[2rem] font-black text-2xl hover:bg-[#d44a1d] transition-all shadow-xl shadow-[#f05a28]/40 mb-4">
                  ОТПРАВИТЬ ЗАЯВКУ
                </button>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
                <p className="text-[#0b1a33] font-bold italic text-lg opacity-70">«Ваш надежный партнер и помощник в решении транспортных задач»</p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 bg-white overflow-hidden">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-[#0b1a33] mb-12 text-center">Наши контакты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { label: 'Адрес офиса', val: 'Тверь, Петербургское ш. 93к1, оф. 516', sub: 'БЦ «Синтез», 5 этаж', icon: 'map-marker-alt' },
              { label: 'Юридический', val: 'Тверь, ул. Седова, 55, кв. 80', sub: 'ООО «АЛМИК»', icon: 'building' },
              { label: 'Связь', val: '+7 (900) 474-66-88', sub: 'almik69@mail.ru', icon: 'phone-alt' }
            ].map((c, i) => (
              <motion.div key={i} {...fadeInUp} className="text-center group">
                <div className="w-20 h-20 bg-slate-50 text-[#f05a28] rounded-[2rem] flex items-center justify-center text-3xl mx-auto mb-6 group-hover:bg-[#f05a28] group-hover:text-white transition-all">
                  <i className={`fas fa-${c.icon}`}></i>
                </div>
                <p className="text-[#f05a28] font-black uppercase tracking-widest text-xs mb-2">{c.label}</p>
                <p className="text-xl font-black text-[#0b1a33] mb-1">{c.val}</p>
                <p className="text-slate-500 font-bold">{c.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 pt-24 pb-32 overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 mb-20 border-b border-slate-900 pb-20">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-16 h-16 bg-[#f05a28] rounded-2xl flex items-center justify-center"><span className="text-white font-black text-3xl">A</span></div>
                <span className="text-5xl font-black tracking-tighter text-white">АЛМИК</span>
              </div>
              <p className="text-slate-500 text-2xl leading-relaxed">Надежная логистика для вашего бизнеса. Работаем на результат, ценим Ваше время.</p>
            </div>
            <div>
              <h4 className="text-white text-xl font-black uppercase tracking-widest mb-10 border-b-2 border-[#f05a28] inline-block pb-2">Реквизиты</h4>
              <ul className="space-y-4 text-slate-400 font-bold">
                <li>ИНН: 6900000798</li>
                <li>ОГРН: 1236900010380</li>
                <li>ООО «АЛМИК»</li>
              </ul>
            </div>
            <div className="text-right lg:text-left">
              <h4 className="text-white text-xl font-black uppercase tracking-widest mb-10 border-b-2 border-[#f05a28] inline-block pb-2">Контакты</h4>
              <a href="tel:+79004746688" className="text-3xl font-black text-white block mb-4 hover:text-[#f05a28]">+7 (900) 474-66-88</a>
              <a href="mailto:almik69@mail.ru" className="text-2xl font-bold text-slate-500 hover:text-[#f05a28]">almik69@mail.ru</a>
            </div>
          </div>
          <div className="flex justify-between items-center text-slate-600 font-bold tracking-widest text-sm uppercase">
            <span>© {new Date().getFullYear()} ООО «АЛМИК»</span>
            <span>Грузоперевозки по России</span>
          </div>
        </div>

        {/* TRUCK ANIMATION */}
        <div className="fixed bottom-0 left-0 w-full h-12 bg-slate-900/80 backdrop-blur-sm pointer-events-none border-t border-white/5 z-[4000]">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10"></div>
          <motion.div
            animate={{ x: ["-20%", "120%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="h-full absolute top-[-10px]"
          >
            <div className="relative">
              {/* LED Underglow */}
              <div className="absolute -bottom-2 left-4 right-4 h-4 bg-[#f05a28]/40 blur-md rounded-full animate-pulse"></div>
              <img src={imgMovingAnim} alt="Truck Anim" className="h-14 w-auto drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)] relative z-10" />
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
