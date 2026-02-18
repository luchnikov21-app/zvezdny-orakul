import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Home, Star, BookOpen, Users, ShoppingCart } from 'lucide-react';
import tarotData from './data/tarot.json';

const BOT_TOKEN = '8386174222:AAE0u87MOb-qbSVhqdBrfZQKiiSDJrGkNfY';
const BOT_USERNAME = 'ZvezdnyOrakulBot';

const webApp = window.Telegram?.WebApp;

const horoscopes = [
  { sign: 'Овен', text: 'Сегодня энергия бьёт ключом! Идеальный день для новых начинаний и смелых решений.' },
  { sign: 'Телец', text: 'Финансовая удача на твоей стороне. Не упусти выгодное предложение или подарок.' },
  { sign: 'Близнецы', text: 'Общение принесёт неожиданные возможности и приятные встречи.' },
  { sign: 'Рак', text: 'Сегодня важны эмоции и семья. Звёзды советуют быть ближе к близким.' },
  { sign: 'Лев', text: 'Ты — король дня! Смело заявляй о себе, успех гарантирован.' },
  { sign: 'Дева', text: 'Время для порядка и мелких дел. Всё получится идеально.' },
  { sign: 'Весы', text: 'Гармония и красота на первом месте. Идеальный день для любви.' },
  { sign: 'Скорпион', text: 'Глубокие эмоции и страсть. Сегодня ты магнитом притягиваешь людей.' },
  { sign: 'Стрелец', text: 'Приключения зовут! Смелые планы и путешествия в приоритете.' },
  { sign: 'Козерог', text: 'Работа и цели на первом месте. Упорство принесёт результат.' },
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
    if (webApp) {
      webApp.ready();
      webApp.expand();
    }
    const randomCard = tarotData[Math.floor(Math.random() * tarotData.length)];
    setDailyCard(randomCard);
  }, []);

  const saveSign = (sign) => {
    setUserSign(sign);
  };

  const buyPremium = (title, amount) => {
    alert(`Покупка "${title}" за ${amount} Stars\n(в реальном боте откроется оплата)`);
    confetti({ particleCount: 200, spread: 70 });
  };

  const drawTarot = () => {
    const shuffled = [...tarotData].sort(() => 0.5 - Math.random()).slice(0, 3);
    setSelectedCards(shuffled);
    setIsFlipped(true);
  };

  const sharePrediction = () => {
    const text = `✨ Мой гороскоп на сегодня от Звёздного Оракула:\n${horoscopes.find(h => h.sign === userSign)?.text}\n\nОткрывай свой: t.me/${BOT_USERNAME}?startapp`;
    alert('Скопировано в буфер! Отправь в чат ❤️\n\n' + text);
  };

  return (
    <div className="min-h-screen pb-24 text-white overflow-hidden bg-cosmic">
      <div className="text-center py-6 border-b border-purple/30">
        <h1 className="text-3xl font-bold glow-gold">Звёздный Оракул ✨</h1>
        <p className="text-sm text-white/60">Твой личный гид по судьбе</p>
      </div>

      {activeTab === 'home' && (
        <div className="p-6 text-center">
          <p className="text-xl">Привет! Сегодня карта дня:</p>
          {dailyCard && (
            <div className="mx-auto mt-6 w-72 rounded-2xl overflow-hidden shadow-2xl">
              <img src={dailyCard.image} className="w-full" />
              <div className="bg-black/70 p-4">
                <h3 className="text-2xl font-bold text-gold">{dailyCard.name}</h3>
                <p>{dailyCard.meaning}</p>
              </div>
            </div>
          )}
          <button onClick={sharePrediction} className="mt-8 w-full bg-gold text-black py-4 rounded-2xl font-bold text-lg">
            Поделиться предсказанием ❤️
          </button>
        </div>
      )}

      {activeTab === 'horoscope' && (
        <div className="p-6">
          <h2 className="text-2xl text-center mb-6">Гороскоп на сегодня</h2>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {horoscopes.map(h => (
              <button key={h.sign} onClick={() => saveSign(h.sign)} className={`py-3 rounded-xl ${userSign === h.sign ? 'bg-gold text-black' : 'bg-white/10'}`}>
                {h.sign}
              </button>
            ))}
          </div>
          <div className="bg-purple/20 p-6 rounded-3xl">
            <h3 className="text-3xl font-bold mb-4">{userSign}</h3>
            <p className="text-lg leading-relaxed">{horoscopes.find(h => h.sign === userSign)?.text}</p>
            <button onClick={() => buyPremium('Полный гороскоп', 7)} className="mt-6 w-full bg-gradient-to-r from-gold to-purple py-4 rounded-2xl font-bold">
              Полное предсказание — 7 Stars
            </button>
          </div>
        </div>
      )}

      {activeTab === 'tarot' && (
        <div className="p-6">
          <h2 className="text-2xl text-center mb-8">Расклад Таро</h2>
          <button onClick={drawTarot} className="w-full bg-gradient-to-r from-purple to-gold py-5 rounded-3xl text-xl font-bold mb-8">
            Вытянуть 3 карты бесплатно
          </button>
          <div className="grid grid-cols-3 gap-4">
            {selectedCards.map((card, i) => (
              <div key={i} className={`card relative ${isFlipped ? 'flipped' : ''}`} style={{height: '220px'}}>
                <img src={card.image} className="rounded-2xl w-full h-full object-cover" />
                <div className="absolute bottom-0 bg-black/70 w-full p-2 text-xs text-center">{card.name}</div>
              </div>
            ))}
          </div>
          {selectedCards.length > 0 && (
            <button onClick={() => buyPremium('Полный расклад', 15)} className="mt-8 w-full bg-gold text-black py-4 rounded-2xl font-bold">
              Полное толкование — 15 Stars
            </button>
          )}
        </div>
      )}

      {activeTab === 'compatibility' && (
        <div className="p-6 text-center">
          <h2 className="text-2xl mb-6">Совместимость</h2>
          <div className="text-6xl mb-4">❤️</div>
          <p className="text-2xl mb-8">Ты ({userSign}) + любимый человек</p>
          <div className="bg-white/10 p-8 rounded-3xl">
            <div className="text-7xl font-bold text-gold mb-2">87%</div>
            <p className="text-xl">Идеальная пара сегодня!</p>
          </div>
          <button onClick={() => buyPremium('Полная совместимость', 19)} className="mt-8 w-full bg-gradient-to-r from-pink-500 to-purple py-4 rounded-2xl font-bold">
            Узнать всё — 19 Stars
          </button>
        </div>
      )}

      {activeTab === 'shop' && (
        <div className="p-6 space-y-6">
          <h2 className="text-2xl text-center">Магазин Stars</h2>
          {[
            {title: 'Безлимит 30 дней', price: 79},
            {title: 'Кельтский крест', price: 29},
            {title: 'Золотая колода', price: 12},
            {title: 'Еженедельный прогноз', price: 25},
          ].map(item => (
            <div key={item.title} className="bg-white/10 p-6 rounded-3xl flex justify-between items-center">
              <div>
                <div className="font-bold text-xl">{item.title}</div>
                <div className="text-gold">{item.price} Stars</div>
              </div>
              <button onClick={() => buyPremium(item.title, item.price)} className="bg-gold text-black px-8 py-3 rounded-2xl font-bold">Купить</button>
            </div>
          ))}
        </div>
      )}

      {/* Нижняя навигация */}
      <div className="fixed bottom-0 left-0 right-0 bg-cosmic/95 border-t border-purple/30 flex justify-around py-3 z-50">
        {[
          {id: 'home', icon: Home, label: 'Дом'},
          {id: 'horoscope', icon: Star, label: 'Гороскоп'},
          {id: 'tarot', icon: BookOpen, label: 'Таро'},
          {id: 'compatibility', icon: Users, label: 'Совмест.'},
          {id: 'shop', icon: ShoppingCart, label: 'Магазин'},
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center ${activeTab === tab.id ? 'text-gold' : 'text-white/60'}`}>
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