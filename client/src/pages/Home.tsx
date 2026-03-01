import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
            <button onClick={() => scrollTo('services')} className="text-2xl font-bold">Услуги</button>
            <button onClick={() => scrollTo('form')} className="text-2xl font-bold">Заявка</button>
            <button onClick={() => scrollTo('contacts')} className="text-2xl font-bold">Контакты</button>
            <a href="tel:+79301796020" className="text-3xl font-extrabold text-[#f05a28]">+7 (930) 179-60-20</a>
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
            <button onClick={() => scrollTo('services')} className="hover:text-[#f05a28]">Услуги</button>
            <button onClick={() => scrollTo('contacts')} className="hover:text-[#f05a28]">Контакты</button>
          </nav>

          <div className="flex items-center gap-4">
            <a href="tel:+79301796020" className="hidden sm:block text-lg md:text-xl font-bold hover:text-[#f05a28] transition-colors">
              +7 (930) 179-60-20
            </a>
            <button onClick={() => scrollTo('form')} className="hidden md:block btn-orange !py-2 !px-6 text-sm">
              Заказать звонок
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-3xl p-2">☰</button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="hero-section">
        <div className="max-w-5xl text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1]"
          >
            ГРУЗОПЕРЕВОЗКИ ПО ТВЕРИ И ОБЛАСТИ
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto font-medium"
          >
            Собственный автопарк. Страховка груза. Работаем с 2023 года.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <button onClick={() => scrollTo('form')} className="btn-orange">Рассчитать стоимость</button>
            <button onClick={() => scrollTo('about')} className="btn-outline">Подробнее</button>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-[30px] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1624365169361-5ced8dd8e3e0?w=800" alt="Truck" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#0b1a33] mb-6">ООО «АЛМИК» — ваш надежный партнер</h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Мы молодая, но уже зарекомендовавшая себя транспортная компания в Твери. Работаем с 2023 года. Перевезли более 500 тонн грузов без повреждений.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'ИНН', val: '6900000798', icon: 'fingerprint' },
                  { label: 'ОГРН', val: '1236900010380', icon: 'file-contract' },
                  { label: 'Директор', val: 'Михайлов А.А.', icon: 'user-tie' },
                  { label: 'Юр. адрес', val: 'г. Тверь, ул. Седова, 55', icon: 'map-marker-alt' }
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

      {/* BENEFITS */}
      <section className="py-20 px-4 md:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16">Наши преимущества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: 'Свой автопарк', p: 'Новые машины, ТО по регламенту', i: 'truck' },
              { t: 'Страховка груза', p: 'Полная защита вашего товара', i: 'shield-alt' },
              { t: 'Работаем по договору', p: 'Юридическая чистота сделки', i: 'file-signature' },
              { t: 'Круглосуточно', p: 'Всегда на связи и в пути', i: 'clock' }
            ].map((item) => (
              <div key={item.t} className="card-glass text-center">
                <div className="text-5xl text-[#f05a28] mb-6">
                  <i className={`fas fa-${item.i}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.t}</h3>
                <p className="text-slate-500">{item.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: 'Грузоперевозки', p: 'Газель, 5т, 10т, фуры', i: 'truck-moving' },
              { t: 'Квартирные переезды', p: 'Аккуратно и быстро', i: 'home' },
              { t: 'Офисные переезды', p: 'Для малого и крупного бизнеса', i: 'briefcase' },
              { t: 'Доставка стройматериалов', p: 'На любые объекты города', i: 'cubes' },
              { t: 'Негабаритный груз', p: 'Спецтехника любой сложности', i: 'boxes' },
              { t: 'Рефрижераторы', p: 'С температурным режимом', i: 'thermometer-half' }
            ].map((item) => (
              <div key={item.t} className="group relative bg-[#0b1a33] text-white p-10 rounded-[30px] overflow-hidden transition-all hover:bg-[#f05a28]">
                <div className="relative z-10">
                  <div className="text-4xl mb-6"><i className={`fas fa-${item.i}`}></i></div>
                  <h3 className="text-2xl font-bold mb-4">{item.t}</h3>
                  <p className="opacity-70 group-hover:opacity-100">{item.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 px-4 md:px-8 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16">Всего 3 шага</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {[
              { n: '1', t: 'Оставьте заявку', p: 'Звонок или форма на сайте' },
              { n: '2', t: 'Согласование', p: 'Подберем машину и рассчитаем цену' },
              { n: '3', t: 'Перевозка', p: 'Забираем груз и доставляем вовремя' }
            ].map((step, idx) => (
              <div key={step.n} className="text-center">
                <div className="w-20 h-20 bg-[#f05a28] rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-8 shadow-xl">
                  {step.n}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.t}</h3>
                <p className="opacity-70">{step.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="form" className="py-20 px-4 md:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100">
            <h2 className="text-2xl md:text-3xl font-black text-center mb-10 text-[#0b1a33]">ОФОРМИТЬ ЗАЯВКУ НА ПЕРЕВОЗКУ</h2>
            <form onSubmit={handleFormSubmit} className="ati-form-grid">
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
                <label className="text-sm font-bold">Вес (тонн)</label>
                <input type="number" placeholder="1.5" className="form-input" />
              </div>
              <div className="form-field">
                <label className="text-sm font-bold">Объем (м³)</label>
                <input type="number" placeholder="12" className="form-input" />
              </div>
              <div className="form-field">
                <label className="text-sm font-bold">Упаковка</label>
                <select className="form-input">
                  <option>Паллеты</option>
                  <option>Коробки</option>
                  <option>Без упаковки</option>
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
              <div className="form-field col-span-1 md:col-span-2 lg:col-span-1">
                <label className="text-sm font-bold">Откуда</label>
                <input type="text" placeholder="Тверь" className="form-input" />
              </div>
              <div className="form-field col-span-1 md:col-span-2 lg:col-span-1">
                <label className="text-sm font-bold">Куда</label>
                <input type="text" placeholder="Москва" className="form-input" />
              </div>
              <div className="form-field">
                <label className="text-sm font-bold">Ставка (руб)</label>
                <input type="number" placeholder="15000" className="form-input" />
              </div>
              <div className="form-field col-span-1 md:col-span-2 lg:col-span-1">
                <label className="text-sm font-bold">Ваше имя *</label>
                <input type="text" placeholder="Иван" required className="form-input" />
              </div>
              <div className="form-field col-span-1 md:col-span-2 lg:col-span-1">
                <label className="text-sm font-bold">Телефон *</label>
                <input type="tel" placeholder="+7 (___) ___-__-__" required className="form-input" />
              </div>
              <div className="form-field col-span-1 md:col-span-2 lg:col-span-1">
                <label className="text-sm font-bold">Email</label>
                <input type="email" placeholder="mail@example.com" className="form-input" />
              </div>
              <div className="form-field col-span-1 md:col-span-2 lg:col-span-3">
                <label className="text-sm font-bold">Комментарий</label>
                <textarea rows={3} placeholder="Дополнительная информация..." className="form-input"></textarea>
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-4">
                <button type="submit" className="btn-orange w-full !text-xl !py-6">
                  ОТПРАВИТЬ ЗАЯВКУ
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CONTACTS & MAP */}
      <section id="contacts" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-[#0b1a33]">Контакты</h2>
              <div className="space-y-6">
                <div className="flex gap-5 items-start">
                  <div className="w-14 h-14 bg-[#f05a28] text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Адрес</h4>
                    <p className="text-slate-600">г. Тверь, ул. Седова, д. 55, кв. 80</p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-14 h-14 bg-[#f05a28] text-white rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Телефон</h4>
                    <a href="tel:+79301796020" className="text-xl font-bold text-[#f05a28]">+7 (930) 179-60-20</a>
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
              </div>
            </div>
            <div className="h-[400px] bg-slate-100 rounded-[30px] overflow-hidden relative shadow-inner">
               <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                  <i className="fas fa-map-marked-alt text-6xl mb-4"></i>
                  <p className="text-xl font-bold">г. Тверь, ул. Седова, д. 55</p>
                  <p className="text-sm">Здесь будет карта Яндекса</p>
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
            © 2026 ООО «АЛМИК». Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
