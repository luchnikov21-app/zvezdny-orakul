// @ts-nocheck
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Home, Star, BookOpen, Users, ShoppingCart } from 'lucide-react';
import tarotData from './data/tarot.json';

const BOT_TOKEN = '8386174222:AAE0u87MOb-qbSVhqdBrfZQKiiSDJrGkNfY';
const BOT_USERNAME = 'ZvezdnyOrakulBot';

const webApp = window.Telegram?.WebApp;

const signs = ['Овен', 'Телец', 'Близнецы', 'Рак', 'Лев', 'Дева', 'Весы', 'Скорпион', 'Стрелец', 'Козерог', 'Водолей', 'Рыбы'];

const horoscopes = [
  { sign: 'Овен', text: 'Сегодня твоя энергия бьёт через край! Вселенная даёт зелёный свет для новых начинаний.' },
  { sign: 'Телец', text: 'Финансовая удача на твоей стороне. Не упусти выгодные предложения.' },
  { sign: 'Близнецы', text: 'Общение принесёт неожиданные возможности и приятные встречи.' },
  { sign: 'Рак', text: 'Сегодня важно слушать сердце. Семья и близкие — твой главный ресурс.' },
  { sign: 'Лев', text: 'Ты — король дня! Смело заявляй о себе, успех гарантирован.' },
  { sign: 'Дева', text: 'Порядок и внимание к деталям принесут отличные результаты.' },
  { sign: 'Весы', text: 'Гармония и красота на первом месте. Идеальный день для любви.' },
  { sign: 'Скорпион', text: 'Глубокие эмоции и мощная интуиция. Сегодня ты магнитом притягиваешь людей.' },
  { sign: 'Стрелец', text: 'Приключения зовут! Смело планируй будущее.' },
  { sign: 'Козерог', text: 'Твоё упорство сегодня приносит первые серьёзные плоды.' },
  { sign: 'Водолей', text: 'Оригинальные идеи и свобода. Мир сегодня твой.' },
  { sign: 'Рыбы', text: 'Интуиция на пике. Слушай сердце — оно не обманет.' }
];

