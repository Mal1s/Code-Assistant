import React from 'react';

export default function Home() {
  return (
    <div className="font-sans text-[#333] leading-relaxed overflow-x-hidden">
      <header className="header">
          <div className="header-container">
              <div className="logo">Trans<span>Logist</span></div>
              <div className="header-contacts">
                  <a href="tel:+79991234567" className="phone-number">+7 (999) 123-45-67</a>
                  <button className="callback-btn">Заказать звонок</button>
              </div>
          </div>
      </header>

      <section className="hero">
          <div className="hero-container">
              <h1>Быстрые и надежные<br/>грузоперевозки</h1>
              <p className="hero-subtitle">Перевезем любой груз по городу и России. Собственный автопарк. Страховка. Опытные водители.</p>
              <div className="hero-buttons">
                  <button className="btn-primary">Рассчитать стоимость</button>
                  <button className="btn-secondary">Узнать подробнее</button>
              </div>
          </div>
      </section>

      <section className="benefits">
          <div className="benefits-container">
              <h2 className="section-title">Почему выбирают нас</h2>
              <p className="section-subtitle">Работаем для вас с 2010 года</p>
              
              <div className="benefits-grid">
                  <div className="benefit-card">
                      <div className="benefit-icon">🚚</div>
                      <h3>Свой автопарк</h3>
                      <p>Новые машины, разная грузоподъемность от 1 до 20 тонн</p>
                  </div>
                  <div className="benefit-card">
                      <div className="benefit-icon">⏱️</div>
                      <h3>Точно в срок</h3>
                      <p>Соблюдаем временные интервалы, минимальные задержки</p>
                  </div>
                  <div className="benefit-card">
                      <div className="benefit-icon">💰</div>
                      <h3>Прозрачные цены</h3>
                      <p>Фиксированная стоимость без скрытых платежей</p>
                  </div>
                  <div className="benefit-card">
                      <div className="benefit-icon">📦</div>
                      <h3>Аккуратно</h3>
                      <p>Опытные грузчики и водители, страховка груза</p>
                  </div>
              </div>
          </div>
      </section>

      <section className="services">
          <div className="services-container">
              <h2 className="section-title">Наши услуги</h2>
              <p className="section-subtitle">Полный спектр транспортных услуг</p>
              
              <div className="services-grid">
                  <div className="service-item">
                      <span className="service-check">✓</span>
                      <div className="service-content">
                          <h3>Грузоперевозки</h3>
                          <p>Газель, 5 тонн, 10 тонн, фуры с гидробортом</p>
                      </div>
                  </div>
                  <div className="service-item">
                      <span className="service-check">✓</span>
                      <div className="service-content">
                          <h3>Квартирные переезды</h3>
                          <p>Аккуратно упакуем и перевезем ваши вещи</p>
                      </div>
                  </div>
                  <div className="service-item">
                      <span className="service-check">✓</span>
                      <div className="service-content">
                          <h3>Офисные переезды</h3>
                          <p>Перевозка оргтехники, мебели, документов</p>
                      </div>
                  </div>
                  <div className="service-item">
                      <span className="service-check">✓</span>
                      <div className="service-content">
                          <h3>Негабаритный груз</h3>
                          <p>Спецтехника и оборудование любой сложности</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section className="steps">
          <div className="steps-container">
              <h2 className="section-title">Как мы работаем</h2>
              <p className="section-subtitle">Всего 3 простых шага</p>
              
              <div className="steps-grid">
                  <div className="step-card">
                      <div className="step-number">1</div>
                      <h3>Оставьте заявку</h3>
                      <p>Звонок или форма на сайте. Мы перезвоним за 5 минут</p>
                  </div>
                  <div className="step-card">
                      <div className="step-number">2</div>
                      <h3>Согласование</h3>
                      <p>Подберем машину, рассчитаем точную стоимость</p>
                  </div>
                  <div className="step-card">
                      <div className="step-number">3</div>
                      <h3>Едем!</h3>
                      <p>Забираем груз, доставляем вовремя, вы принимаете работу</p>
                  </div>
              </div>
          </div>
      </section>

      <section className="contact-form-section">
          <div className="form-container">
              <h2 className="form-title">Остались вопросы?</h2>
              <p className="form-subtitle">Свяжитесь с нами прямо сейчас</p>
              
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                      <label htmlFor="name">Ваше имя</label>
                      <input type="text" id="name" name="name" placeholder="Иван Иванов" required />
                  </div>
                  
                  <div className="form-group">
                      <label htmlFor="phone">Ваш телефон</label>
                      <input type="tel" id="phone" name="phone" placeholder="+7 (999) 123-45-67" required />
                  </div>
                  
                  <div className="form-group">
                      <label htmlFor="message">Сообщение</label>
                      <textarea id="message" name="message" placeholder="Опишите вашу задачу..." rows={4}></textarea>
                  </div>
                  
                  <button type="submit" className="submit-btn">Отправить заявку</button>
              </form>
          </div>
      </section>

      <footer className="footer">
          <div className="footer-container">
              <div className="footer-main">
                  <div className="footer-info">
                      <h3>Контакты</h3>
                      <ul className="contact-details">
                          <li><strong>Адрес:</strong> г. Москва, ул. Логистов, д. 10</li>
                          <li><strong>Телефон:</strong> +7 (999) 123-45-67</li>
                          <li><strong>Email:</strong> info@translogist.ru</li>
                          <li><strong>Режим:</strong> Круглосуточно, без выходных</li>
                      </ul>
                  </div>
                  
                  <div className="footer-map">
                      <h3>Схема проезда</h3>
                      <div className="map-container">
                          <div className="map-placeholder">
                              Москва, ул. Логистов, д. 10
                          </div>
                      </div>
                  </div>
              </div>
              
              <div className="footer-bottom">
                  © 2026 Транспортная компания "TransLogist". Все права защищены.
              </div>
          </div>
      </footer>
    </div>
  );
}