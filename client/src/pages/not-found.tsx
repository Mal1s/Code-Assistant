import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [, navigate] = useLocation();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1a33]">
      <div className="text-center px-4">
        {/* Грузовик */}
        <div className="text-7xl mb-6 animate-bounce">🚛</div>

        {/* Код ошибки */}
        <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#f05a28] to-[#ff8c42] mb-4">
          404
        </h1>

        {/* Заголовок */}
        <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
          Груз не найден!
        </h2>

        {/* Описание */}
        <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
          Похоже, страница, которую вы ищете, была перемещена, удалена или никогда не существовала.
        </p>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="bg-[#f05a28] text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-[#d44a1d] transition-all shadow-lg shadow-[#f05a28]/30"
          >
            Вернуться на главную
          </Link>
          <a 
            href="tel:+79011172371"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-white/20 transition-all"
          >
            📞 +7 (901) 117-23-71
          </a>
        </div>

        {/* Популярные разделы */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
          <Link href="/#services" className="bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold hover:bg-white/10 transition-all">
            🚛 Услуги
          </Link>
          <Link href="/#form" className="bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold hover:bg-white/10 transition-all">
            📋 Заявка
          </Link>
          <Link href="/#contacts" className="bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold hover:bg-white/10 transition-all">
            📍 Контакты
          </Link>
        </div>

        {/* Авторедирект */}
        <p className="text-slate-500 text-sm mt-8">
          Вы будете перенаправлены на главную через{" "}
          <span className="text-[#f05a28] font-bold">{seconds}</span> секунд
        </p>
      </div>
    </div>
  );
}