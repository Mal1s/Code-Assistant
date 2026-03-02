import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  // Список партнеров
  const partners = [
    'Русский Свет', 'Ozon', 'Тверской Вагоностроительный Завод',
    'Металл Профиль', 'ТехноНИКОЛЬ', 'УВМ-Сталь',
    'Wildberries', 'Мелькомбинат', 'Салаир', 'Светофор'
  ];

  // Соответствие названий и файлов логотипов
  const logos = {
    'Русский Свет': 'russvet.png',
    'Ozon': 'ozon.png',
    'Тверской Вагоностроительный Завод': 'tvz.png',
    'Металл Профиль': 'metallprofil.png',
    'ТехноНИКОЛЬ': 'technonicol.png',
    'УВМ-Сталь': 'uvm-stal.png',
    'Wildberries': 'wb.png',
    'Мелькомбинат': 'melkom.png',
    'Салаир': 'salair.png',
    'Светофор': 'svetofor.png'
  };

  return (
    <div className="flex flex-col w-full">
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
            className="fixed inset-0 z-[2000] bg-[#0b1a33] flex flex-col items-center justify-center gap-8 text-white p-6"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-4xl">✕</button>
            <button onClick={() => scrollTo('hero')} className="text-2xl font-bold">Главная</button>
            <button onClick={() => scrollTo('about')} className="text-2xl font-bold">О компании</button>
            <button onClick={() => scrollTo('why-us')} className="text-2xl font-bold">Почему мы</button>
            <button onClick={() => scrollTo('services')} className="text-2xl font-bold">Услуги</button>
            <button onClick={() => scrollTo('partners')} className="text-2xl font-bold">Партнеры</button>
            <button onClick={() => scrollTo('form')} className="text-2xl font-bold">Заявка</button>
            <button onClick={() => scrollTo('contacts')} className="text-2xl font-bold">Контакты</button>
            <a href="tel:+79011172371" className="text-3xl font-extrabold text-[#f05a28]">+7 (901) 117-23-71</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="header px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="text-2xl md:text-3xl font-black tracking-tighter">
            <span className="text-[#f05a28]">А</span>ЛМИК
          </div>

          <nav className="hidden lg:flex gap-8 font-semibold">
            <button onClick={() => scrollTo('hero')} className="hover:text-[#f05a28]">Главная</button>
            <button onClick={() => scrollTo('about')} className="hover:text-[#f05a28]">О компании</button>
            <button onClick={() => scrollTo('why-us')} className="hover:text-[#f05a28]">Почему мы</button>
            <button onClick={() => scrollTo('services')} className="hover:text-[#f05a28]">Услуги</button>
            <button onClick={() => scrollTo('partners')} className="hover:text-[#f05a28]">Партнеры</button>
            <button onClick={() => scrollTo('contacts')} className="hover:text-[#f05a28]">Контакты</button>
          </nav>

          <div className="flex items-center gap-4">
            <a href="tel:+79011172371" className="hidden sm:block text-lg md:text-xl font-bold hover:text-[#f05a28] transition-colors">
              +7 (901) 117-23-71
            </a>
            <button onClick={() => scrollTo('form')} className="hidden md:block btn-orange !py-2 !px-6 text-sm">
              Заказать звонок
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-3xl p-2">☰</button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section 
        id="hero" 
        className="hero-section"
        style={{
          backgroundImage: scrolled
            ? "linear-gradient(rgba(11, 26, 51, 0.9), rgba(11, 26, 51, 0.9)), url('https://images.unsplash.com/photo-1519003722824-8e0e021f4c0a?w=1200')"
            : "linear-gradient(rgba(11, 26, 51, 0.85), rgba(11, 26, 51, 0.85)), url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200')",
          backgroundAttachment: scrolled ? 'fixed' : 'scroll'
        }}
      >
        <div className="max-w-5xl text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1]"
          >
            ГРУЗОПЕРЕВОЗКИ ПО РОССИИ <br />И ДРУЖЕСТВЕННЫМ СТРАНАМ
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto font-medium"
          >
            Современный автопарк (ТС от 2023 года). Полная страховка грузов. 
            Команда с 15-летним опытом.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <button onClick={() => scrollTo('form')} className="btn-orange">Рассчитать стоимость</button>
            <button onClick={() => scrollTo('about')} className="btn-outline">Подробнее о компании</button>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="rounded-[30px] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1624365169361-5ced8dd8e3e0?w=800" alt="Truck" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#0b1a33] mb-4">ООО «АЛМИК» — ваш надежный партнер в логистике</h2>

              <div className="space-y-4 text-slate-600 mb-8 leading-relaxed">
                <p className="text-lg font-semibold text-[#0b1a33]">
                  Представляем Вам нашу транспортную компанию ООО "АлМик" и предлагаем сотрудничество в области логистики.
                </p>
                <p>
                  Хотя сама компания работает с 2023 года, наша команда имеет более чем 15-летний опыт в организации грузоперевозок (ранее — как ИП). За это время мы научились решать задачи любой сложности и ценим доверие наших клиентов.
                </p>
                <p>
                  В работе используем как собственный автопарк — новые транспортные средства от 2023 года выпуска, которые находятся на балансе организации, так и привлеченный транспорт. Все грузы, которые мы возим, застрахованы. Сотрудники оформлены официально по трудовым договорам.
                </p>
                <p className="bg-slate-50 p-4 rounded-xl border-l-4 border-[#f05a28]">
                  <strong>Работаем на ОСНО, НДС 20%.</strong> Полный пакет закрывающих документов.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'ИНН', val: '6900000798', icon: 'fingerprint' },
                  { label: 'ОГРН', val: '1236900010380', icon: 'file-contract' },
                  { label: 'Директор', val: 'Михайлов А.А.', icon: 'user-tie' },
                  { label: 'Юр. адрес', val: 'ул. Седова, 55, кв. 80', icon: 'map-marker-alt' }
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 p-6 rounded-2xl flex gap-4 items-center border border-slate-100">
                    <div className="w-12 h-12 bg-[#0b1a33] text-white rounded-xl flex items-center justify-center text-xl shrink-0">
                      <i className={`fas fa-${item.icon}`}></i>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#f05a28] uppercase tracking-wider">{item.label}</div>
                      <div className="font-bold text-[#0b1a33]">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-us" className="py-20 px-4 md:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">Почему выбирают нас</h2>
          <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
            15 лет опыта, современный автопарк и индивидуальный подход к каждому клиенту
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: 'fa-route', 
                title: 'Грузоперевозки «под ключ»', 
                desc: 'Берём на себя всё: от подачи транспорта до оформления документов и страхования. Вы просто получаете результат.'
              },
              { 
                icon: 'fa-map-marked-alt', 
                title: 'Работаем по всей РФ и за её пределами', 
                desc: 'Доставка в любой уголок России, а также в страны ближнего зарубежья: Беларусь, Казахстан и другие дружественные государства.'
              },
              { 
                icon: 'fa-truck', 
                title: 'Новый автопарк', 
                desc: 'Собственные автомобили от 2023 года выпуска на балансе организации. Техника проходит регулярное ТО.'
              },
              { 
                icon: 'fa-shield-alt', 
                title: 'Полная страховка грузов', 
                desc: 'Все перевозки застрахованы. Ваш груз под надежной защитой на всем пути следования.'
              },
              { 
                icon: 'fa-clock', 
                title: 'Опыт команды более 15 лет', 
                desc: 'За плечами наших специалистов тысячи успешных перевозок и решение нестандартных задач.'
              },
              { 
                icon: 'fa-file-invoice', 
                title: 'Работаем с НДС 20%', 
                desc: 'ОСНО, официальное оформление, полный пакет документов для юридических лиц.'
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-glass"
              >
                <div className="text-4xl text-[#f05a28] mb-5">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0b1a33]">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">Наши услуги</h2>
          <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
            Полный комплекс логистических услуг для вашего бизнеса
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: 'Грузоперевозки', p: 'Газель, 5т, 10т, фуры', i: 'truck-moving' },
              { t: 'Квартирные переезды', p: 'Аккуратно и быстро', i: 'home' },
              { t: 'Офисные переезды', p: 'Для бизнеса любого масштаба', i: 'briefcase' },
              { t: 'Негабаритный груз', p: 'Сложные маршруты', i: 'cubes' },
              { t: 'Погрузо-разгрузочные работы', p: 'Спецтехника и такелаж', i: 'arrow-circle-up' },
              { t: 'Аренда спецтехники', p: 'Манипуляторы, погрузчики', i: 'forklift' },
              { t: 'Рефрижераторы', p: 'С температурным режимом', i: 'thermometer-half' },
              { t: 'Доставка стройматериалов', p: 'На любые объекты', i: 'hard-hat' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-[#0b1a33] text-white p-8 rounded-[30px] overflow-hidden transition-all hover:bg-[#f05a28] cursor-pointer"
              >
                <div className="relative z-10">
                  <div className="text-4xl mb-5"><i className={`fas fa-${item.i}`}></i></div>
                  <h3 className="text-xl font-bold mb-3">{item.t}</h3>
                  <p className="opacity-70 text-sm group-hover:opacity-100">{item.p}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS С ЛОГОТИПАМИ */}
      <section id="partners" className="py-20 px-4 md:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">Основные партнеры нашей компании</h2>
          <p className="text-center text-slate-600 mb-16 max-w-3xl mx-auto">
            Мы гордимся сотрудничеством с лидерами рынка и дорожим доверием каждого клиента
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {partners.map((partner, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-100 flex items-center justify-center grayscale hover:grayscale-0"
              >
                <div className="h-24 flex items-center justify-center">
                  <img 
                    src={`/logos/${logos[partner]}`}
                    alt={partner}
                    className="max-h-16 max-w-full object-contain"
                    onError={(e) => {
                      // Если картинка не загрузилась - показываем заглушку
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="text-center">
                            <div class="w-16 h-16 bg-[#f05a28] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                              <i class="fas fa-building text-2xl text-[#f05a28]"></i>
                            </div>
                            <span class="font-semibold text-sm text-[#0b1a33]">${partner}</span>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-12 text-center bg-white p-8 rounded-3xl border border-slate-200 max-w-3xl mx-auto"
          >
            <p className="text-slate-600 text-lg italic">
              "Надеемся стать для Вас в будущем надежным партнером и помощником 
              в решении Ваших транспортных задач."
            </p>
            <p className="font-bold text-[#0b1a33] mt-4">— Алексей Михайлов, директор ООО «АЛМИК»</p>
          </motion.div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 px-4 md:px-8 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">Как мы работаем</h2>
          <p className="text-center opacity-70 mb-16 max-w-2xl mx-auto">Всего 3 простых шага к вашей перевозке</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {[
              { n: '1', t: 'Оставьте заявку', p: 'Звонок или форма на сайте — мы свяжемся с вами в течение 15 минут' },
              { n: '2', t: 'Согласование', p: 'Подберем оптимальный транспорт и рассчитаем точную стоимость' },
              { n: '3', t: 'Перевозка', p: 'Забираем груз и доставляем точно в срок с полной страховкой' }
            ].map((step, idx) => (
              <motion.div 
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-[#f05a28] rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-8 shadow-xl">
                  {step.n}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.t}</h3>
                <p className="opacity-70 max-w-[250px] mx-auto">{step.p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="form" className="py-20 px-4 md:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100">
            <h2 className="text-2xl md:text-3xl font-black text-center mb-4 text-[#0b1a33]">ОФОРМИТЬ ЗАЯВКУ НА ПЕРЕВОЗКУ</h2>
            <p className="text-center text-slate-500 mb-10">Заполните форму, и мы свяжемся с вами для уточнения деталей</p>

            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="form-field">
                <label className="text-sm font-bold">Ваше имя *</label>
                <input type="text" placeholder="Иван Иванов" required className="form-input" />
              </div>
              <div className="form-field">
                <label className="text-sm font-bold">Телефон *</label>
                <input type="tel" placeholder="+7 (___) ___-__-__" required className="form-input" />
              </div>
              <div className="form-field">
                <label className="text-sm font-bold">Email</label>
                <input type="email" placeholder="mail@example.com" className="form-input" />
              </div>

              <div className="form-field">
                <label className="text-sm font-bold">Откуда</label>
                <input type="text" placeholder="Тверь, ул. Примерная, д. 1" className="form-input" />
              </div>
              <div className="form-field">
                <label className="text-sm font-bold">Куда</label>
                <input type="text" placeholder="Москва, ул. Логистическая, д. 10" className="form-input" />
              </div>

              <div className="form-field lg:col-span-3">
                <label className="text-sm font-bold">Габариты груза (Д/Ш/В, в метрах)</label>
                <div className="grid grid-cols-3 gap-3">
                  <input type="text" placeholder="Длина" className="form-input" />
                  <input type="text" placeholder="Ширина" className="form-input" />
                  <input type="text" placeholder="Высота" className="form-input" />
                </div>
              </div>

              <div className="form-field">
                <label className="text-sm font-bold">Тип груза</label>
                <select className="form-input">
                  <option>Оборудование</option>
                  <option>Стройматериалы</option>
                  <option>Мебель</option>
                  <option>Продукты</option>
                </select>
              </div>

              <div className="form-field">
                <label className="text-sm font-bold">Тип кузова</label>
                <select className="form-input">
                  <option>Тент</option>
                  <option>Фургон</option>
                  <option>Рефрижератор</option>
                  <option>Изотерм</option>
                </select>
              </div>

              <div className="form-field">
                <label className="text-sm font-bold">Дата загрузки</label>
                <input type="date" className="form-input" />
              </div>

              <div className="form-field lg:col-span-3">
                <label className="text-sm font-bold">Комментарий</label>
                <textarea rows={3} placeholder="Дополнительная информация, особые пожелания..." className="form-input"></textarea>
              </div>

              <div className="lg:col-span-3 mt-4">
                <button type="submit" className="btn-orange w-full !text-xl !py-6">
                  ОТПРАВИТЬ ЗАЯВКУ
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4 text-[#0b1a33]">Контакты</h2>
          <p className="text-center text-slate-600 mb-16">Всегда на связи и готовы помочь</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex gap-5 items-start">
                  <div className="w-14 h-14 bg-[#f05a28] text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Юридический адрес</h4>
                    <p className="text-slate-600">170012, Тверская обл., г. Тверь, ул. Седова, д. 55, кв. 80</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-14 h-14 bg-[#f05a28] text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg">
                    <i className="fas fa-building"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Фактический и почтовый адрес</h4>
                    <p className="text-slate-600">170036, Тверская обл., г. Тверь, Петербургское шоссе 93к1, офис 516</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-14 h-14 bg-[#f05a28] text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Телефоны</h4>
                    <a href="tel:+79011172371" className="text-xl font-bold text-[#f05a28] block">+7 (901) 117-23-71</a>
                    <a href="tel:+79301796020" className="text-lg text-slate-600 hover:text-[#f05a28]">+7 (930) 179-60-20</a>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-14 h-14 bg-[#f05a28] text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Email</h4>
                    <a href="mailto:info@almik-tver.ru" className="text-slate-600 hover:text-[#f05a28]">info@almik-tver.ru</a>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-14 h-14 bg-[#f05a28] text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Режим работы</h4>
                    <p className="text-slate-600">Круглосуточно, без выходных</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[500px] bg-slate-100 rounded-[30px] overflow-hidden relative shadow-inner">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                <i className="fas fa-map-marked-alt text-6xl mb-4 text-[#f05a28]"></i>
                <p className="text-xl font-bold text-[#0b1a33]">г. Тверь, Петербургское шоссе 93к1</p>
                <p className="text-sm text-slate-500">офис 516 (фактический адрес)</p>
                <p className="text-xs mt-4">Здесь будет интерактивная карта</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0b1a33] text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <div className="text-2xl font-black mb-2"><span className="text-[#f05a28]">А</span>ЛМИК</div>
            <p className="opacity-60 text-sm">ИНН 6900000798 | ОГРН 1236900010380</p>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f05a28] transition-colors">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f05a28] transition-colors">
              <i className="fab fa-telegram"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f05a28] transition-colors">
              <i className="fab fa-vk"></i>
            </a>
          </div>

          <div className="text-sm opacity-60">
            © {new Date().getFullYear()} ООО «АЛМИК». Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}