// Реальная астрологическая совместимость (классическая)
const compatibilityTable = {
  'Овен': { 'Овен': 75, 'Телец': 60, 'Близнецы': 85, 'Рак': 65, 'Лев': 95, 'Дева': 70, 'Весы': 80, 'Скорпион': 55, 'Стрелец': 90, 'Козерог': 65, 'Водолей': 85, 'Рыбы': 70 },
  'Телец': { 'Овен': 60, 'Телец': 80, 'Близнецы': 65, 'Рак': 90, 'Лев': 70, 'Дева': 95, 'Весы': 75, 'Скорпион': 85, 'Стрелец': 60, 'Козерог': 90, 'Водолей': 55, 'Рыбы': 80 },
  'Близнецы': { 'Овен': 85, 'Телец': 65, 'Близнецы': 70, 'Рак': 75, 'Лев': 80, 'Дева': 65, 'Весы': 90, 'Скорпион': 70, 'Стрелец': 85, 'Козерог': 60, 'Водолей': 95, 'Рыбы': 75 },
  'Рак': { 'Овен': 65, 'Телец': 90, 'Близнецы': 75, 'Рак': 80, 'Лев': 70, 'Дева': 85, 'Весы': 70, 'Скорпион': 95, 'Стрелец': 65, 'Козерог': 80, 'Водолей': 60, 'Рыбы': 90 },
  'Лев': { 'Овен': 95, 'Телец': 70, 'Близнецы': 80, 'Рак': 70, 'Лев': 75, 'Дева': 65, 'Весы': 85, 'Скорпион': 75, 'Стрелец': 90, 'Козерог': 70, 'Водолей': 80, 'Рыбы': 65 },
  'Дева': { 'Овен': 70, 'Телец': 95, 'Близнецы': 65, 'Рак': 85, 'Лев': 65, 'Дева': 80, 'Весы': 70, 'Скорпион': 80, 'Стрелец': 60, 'Козерог': 90, 'Водолей': 65, 'Рыбы': 75 },
  'Весы': { 'Овен': 80, 'Телец': 75, 'Близнецы': 90, 'Рак': 70, 'Лев': 85, 'Дева': 70, 'Весы': 75, 'Скорпион': 65, 'Стрелец': 80, 'Козерог': 70, 'Водолей': 90, 'Рыбы': 80 },
  'Скорпион': { 'Овен': 55, 'Телец': 85, 'Близнецы': 70, 'Рак': 95, 'Лев': 75, 'Дева': 80, 'Весы': 65, 'Скорпион': 80, 'Стрелец': 70, 'Козерог': 85, 'Водолей': 60, 'Рыбы': 90 },
  'Стрелец': { 'Овен': 90, 'Телец': 60, 'Близнецы': 85, 'Рак': 65, 'Лев': 90, 'Дева': 60, 'Весы': 80, 'Скорпион': 70, 'Стрелец': 75, 'Козерог': 65, 'Водолей': 85, 'Рыбы': 70 },
  'Козерог': { 'Овен': 65, 'Телец': 90, 'Близнецы': 60, 'Рак': 80, 'Лев': 70, 'Дева': 90, 'Весы': 70, 'Скорпион': 85, 'Стрелец': 65, 'Козерог': 80, 'Водолей': 75, 'Рыбы': 70 },
  'Водолей': { 'Овен': 85, 'Телец': 55, 'Близнецы': 95, 'Рак': 60, 'Лев': 80, 'Дева': 65, 'Весы': 90, 'Скорпион': 60, 'Стрелец': 85, 'Козерог': 75, 'Водолей': 75, 'Рыбы': 80 },
  'Рыбы': { 'Овен': 70, 'Телец': 80, 'Близнецы': 75, 'Рак': 90, 'Лев': 65, 'Дева': 75, 'Весы': 80, 'Скорпион': 90, 'Стрелец': 70, 'Козерог': 70, 'Водолей': 80, 'Рыбы': 80 }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userSign, setUserSign] = useState('Овен');
  const [partnerSign, setPartnerSign] = useState('Лев');
  const [compatibility, setCompatibility] = useState(87);
  const [dailyCard, setDailyCard] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  // Анимированный счётчик совместимости
  useEffect(() => {
    if (activeTab === 'compatibility') {
      const percent = compatibilityTable[userSign]?.[partnerSign] || 75;
      let current = 0;
      const interval = setInterval(() => {
        current += Math.ceil((percent - current) / 6);
        if (current >= percent) {
          current = percent;
          clearInterval(interval);
        }
        setCompatibility(current);
      }, 35);
    }
  }, [activeTab, userSign, partnerSign]);

  useEffect(() => {
    webApp?.ready();
    webApp?.expand();

    const randomCard = tarotData[Math.floor(Math.random() * tarotData.length)];
    setDailyCard(randomCard);
  }, []);

  const drawTarot = () => {
    const shuffled = [...tarotData].sort(() => 0.5 - Math.random()).slice(0, 3);
    setSelectedCards(shuffled);
    setIsFlipped(true);
    confetti({ particleCount: 100, spread: 70 });
  };

  const buyPremium = (title, amount) => {
    alert(`Покупка "${title}" за ${amount} Stars ✨`);
    confetti({ particleCount: 200, spread: 80 });
  };

  const sharePrediction = () => {
    const text = `✨ Мой гороскоп сегодня от Звёздного Оракула:\n${horoscopes.find(h => h.sign === userSign)?.text}\n\nОткрывай свой: t.me/${BOT_USERNAME}?startapp`;
    navigator.clipboard.writeText(text);
    alert('Текст скопирован! Поделись в чате ❤️');
  };

  return (
    <div className="min-h-screen pb-24 text-white bg-gradient-to-b from-[#0a0a1f] to-[#1a0033] relative overflow-hidden">
      {/* Header */}
      <div className="text-center py-8 border-b border-purple/30">
        <h1 className="text-4xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-300 to-pink-300">
          Звёздный Оракул
        </h1>
        <p className="text-sm text-white/60 mt-1">Твой личный проводник по звёздам ✨</p>
      </div>

      {/* Главный экран */}
      {activeTab === 'home' && (
        <div className="p-6 text-center">
          <p className="text-xl mb-6">Сегодня карта дня для тебя:</p>
          {dailyCard && (
            <div className="mx-auto w-80 rounded-3xl overflow-hidden shadow-2xl border border-yellow-400/30">
              <img src={dailyCard.image} className="w-full" alt={dailyCard.name} />
              <div className="bg-black/70 p-6">
                <h3 className="text-3xl font-bold text-yellow-300">{dailyCard.name}</h3>
                <p className="mt-3 text-lg">{dailyCard.meaning}</p>
              </div>
            </div>
          )}
          <button onClick={sharePrediction} className="mt-10 w-full py-5 bg-gradient-to-r from-yellow-300 to-purple-400 text-black font-bold text-xl rounded-3xl shadow-lg">
            Поделиться предсказанием ❤️
          </button>
        </div>
      )}

      {/* Гороскоп */}
      {activeTab === 'horoscope' && (
        <div className="p-6">
          <h2 className="text-3xl text-center mb-8">Гороскоп на сегодня</h2>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {horoscopes.map(h => (
              <button
                key={h.sign}
                onClick={() => setUserSign(h.sign)}
                className={`py-4 rounded-2xl text-sm font-medium transition-all ${userSign === h.sign ? 'bg-yellow-300 text-black scale-105' : 'bg-white/10'}`}
              >
                {h.sign}
              </button>
            ))}
          </div>
          <div className="bg-white/10 p-8 rounded-3xl">
            <h3 className="text-4xl font-bold text-yellow-300 mb-6">{userSign}</h3>
            <p className="text-lg leading-relaxed">{horoscopes.find(h => h.sign === userSign)?.text}</p>
            <button onClick={() => buyPremium('Полный гороскоп + совет', 7)} className="mt-8 w-full py-5 bg-gradient-to-r from-yellow-300 to-purple-400 text-black font-bold text-xl rounded-3xl">
              Полное предсказание — 7 Stars
            </button>
          </div>
        </div>
      )}

      {/* Таро */}
      {activeTab === 'tarot' && (
        <div className="p-6">
          <h2 className="text-3xl text-center mb-8 glow-gold">Расклад Таро</h2>
          <button onClick={drawTarot} className="w-full py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl text-xl font-bold mb-10">
            Вытянуть 3 карты
          </button>

          <div className="grid grid-cols-3 gap-4">
            {selectedCards.map((card, i) => (
              <div key={i} className="relative">
                <img src={card.image} className="rounded-2xl shadow-2xl w-full border border-yellow-400/30" alt={card.name} />
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-xs p-3 rounded-b-2xl text-center">
                  {card.name}
                </div>
              </div>
            ))}
          </div>

          {selectedCards.length > 0 && (
            <div className="mt-10 space-y-6">
              {selectedCards.map((card, i) => (
                <div key={i} className="bg-white/10 p-6 rounded-3xl">
                  <h4 className="text-xl font-bold text-yellow-300">{card.name}</h4>
                  <p className="mt-3">Прямое: {card.meaning}</p>
                  <p className="text-purple-300">Перевёрнутое: {card.reversed}</p>
                </div>
              ))}
              <button onClick={() => buyPremium('Полное толкование расклада', 15)} className="w-full py-6 bg-gradient-to-r from-yellow-300 to-purple-400 text-black font-bold text-xl rounded-3xl">
                Полное толкование — 15 Stars
              </button>
            </div>
          )}
        </div>
      )}

      {/* Совместимость с выбором партнёра и анимацией */}
      {activeTab === 'compatibility' && (
        <div className="p-6 min-h-screen flex flex-col items-center">
          <h2 className="text-4xl font-bold text-center mb-10 glow-gold">Совместимость</h2>

          {/* Выбор знаков */}
          <div className="w-full max-w-sm space-y-6 mb-12">
            <div>
              <p className="text-sm text-white/60 mb-2">Твой знак</p>
              <select value={userSign} onChange={(e) => setUserSign(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-xl">
                {signs.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <p className="text-sm text-white/60 mb-2">Знак партнёра</p>
              <select value={partnerSign} onChange={(e) => setPartnerSign(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-xl">
                {signs.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Большой анимированный процент */}
          <div className="text-center mb-12">
            <div className="text-[110px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
              {compatibility}
            </div>
            <p className="text-2xl -mt-6">%</p>
            <p className="text-xl text-white/70">совместимость по звёздам</p>
          </div>

          <button onClick={() => buyPremium('Полная совместимость (любовь, карьера, секс)', 19)} className="mt-auto w-full py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 text-white font-bold text-xl rounded-3xl shadow-2xl shadow-purple-500/50">
            Узнать всё за 19 Stars
          </button>
        </div>
      )}

      {/* Магазин */}
      {activeTab === 'shop' && (
        <div className="p-6 space-y-6">
          <h2 className="text-3xl text-center mb-8">Магазин Stars</h2>
          {[
            { title: 'Безлимит на 30 дней', price: 79 },
            { title: 'Кельтский крест (10 карт)', price: 29 },
            { title: 'Золотая колода Таро', price: 12 },
            { title: 'Еженедельный прогноз', price: 25 },
          ].map(item => (
            <div key={item.title} className="bg-white/10 p-6 rounded-3xl flex justify-between items-center">
              <div>
                <div className="text-xl font-bold">{item.title}</div>
                <div className="text-yellow-300 text-2xl font-semibold">{item.price} Stars</div>
              </div>
              <button onClick={() => buyPremium(item.title, item.price)} className="bg-yellow-300 text-black px-10 py-4 rounded-2xl font-bold">
                Купить
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Нижняя навигация */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a1f]/95 border-t border-purple-500/30 flex justify-around py-4 z-50 backdrop-blur-xl">
        {[
          { id: 'home', icon: Home, label: 'Дом' },
          { id: 'horoscope', icon: Star, label: 'Гороскоп' },
          { id: 'tarot', icon: BookOpen, label: 'Таро' },
          { id: 'compatibility', icon: Users, label: 'Совмест.' },
          { id: 'shop', icon: ShoppingCart, label: 'Магазин' },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center transition-all ${activeTab === tab.id ? 'text-yellow-300 scale-110' : 'text-white/60'}`}
            >
              <Icon className="w-7 h-7" />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;