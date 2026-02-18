// @ts-nocheck
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Home, Star, BookOpen, Users, ShoppingCart } from 'lucide-react';
import tarotData from './data/tarot.json';

const BOT_TOKEN = '8386174222:AAE0u87MOb-qbSVhqdBrfZQKiiSDJrGkNfY';
const BOT_USERNAME = 'ZvezdnyOrakulBot';

const webApp = window.Telegram?.WebApp;

const horoscopes = [
  { sign: 'Овен', text: 'Сегодня твоя энергия бьёт через край! Вселенная даёт зелёный свет для новых начинаний и смелых решений.' },
  { sign: 'Телец', text: 'Финансовая удача на твоей стороне. Не упусти выгодные предложения и приятные подарки.' },
  { sign: 'Близнецы', text: 'Общение принесёт неожиданные возможности. Твой ум работает на максимуме!' },
  { sign: 'Рак', text: 'Сегодня важно слушать сердце. Семья и близкие люди — твой главный ресурс.' },
  { sign: 'Лев', text: 'Ты — король дня! Смело заявляй о себе, успех и внимание гарантированы.' },
  { sign: 'Дева', text: 'Порядок и внимание к деталям принесут отличные результаты.' },
  { sign: 'Весы', text: 'Гармония и красота на первом месте. Идеальный день для любви и переговоров.' },
  { sign: 'Скорпион', text: 'Глубокие эмоции и мощная интуиция. Сегодня ты магнитом притягиваешь людей.' },
  { sign: 'Стрелец', text: 'Приключения зовут! Смело планируй будущее — Вселенная поддержит.' },
  { sign: 'Козерог', text: 'Твоё упорство сегодня приносит первые серьёзные плоды.' },
  { sign: 'Водолей', text: 'Оригинальные идеи и свобода. Мир сегодня твой.' },
  { sign: 'Рыбы', text: 'Интуиция на пике. Слушай сердце — оно не обманет.' }
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userSign, setUserSign] = useState('Овен');
  const [dailyCard, setDailyCard] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    webApp?.ready();
    webApp?.expand();

    const randomCard = tarotData[Math.floor(Math.random() * tarotData.length)];
    setDailyCard(randomCard);
  }, []);

  const buyPremium = (title, amount) => {
    alert(`Покупка "${title}" за ${amount} Stars ✨`);
    confetti({ particleCount: 200, spread: 70 });
  };

  const drawTarot = () => {
    const shuffled = [...tarotData].sort(() => 0.5 - Math.random()).slice(0, 3);
    setSelectedCards(shuffled);
    setIsFlipped(true);
    confetti({ particleCount: 80, spread: 60 });
  };

  const sharePrediction = () => {
    const text = `✨ Мой гороскоп сегодня от Звёздного Оракула:\n${horoscopes.find(h => h.sign === userSign)?.text}\n\nОткрывай свой: t.me/${BOT_USERNAME}?startapp`;
    navigator.clipboard.writeText(text);
    alert('Текст скопирован! Отправь друзьям ❤️');
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

      {/* Таро - с полной колодой */}
      {activeTab === 'tarot' && (
        <div className="p-6">
          <h2 className="text-3xl text-center mb-8 glow-gold">Расклад Таро</h2>
          
          <button onClick={drawTarot} className="w-full py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl text-xl font-bold mb-10">
            Вытянуть 3 карты
          </button>

          <div className="grid grid-cols-3 gap-4">
            {selectedCards.map((card, i) => (
              <div key={i} className="relative">
                <img 
                  src={card.image} 
                  className="rounded-2xl shadow-2xl w-full border border-yellow-400/30"
                  alt={card.name}
                />
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

      {/* Совместимость */}
      {activeTab === 'compatibility' && (
  <div className="p-6 min-h-screen flex flex-col items-center">
    <h2 className="text-4xl font-bold text-center mb-8 glow-gold">Совместимость</h2>

    <div className="flex gap-8 items-center mb-10">
      {/* Твой знак */}
      <div className="text-center">
        <div className="text-7xl mb-3">♌</div>
        <p className="text-xl font-medium text-yellow-300">{userSign}</p>
      </div>

      <div className="text-6xl text-pink-400 animate-pulse">❤️</div>

      {/* Знак партнёра */}
      <div className="text-center">
        <div className="text-7xl mb-3">♓</div>
        <p className="text-xl font-medium text-purple-300">Рыбы</p>
      </div>
    </div>

    {/* Анимированный процент */}
    <div className="text-center mb-12">
      <div className="text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 leading-none">
        {compatibility}%
      </div>
      <p className="text-2xl text-white/70 -mt-4">совместимость</p>
    </div>

    {/* Прогресс-бары с анимацией */}
    <div className="w-full max-w-xs space-y-8">
      {[
        { label: 'Любовь', percent: 92, color: 'from-pink-500 to-rose-500' },
        { label: 'Карьера', percent: 78, color: 'from-yellow-400 to-amber-500' },
        { label: 'Дружба', percent: 95, color: 'from-purple-500 to-violet-500' },
      ].map((item, i) => (
        <div key={i}>
          <div className="flex justify-between text-sm mb-1">
            <span>{item.label}</span>
            <span className="font-medium">{item.percent}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1500 ease-out`}
              style={{ width: `${item.percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-12 text-center text-sm text-white/60">
      Сегодня звёзды особенно благосклонны к вам ✨
    </div>

    <button 
      onClick={() => buyPremium('Полная совместимость (любовь, карьера, секс)', 19)}
      className="mt-10 w-full py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 text-white font-bold text-xl rounded-3xl shadow-2xl shadow-purple-500/50"
    >
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