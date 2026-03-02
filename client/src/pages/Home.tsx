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
import imgManager from "@assets/900h480__1772480291927.jpg";

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
        <div className="h-24 w-full flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
          <img 
            src={logoUrl} 
            alt={partnerName} 
            className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" 
          />
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
    <div className="flex flex-col w-full bg-slate-50">
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
            <button onClick={() => scrollTo('why-us')} className="text-2xl font-bold">Почему мы</button>
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
            {['hero', 'about', 'why-us', 'services', 'partners', 'contacts'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item)} 
                className={`transition-colors hover:text-[#f05a28] ${scrolled ? 'text-slate-600' : 'text-white/90'}`}
              >
                {item === 'hero' ? 'Главная' : item === 'about' ? 'О компании' : item === 'why-us' ? 'Почему мы' : item === 'services' ? 'Услуги' : item === 'partners' ? 'Партнеры' : 'Контакты'}
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

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
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
              <button 
                onClick={() => scrollTo('form')} 
                className="bg-[#f05a28] text-white px-12 py-5 rounded-[2rem] font-black text-xl hover:bg-[#d44a1d] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-[#f05a28]/30"
              >
                Рассчитать стоимость
              </button>
              <button 
                onClick={() => scrollTo('about')} 
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-12 py-5 rounded-[2rem] font-black text-xl hover:bg-white/20 transition-all"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-slate-50 aspect-video lg:aspect-square">
                <img src={imgTrucks} alt="Trucks" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-[#f05a28] p-10 rounded-[3rem] shadow-2xl shadow-[#f05a28]/30 hidden md:block">
                <span className="text-5xl font-black text-white">15+</span>
                <p className="text-white/80 font-bold uppercase tracking-widest text-xs mt-3">лет в логистике</p>
              </div>
            </motion.div>
            
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-[#0b1a33] mb-8 leading-tight">Ваш надежный <br />партнер на дороге</h2>
              <div className="space-y-6 text-slate-600 mb-12 text-lg leading-relaxed">
                <p className="font-bold text-[#0b1a33] text-2xl">
                  ООО «АлМик» — эксперты в области комплексных транспортных решений.
                </p>
                <p>
                  Несмотря на то, что бренд АлМик официально зарегистрирован в 2023 году, ядро нашей команды обладает более чем 15-летним опытом в сфере логистики. Мы прошли путь от малого бизнеса до надежного партнера крупнейших ритейлеров страны.
                </p>
                <p className="bg-slate-50 p-6 rounded-[2rem] border-l-8 border-[#f05a28]">
                  Мы используем собственный парк новых ТС 2023+ года выпуска. Все перевозки застрахованы, а каждый водитель оформлен официально. <strong>Работаем с НДС 20% (ОСНО).</strong>
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
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-us" className="py-24 px-6 bg-[#0b1a33] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f05a28]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Почему выбирают нас</h2>
            <div className="w-24 h-2 bg-[#f05a28] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: 'fa-route', title: 'Грузоперевозки «под ключ»', desc: 'Берём на себя всё: от подачи транспорта до страхования и документооборота.' },
              { icon: 'fa-map-marked-alt', title: 'География без границ', desc: 'Доставка по всей РФ и в дружественные страны СНГ (Беларусь, Казахстан и др.).' },
              { icon: 'fa-truck', title: 'Новый автопарк', desc: 'Собственные автомобили 2023+ года выпуска. Гарантия технической исправности.' },
              { icon: 'fa-shield-alt', title: 'Безопасность груза', desc: 'Полная страховка каждой перевозки. Ответственность застрахована на 100%.' },
              { icon: 'fa-clock', title: 'Скорость и пунктуальность', desc: 'Строгое соблюдение сроков. Оперативная обработка заявок за 15 минут.' },
              { icon: 'fa-file-invoice', title: 'Прозрачность и НДС', desc: 'Официальный договор, работа по ОСНО с НДС 20%. Полный пакет документов.' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 transition-all group"
              >
                <div className="w-16 h-16 bg-[#f05a28] rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-xl shadow-[#f05a28]/20 transition-transform group-hover:rotate-12">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 bg-white overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0b1a33] mb-6">Наши услуги</h2>
            <div className="w-24 h-2 bg-[#f05a28] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: 'Грузоперевозки', desc: 'От 1.5 до 20 тонн: Газели, 5т, 10т, Еврофуры.', icon: 'truck-moving', img: imgWarehouse },
              { title: 'Офисные переезды', desc: 'Комплексное решение для бизнеса любого масштаба.', icon: 'briefcase', img: imgLogistics },
              { title: 'Спецтехника', desc: 'Аренда манипуляторов, погрузчиков и кранов.', icon: 'forklift', img: imgWarehouse }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="group relative overflow-hidden rounded-[3rem] bg-slate-50 border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={service.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={service.title} />
                  <div className="absolute inset-0 bg-[#0b1a33]/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-10">
                  <div className="w-16 h-16 bg-[#f05a28] rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-[#f05a28]/30 -mt-20 relative z-10 transition-transform group-hover:scale-110">
                    <i className={`fas fa-${service.icon} text-3xl text-white`}></i>
                  </div>
                  <h3 className="text-3xl font-black text-[#0b1a33] mb-4">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg mb-8">{service.desc}</p>
                  <button onClick={() => scrollTo('form')} className="text-[#f05a28] font-black text-lg flex items-center gap-3 hover:gap-5 transition-all">
                    Заказать услугу <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="py-24 px-6 bg-slate-50 overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0b1a33] mb-6">Основные партнеры</h2>
            <div className="w-24 h-2 bg-[#f05a28] mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto italic">
              «Надеемся стать для Вас в будущем надежным партнером и помощником в решении Ваших транспортных задач.»
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {partners.map((partner, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {getPartnerLogo(partner)}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="form" className="py-24 px-6 bg-[#0b1a33] relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto bg-white p-10 md:p-20 rounded-[4rem] shadow-[0_50px_100px_-12px_rgba(240,90,40,0.25)] border-8 border-[#f05a28]/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <h2 className="text-4xl md:text-6xl font-black text-[#0b1a33] mb-8 leading-tight">ОФОРМИТЬ <br /><span className="text-[#f05a28]">ЗАЯВКУ</span></h2>
                <p className="text-slate-500 text-xl mb-12 leading-relaxed">Заполните форму, и наши логисты свяжутся с вами в течение 15 минут для расчета точной стоимости и условий.</p>
                
                <div className="space-y-10">
                  <div className="flex items-center gap-6 group">
                    <div className="w-20 h-20 bg-slate-100 rounded-[2rem] flex items-center justify-center group-hover:bg-[#f05a28] transition-all">
                      <i className="fas fa-phone-alt text-3xl text-[#0b1a33] group-hover:text-white"></i>
                    </div>
                    <div>
                      <p className="text-[#f05a28] font-black uppercase tracking-[0.2em] text-xs mb-2">Горячая линия</p>
                      <a href="tel:+79004746688" className="text-3xl font-black text-[#0b1a33]">+7 (900) 474-66-88</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-20 h-20 bg-slate-100 rounded-[2rem] flex items-center justify-center group-hover:bg-[#f05a28] transition-all">
                      <i className="fas fa-envelope text-3xl text-[#0b1a33] group-hover:text-white"></i>
                    </div>
                    <div>
                      <p className="text-[#f05a28] font-black uppercase tracking-[0.2em] text-xs mb-2">Email</p>
                      <a href="mailto:almik69@mail.ru" className="text-3xl font-black text-[#0b1a33]">almik69@mail.ru</a>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input required type="text" placeholder="Ваше имя" className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-slate-100 text-[#0b1a33] focus:outline-none focus:border-[#f05a28] transition-colors font-bold" />
                  <input required type="tel" placeholder="+7 (___) ___-__-__" className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-slate-100 text-[#0b1a33] focus:outline-none focus:border-[#f05a28] transition-colors font-bold" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input type="text" placeholder="Откуда" className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-slate-100 text-[#0b1a33] focus:outline-none focus:border-[#f05a28] transition-colors font-bold" />
                  <input type="text" placeholder="Куда" className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-slate-100 text-[#0b1a33] focus:outline-none focus:border-[#f05a28] transition-colors font-bold" />
                </div>
                <textarea rows={4} placeholder="Детали груза: вес, объем, тип..." className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-slate-100 text-[#0b1a33] focus:outline-none focus:border-[#f05a28] transition-colors font-bold resize-none"></textarea>
                <button type="submit" className="w-full bg-[#f05a28] text-white py-6 rounded-[2rem] font-black text-2xl hover:bg-[#d44a1d] transition-all shadow-2xl shadow-[#f05a28]/40 hover:scale-[1.02] active:scale-98">
                  Отправить заявку
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-[#0b1a33] mb-12">Наши контакты</h2>
              <div className="space-y-10">
                <div className="flex gap-8 items-start">
                  <div className="w-20 h-20 bg-slate-100 text-[#f05a28] rounded-[2rem] flex items-center justify-center text-3xl shrink-0">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Адрес офиса</p>
                    <p className="text-2xl font-black text-[#0b1a33]">Тверь, Петербургское шоссе 93к1, оф. 516</p>
                    <p className="text-slate-500 mt-2">БЦ «Синтез», 5 этаж</p>
                  </div>
                </div>
                <div className="flex gap-8 items-start">
                  <div className="w-20 h-20 bg-slate-100 text-[#f05a28] rounded-[2rem] flex items-center justify-center text-3xl shrink-0">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Режим работы</p>
                    <p className="text-2xl font-black text-[#0b1a33]">Пн-Вс: 08:00 – 22:00</p>
                    <p className="text-slate-500 mt-2">Без перерывов и выходных</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[4rem] overflow-hidden shadow-2xl h-[500px] border-8 border-slate-50">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2179.845839213197!2d35.833633!3d56.885667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b42b93e68058b7%3A0xc3f1797d025170d1!2z0J_QtdGC0LXRgNCx0YPRgNCz0YHQutC-0LUg0YguLCA5M9C6MSwg0KLQstC10YDRjCwg0KLQstC10YDRgdC60LDRjyDQvtCx0LsuLCAxNzAwMzM!5e0!3m2!1sru!2sru!4v1711234567890!5m2!1sru!2sru" 
                className="w-full h-full border-0" 
                allowFullScreen={true} 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 pt-24 pb-12 overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-20 mb-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-16 h-16 bg-[#f05a28] rounded-2xl flex items-center justify-center">
                  <span className="text-white font-black text-3xl">A</span>
                </div>
                <span className="text-5xl font-black tracking-tighter text-white">АЛМИК</span>
              </div>
              <p className="text-slate-500 text-2xl leading-relaxed max-w-xl">
                Надежная логистика для вашего бизнеса. Работаем на результат, ценим Ваше время, гарантируем безопасность каждого груза.
              </p>
            </div>

            <div>
              <h4 className="text-white text-xl font-black uppercase tracking-widest mb-10 border-b-2 border-[#f05a28] inline-block pb-2">Локации</h4>
              <ul className="space-y-6 text-slate-400 text-lg">
                <li className="flex gap-4">
                  <i className="fas fa-map-marker-alt text-[#f05a28] mt-1.5 text-xl"></i>
                  <div>
                    <span className="text-white font-bold block mb-1">Юридический адрес:</span>
                    <span>Тверь, ул. Седова, 55, кв. 80</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <i className="fas fa-building text-[#f05a28] mt-1.5 text-xl"></i>
                  <div>
                    <span className="text-white font-bold block mb-1">Фактический адрес:</span>
                    <span>Тверь, Петербургское шоссе 93к1, оф. 516</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xl font-black uppercase tracking-widest mb-10 border-b-2 border-[#f05a28] inline-block pb-2">Юр. данные</h4>
              <ul className="space-y-6 text-slate-400 text-lg font-bold">
                <li>ИНН: 6900000798</li>
                <li>ОГРН: 1236900010380</li>
                <li className="pt-6">
                  <div className="flex gap-4">
                    {['facebook', 'instagram', 'vk', 'telegram'].map((s) => (
                      <a key={s} href="#" className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center hover:bg-[#f05a28] hover:text-white transition-all">
                        <i className={`fab fa-${s} text-xl`}></i>
                      </a>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-600 font-bold tracking-wider">© {new Date().getFullYear()} ООО «АЛМИК». ГРУЗОПЕРЕВОЗКИ ЛЮБОЙ СЛОЖНОСТИ.</p>
            <p className="text-slate-600 font-bold">ИНН 6900000798</p>
          </div>
        </div>

        {/* TRUCK DECORATION */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-slate-900 opacity-30">
          <motion.div
            animate={{ x: ["-100%", "500%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="text-4xl absolute -top-10"
          >
            🚚
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
