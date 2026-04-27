import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import JsonLd from "@/components/JsonLd";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const SITE = "https://almik.onrender.com";
  const LOGO = `${SITE}/favicon-512.png`;
  const OG = `${SITE}/opengraph.jpg`;

  // 2.1 Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    "name": "АЛМИК",
    "alternateName": ["АЛМИК", "ALMIK", "ООО АЛМИК", "ТК АЛМИК"],
    "url": SITE,
    "logo": LOGO,
    "image": OG,
    "description": "Прямые грузоперевозки от 1.5 до 20 тонн на собственных машинах 2023 года. Фуры 20т, тралы, манипуляторы, Газели. Работаем по России и СНГ.",
    "foundingDate": "2023-01-15",
    "foundingLocation": "Тверь, Россия",
    "numberOfEmployees": "15",
    "vatID": "6900000798",
    "taxID": "6900000798",
    "legalName": "ООО «АЛМИК»",
    "slogan": "Доставим ваш груз в любую точку России и СНГ",
    "email": "almik.ks@yandex.ru",
    "telephone": "+7-901-117-23-71",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+7-901-117-23-71",
        "contactType": "customer service",
        "areaServed": ["RU", "BY", "KZ", "AM", "KG", "UZ", "TJ", "MN", "GE", "AZ"],
        "availableLanguage": ["Russian"],
        "email": "almik.ks@yandex.ru",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "08:00",
          "closes": "22:00"
        }
      },
      {
        "@type": "ContactPoint",
        "telephone": "+7-901-117-23-71",
        "contactType": "customer support",
        "contactOption": "TollFree",
        "availableLanguage": ["Russian"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+7-901-117-23-71",
        "contactType": "sales",
        "availableLanguage": ["Russian"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Тверь",
      "addressRegion": "Тверская область",
      "streetAddress": "Петербургское шоссе 93к1, офис 516",
      "postalCode": "170036",
      "addressCountry": "RU"
    },
    "areaServed": [
      { "@type": "Country", "name": "Россия" },
      { "@type": "Country", "name": "Беларусь" },
      { "@type": "Country", "name": "Казахстан" },
      { "@type": "Country", "name": "Армения" },
      { "@type": "Country", "name": "Киргизия" },
      { "@type": "Country", "name": "Узбекистан" },
      { "@type": "Country", "name": "Таджикистан" },
      { "@type": "Country", "name": "Монголия" },
      { "@type": "Country", "name": "Грузия" },
      { "@type": "Country", "name": "Азербайджан" }
    ],
    "sameAs": [
      "https://t.me/Obormotka_byaka",
      "https://wa.me/79011172371"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "127",
      "reviewCount": "127"
    }
  };

  // 2.2 LocalBusiness с potentialAction
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE}/#localbusiness`,
    "name": "АЛМИК — Грузоперевозки Тверь",
    "image": OG,
    "logo": LOGO,
    "url": SITE,
    "telephone": "+7-901-117-23-71",
    "email": "almik.ks@yandex.ru",
    "priceRange": "от 2500 ₽",
    "currenciesAccepted": "RUB",
    "paymentAccepted": "Наличные, Безналичный расчет, Перевод на карту",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Петербургское шоссе, 93к1, офис 516",
      "addressLocality": "Тверь",
      "addressRegion": "Тверская область",
      "postalCode": "170036",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 56.8587,
      "longitude": 35.9176
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "22:00"
    },
    "hasMap": "https://yandex.ru/maps/14/tver/",
    "sameAs": [
      "https://t.me/Obormotka_byaka",
      "https://wa.me/79011172371"
    ],
    "potentialAction": [
      {
        "@type": "ContactAction",
        "name": "Позвонить сейчас",
        "target": { "@type": "EntryPoint", "urlTemplate": "tel:+79011172371" }
      },
      {
        "@type": "ViewAction",
        "name": "Рассчитать стоимость",
        "target": { "@type": "EntryPoint", "urlTemplate": `${SITE}/#form` }
      },
      {
        "@type": "SendAction",
        "name": "Написать в Telegram",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://t.me/Obormotka_byaka" }
      },
      {
        "@type": "SendAction",
        "name": "Написать в WhatsApp",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://wa.me/79011172371" }
      },
      {
        "@type": "ViewAction",
        "name": "Посмотреть автопарк",
        "target": { "@type": "EntryPoint", "urlTemplate": `${SITE}/#services` }
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "127",
      "reviewCount": "127"
    }
  };

  // 2.3 FAQPage — 10 вопросов
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Сколько стоит доставка груза?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Стоимость зависит от типа груза, расстояния и машины. Газель по городу — от 2500₽. Фура 20т на дальние расстояния — от 35000₽. Манипулятор — от 3000₽/час. Трал для негабарита — от 40000₽. Звоните +7 (901) 117-23-71 — рассчитаем точно за 15 минут!"
        }
      },
      {
        "@type": "Question",
        "name": "Какие машины есть в автопарке?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Собственный автопарк машин 2023 года выпуска: Газели от 1.5 до 5 тонн (тент, борт, фургон), фуры 20 тонн (90м³), тралы для негабаритных грузов до 60 тонн, манипуляторы с краном от 3 до 15 тонн. Все машины с GPS-мониторингом."
        }
      },
      {
        "@type": "Question",
        "name": "Работаете ли вы с НДС?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, работаем с НДС 22% (ОСНО). Предоставляем полный пакет документов: счёт-фактуру, акт выполненных работ, УПД, ТТН, договор. Также возможна работа без НДС для ИП и физлиц."
        }
      },
      {
        "@type": "Question",
        "name": "Как быстро подадите машину?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "По Твери и области — обычно в течение 2-4 часов. По Москве и Санкт-Петербургу — в день обращения. По России — от 12 до 48 часов в зависимости от направления. Срочная подача за 1 час — звоните +7 (901) 117-23-71."
        }
      },
      {
        "@type": "Question",
        "name": "Какие документы нужны для перевозки груза?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Для юрлиц: договор, заявка, ТТН, доверенность на получателя. Для физлиц: паспорт отправителя и получателя. Документы на сам груз (если есть): счёт-фактура, накладные. Все документы оформляем сами — вам нужно только предоставить данные."
        }
      },
      {
        "@type": "Question",
        "name": "Работаете ли вы с физическими лицами?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, активно работаем с физлицами: переезды (квартирные, офисные, дачные), доставка мебели и техники, перевозка стройматериалов. Оплата наличными, переводом на карту или через банк. Договор оформляется обязательно."
        }
      },
      {
        "@type": "Question",
        "name": "Есть ли страховка груза?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, страхуем груз на полную стоимость в страховых компаниях АльфаСтрахование, Ингосстрах, СОГАЗ. Базовая ответственность по договору включена бесплатно. Дополнительная страховка от 0.1% стоимости груза."
        }
      },
      {
        "@type": "Question",
        "name": "Как с вами связаться?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Телефон: +7 (901) 117-23-71. Telegram: @Obormotka_byaka (https://t.me/Obormotka_byaka). WhatsApp: +7 (901) 117-23-71 (https://wa.me/79011172371). Email: almik.ks@yandex.ru. Принимаем заявки 7 дней в неделю с 08:00 до 22:00."
        }
      },
      {
        "@type": "Question",
        "name": "Какие регионы и страны обслуживаете?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Все регионы России: от Калининграда до Владивостока, включая Крым, Кавказ, Сибирь, Дальний Восток, Якутию. Страны СНГ: Беларусь, Казахстан, Армения, Киргизия, Узбекистан, Таджикистан, Монголия, Грузия, Азербайджан. Международные перевозки оформляем со всеми таможенными документами."
        }
      },
      {
        "@type": "Question",
        "name": "Как происходит оплата?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Принимаем: наличные водителю при погрузке/разгрузке, безналичный перевод на расчётный счёт (для юрлиц с НДС или без), перевод на карту Сбербанка/Тинькофф. Возможна предоплата 30-50% или оплата по факту доставки. Цена в договоре фиксированная — без доплат."
        }
      }
    ]
  };

  // 2.4 Service с ценами
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}/#service`,
    "serviceType": "Грузоперевозки",
    "provider": { "@id": `${SITE}/#organization` },
    "areaServed": [
      { "@type": "Country", "name": "Россия" },
      { "@type": "Country", "name": "Беларусь" },
      { "@type": "Country", "name": "Казахстан" },
      { "@type": "Country", "name": "Армения" },
      { "@type": "Country", "name": "Киргизия" },
      { "@type": "Country", "name": "Узбекистан" }
    ],
    "name": "Грузоперевозки по России и СНГ",
    "description": "Прямые грузоперевозки от 1.5 до 20 тонн. Газели, фуры 20т, тралы, манипуляторы. Цены от 2500₽.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Услуги грузоперевозок АЛМИК",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Газель 1.5-2 тонны (тент/борт/фургон)" },
          "price": "2500",
          "priceCurrency": "RUB",
          "priceSpecification": { "@type": "PriceSpecification", "minPrice": "2500", "maxPrice": "15000", "priceCurrency": "RUB" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Фура 20 тонн (90м³, тент)" },
          "price": "35000",
          "priceCurrency": "RUB",
          "priceSpecification": { "@type": "PriceSpecification", "minPrice": "35000", "maxPrice": "150000", "priceCurrency": "RUB" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Манипулятор с краном 3-15 тонн" },
          "price": "3000",
          "priceCurrency": "RUB",
          "priceSpecification": { "@type": "PriceSpecification", "minPrice": "3000", "maxPrice": "25000", "priceCurrency": "RUB" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Трал для негабаритных грузов до 60 тонн" },
          "price": "40000",
          "priceCurrency": "RUB",
          "priceSpecification": { "@type": "PriceSpecification", "minPrice": "40000", "maxPrice": "300000", "priceCurrency": "RUB" }
        }
      ]
    }
  };

  // 2.5 Product "Грузоперевозки фурой 20 тонн"
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Грузоперевозки фурой 20 тонн по России и СНГ",
    "image": OG,
    "description": "Перевозка грузов до 20 тонн фурами с тентом 90м³. Собственный автопарк 2023 года. Прямые рейсы по России и СНГ. Фиксированная цена в договоре, страховка груза.",
    "brand": { "@type": "Brand", "name": "АЛМИК" },
    "sku": "ALMIK-FURA-20T",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "RUB",
      "lowPrice": "35000",
      "highPrice": "150000",
      "offerCount": "20",
      "availability": "https://schema.org/InStock",
      "seller": { "@id": `${SITE}/#organization` }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "127",
      "reviewCount": "127"
    }
  };

  // 2.6 BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": SITE },
      { "@type": "ListItem", "position": 2, "name": "Услуги", "item": `${SITE}/#services` },
      { "@type": "ListItem", "position": 3, "name": "Грузоперевозки по России и СНГ", "item": `${SITE}/#services` }
    ]
  };

  // 2.7 WebSite + SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    "url": SITE,
    "name": "АЛМИК — Грузоперевозки по России и СНГ",
    "description": "Прямые грузоперевозки от 1.5 до 20 тонн. Фуры 20т, тралы, манипуляторы, Газели. Работаем по всей России и СНГ.",
    "inLanguage": "ru-RU",
    "publisher": { "@id": `${SITE}/#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE}/?s={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // 2.8 HowTo "Как заказать грузоперевозку"
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Как заказать грузоперевозку в АЛМИК",
    "description": "Заказать грузоперевозку по России и СНГ за 3 простых шага.",
    "image": OG,
    "totalTime": "PT15M",
    "estimatedCost": { "@type": "MonetaryAmount", "currency": "RUB", "value": "2500" },
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Оставьте заявку",
        "text": "Заполните форму на сайте, позвоните +7 (901) 117-23-71 или напишите в Telegram @Obormotka_byaka / WhatsApp. Укажите тип груза, маршрут и дату.",
        "url": `${SITE}/#form`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Получите расчёт за 15 минут",
        "text": "Менеджер рассчитает точную стоимость по вашему маршрузу и подберёт подходящую машину из автопарка. Цена фиксируется в договоре.",
        "url": `${SITE}/#services`
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Подпишите договор и получите груз",
        "text": "Заключаем договор, подаём машину в назначенное время, доставляем груз с полным пакетом документов. Оплата наличными, переводом или по безналу с НДС.",
        "url": `${SITE}/#contacts`
      }
    ]
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={faqSchema} />
        <JsonLd data={serviceSchema} />
        <JsonLd data={productSchema} />
        <JsonLd data={breadcrumbSchema} />
        <JsonLd data={howToSchema} />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
