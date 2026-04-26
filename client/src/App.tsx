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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "АЛМИК",
    "alternateName": ["ALMIK", "ООО АЛМИК"],
    "url": "https://almik.onrender.com",
    "logo": "https://almik.onrender.com/favicon.ico",
    "description": "Прямые грузоперевозки от 1.5 до 20 тонн на собственных машинах 2023 года. Фуры, тралы, манипуляторы, Газели.",
    "foundingDate": "2023-01-15",
    "vatID": "6900000798",
    "taxID": "6900000798",
    "legalName": "ООО «АЛМИК»",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7-901-117-23-71",
      "contactType": "customer service",
      "areaServed": ["RU", "BY", "KZ", "AM", "KG"],
      "availableLanguage": ["Russian"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "22:00"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Тверь",
      "streetAddress": "Петербургское шоссе 93к1, офис 516",
      "postalCode": "170036",
      "addressCountry": "RU"
    },
    "sameAs": ["https://t.me/Obormotka_byaka"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "127"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "АЛМИК - Грузоперевозки Тверь",
    "image": "https://almik.onrender.com/favicon.ico",
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
    "telephone": "+7-901-117-23-71",
    "priceRange": "от 2500 ₽",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "22:00"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Сколько стоит доставка груза?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Газель по городу от 2500₽. Фура 20т на дальние расстояния от 35000₽. Звоните +7 (901) 117-23-71 — рассчитаем за 15 минут!"
        }
      },
      {
        "@type": "Question",
        "name": "Какие машины есть в автопарке?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Собственный автопарк 2023 года: Газели (1.5-2т), фуры 20т, тралы для негабарита, манипуляторы с краном."
        }
      },
      {
        "@type": "Question",
        "name": "Работаете ли вы с НДС?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, работаем с НДС 22% (ОСНО). Предоставляем счета-фактуры, акты, УПД. Можно без НДС."
        }
      },
      {
        "@type": "Question",
        "name": "Как быстро подадите машину?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Обычно в течение 2-4 часов. Если срочно — звоните, постараемся найти машину быстрее."
        }
      },
      {
        "@type": "Question",
        "name": "Как с вами связаться?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Звоните +7 (901) 117-23-71 или пишите в Telegram @Obormotka_byaka. На связи с 8:00 до 22:00."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://almik.onrender.com" },
      { "@type": "ListItem", "position": 2, "name": "Грузоперевозки", "item": "https://almik.onrender.com/#services" }
    ]
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={faqSchema} />
        <JsonLd data={breadcrumbSchema} />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;