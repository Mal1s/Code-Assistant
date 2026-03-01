import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [showNotification, setShowNotification] = useState(false);

  const openForm = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNotification(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* УВЕДОМЛЕНИЕ */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            className="fixed top-5 right-5 z-[9999] bg-[#27ae60] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <i className="fas fa-check-circle"></i>
            Спасибо! Мы свяжемся с вами в ближайшее время.
          </motion.div>
        )}
      </AnimatePresence>

      {/* ШАПКА */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <h1>ООО <span>«АЛМИК»</span></h1>
            <div className="slogan">ГРУЗОПЕРЕВОЗКИ ПО ТВЕРИ И ОБЛАСТИ</div>
          </div>
          <div className="header-contacts">
            <div className="flex flex-col items-end">
              <a href="tel:+79991234567" className="phone-number">
                <i className="fas fa-phone-alt"></i> +7 (999) 123-45-67
              </a>
              <span className="text-[13px] text-white/60">Круглосуточно, без выходных</span>
            </div>
            <button className="callback-btn" onClick={openForm}>
              <i className="fas fa-headset mr-2"></i> Заказать звонок
            </button>
          </div>
        </div>
      </header>

      {/* ГЕРОЙ */}
      <section className="hero">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hero-content"
          >
            <h1 className="font-montserrat font-extrabold leading-tight">
              Быстрые и надежные<br />
              <span className="highlight">грузоперевозки в Твери</span>
            </h1>
            <p className="hero-subtitle">Собственный автопарк. Страховка груза. Опытные водители. Работаем круглосуточно.</p>
            
            <div className="hero-features">
              {['От 1 до 20 тонн', 'Страховка', 'Без выходных'].map((f) => (
                <div key={f} className="hero-feature">
                  <i className="fas fa-check-circle text-[#e67e22]"></i>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <button className="btn-primary" onClick={openForm}>
                <i className="fas fa-calculator mr-2"></i> Рассчитать стоимость
              </button>
              <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-[#0b3b5c] transition-all" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                Подробнее
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hero-stats"
          >
            {[
              { n: '5+', l: 'Лет на рынке' },
              { n: '500+', l: 'Перевозок' },
              { n: '50+', l: 'Постоянных клиентов' }
            ].map((s) => (
              <div key={s.l} className="stat-item">
                <div className="stat-number">{s.n}</div>
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* О КОМПАНИИ */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-grid">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-montserrat font-bold text-[#0b3b5c] mb-6">О компании ООО «АЛМИК»</h2>
              <p className="text-lg text-slate-600 mb-8">Мы — молодая и динамично развивающаяся транспортная компания в Твери. Несмотря на небольшой срок работы, мы уже зарекомендовали себя как надежный партнер для перевозки грузов любой сложности.</p>
              
              <div className="space-y-6">
                {[
                  { i: 'building', h: 'Реквизиты компании', p: 'ООО «АЛМИК»\nИНН 6900000798 | ОГРН 1236900010380' },
                  { i: 'user-tie', h: 'Генеральный директор', p: 'Михайлов Алексей Анатольевич' },
                  { i: 'map-marker-alt', h: 'Юридический адрес', p: 'г. Тверь, ул. Седова, д. 55, кв. 80' }
                ].map((d) => (
                  <div key={d.h} className="detail-item">
                    <div className="detail-icon"><i className={`fas fa-${d.i}`}></i></div>
                    <div>
                      <h4 className="font-bold text-[#0b3b5c]">{d.h}</h4>
                      <p className="text-slate-500 whitespace-pre-line">{d.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="about-image"
            >
              <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Грузовик" />
              <div className="experience-badge">
                <div className="text-3xl font-bold">5+</div>
                <div className="text-sm">лет опыта</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="benefits">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0b3b5c]">Почему выбирают нас</h2>
            <p className="text-slate-500 mt-4">Работаем для вас с 2023 года</p>
          </div>
          
          <div className="benefits-grid">
            {[
              { i: 'truck', t: 'Свой автопарк', p: 'Новые машины от 1 до 20 тонн' },
              { i: 'clock', t: 'Точно в срок', p: 'GPS-мониторинг и пунктуальность' },
              { i: 'shield-alt', t: 'Страховка груза', p: 'Все перевозки застрахованы' },
              { i: 'hand-holding-usd', t: 'Прозрачные цены', p: 'Фиксированная цена по договору' }
            ].map((b, idx) => (
              <motion.div 
                key={b.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="benefit-card"
              >
                <div className="benefit-icon"><i className={`fas fa-${b.i}`}></i></div>
                <h3 className="text-xl font-bold text-[#0b3b5c] mb-4">{b.t}</h3>
                <p className="text-slate-500">{b.p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <h3 className="text-3xl font-bold text-[#0b3b5c] mb-6">Остались вопросы?</h3>
              <p className="text-slate-600 mb-10">Свяжитесь с нами для бесплатного расчета стоимости.</p>
              
              <div className="space-y-8">
                {[
                  { i: 'phone-alt', h: 'Телефон', v: '+7 (999) 123-45-67', href: 'tel:+79991234567' },
                  { i: 'envelope', h: 'Email', v: 'info@almik-tver.ru', href: 'mailto:info@almik-tver.ru' },
                  { i: 'map-marker-alt', h: 'Адрес', v: 'г. Тверь, ул. Седова, д. 55, кв. 80' }
                ].map((item) => (
                  <div key={item.h} className="flex gap-5">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-[#e67e22]">
                      <i className={`fas fa-${item.i}`}></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0b3b5c]">{item.h}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-[#e67e22] font-semibold">{item.v}</a>
                      ) : (
                        <p className="text-slate-500">{item.v}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="form-group">
                  <label>Ваше имя *</label>
                  <input type="text" placeholder="Иван Иванов" required />
                </div>
                <div className="form-group">
                  <label>Ваш телефон *</label>
                  <input type="tel" placeholder="+7 (999) 123-45-67" required />
                </div>
                <div className="form-group">
                  <label>Сообщение</label>
                  <textarea placeholder="Опишите вашу задачу..." rows={4}></textarea>
                </div>
                <button type="submit" className="submit-btn hover:scale-[1.02] active:scale-[0.98]">
                  <i className="fas fa-paper-plane mr-2"></i> Отправить заявку
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ФУТЕР */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">ООО <span>«АЛМИК»</span></div>
              <p className="opacity-70 mb-6">Надежная транспортная компания в Твери. Работаем с 2023 года.</p>
              <div className="social-links">
                <a href="#"><i className="fab fa-whatsapp"></i></a>
                <a href="#"><i className="fab fa-telegram"></i></a>
                <a href="#"><i className="fab fa-vk"></i></a>
              </div>
            </div>
            <div className="footer-col">
              <h4 className="text-lg font-bold mb-6">Навигация</h4>
              <ul className="footer-links">
                <li><a href="#" className="hover:text-[#e67e22]">Главная</a></li>
                <li><a href="#about" className="hover:text-[#e67e22]">О компании</a></li>
                <li><a href="#contact" className="hover:text-[#e67e22]">Контакты</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="text-lg font-bold mb-6">Услуги</h4>
              <ul className="footer-links">
                <li>Грузоперевозки</li>
                <li>Переезды</li>
                <li>Негабарит</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="text-lg font-bold mb-6">Контакты</h4>
              <p className="opacity-80 mb-2">+7 (999) 123-45-67</p>
              <p className="opacity-80 mb-2">info@almik-tver.ru</p>
              <p className="opacity-80">г. Тверь, ул. Седова, д. 55</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 ООО «АЛМИК». Все права защищены.</p>
            <div className="requisites">
              ИНН 6900000798 | ОГРН 1236900010380 | г. Тверь, ул. Седова, д. 55, кв. 80
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
