// @ts-nocheck
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Home, Star, BookOpen, Users, ShoppingCart } from 'lucide-react';
import tarotData from './data/tarot.json';

const BOT_TOKEN = '8386174222:AAE0u87MOb-qbSVhqdBrfZQKiiSDJrGkNfY';
const BOT_USERNAME = 'ZvezdnyOrakulBot';

const webApp = window.Telegram?.WebApp;

const horoscopes = [
  { 
    sign: 'Овен', 
    text: 'Сегодня твоя энергия бьёт через край! Вселенная даёт зелёный свет для новых начинаний, смелых решений и ярких эмоций. Не бойся брать инициативу — удача на твоей стороне. Главное — направить этот огонь в правильное русло, и тогда день принесёт тебе настоящий прорыв.' 
  },
  { 
    sign: 'Телец', 
    text: 'Финансовая и материальная сфера сегодня особенно благоприятна. Возможны приятные неожиданные поступления или выгодные предложения. Звёзды советуют быть практичным, но не жадным. В любви — время для тёплых, чувственных моментов. Наслаждайся простыми радостями жизни.' 
  },
  { 
    sign: 'Близнецы', 
    text: 'День полон общения, новых идей и интересных встреч. Твой ум работает на максимальной скорости — используй это! Отличное время для переговоров, обучения и коротких поездок. Не бойся быть спонтанным — именно сегодня неожиданный разговор может изменить твою жизнь к лучшему.' 
  },
  { 
    sign: 'Рак', 
    text: 'Сегодня важно слушать своё сердце и интуицию. Семья, дом и близкие люди будут занимать центральное место. Звёзды обещают эмоциональную поддержку и тёплую атмосферу. Если есть давние вопросы — самое время их мягко решить. Заботься о себе, ты этого достоин.' 
  },
  { 
    sign: 'Лев', 
    text: 'Ты сегодня — главный герой дня! Солнце в твоём знаке даёт мощный заряд харизмы и уверенности. Смело выходи на сцену жизни — тебя заметят и оценят. Идеальный день для творчества, публичных выступлений и проявления себя. Любовь и внимание окружающих гарантированы.' 
  },
  { 
    sign: 'Дева', 
    text: 'Порядок, детали и планирование — твои главные союзники сегодня. Всё, что ты начнёшь с умом и вниманием к мелочам, получится идеально. Хороший день для работы, учёбы и наведения порядка в делах. Не забывай хвалить себя за маленькие победы — они важны.' 
  },
  { 
    sign: 'Весы', 
    text: 'Гармония и красота сегодня на первом месте. Идеальный день для любви, свиданий, переговоров и творчества. Твоё обаяние работает на полную мощность. Звёзды помогают найти баланс между своими желаниями и желаниями других. Доверься чувству прекрасного.' 
  },
  { 
    sign: 'Скорпион', 
    text: 'Сегодня ты — магнит для глубоких эмоций и сильных людей. Твоя интуиция на пике. Не бойся смотреть вглубь себя и ситуаций — именно там скрыты настоящие ответы. Страсть, трансформация и мощная энергия сопровождают тебя весь день.' 
  },
  { 
    sign: 'Стрелец', 
    text: 'Приключения зовут! День идеален для новых идей, путешествий (даже виртуальных) и расширения горизонтов. Твоя оптимистичная энергия заразительна. Смело планируй будущее — Вселенная поддержит самые смелые мечты.' 
  },
  { 
    sign: 'Козерог', 
    text: 'Твоя дисциплина и упорство сегодня приносят первые серьёзные плоды. Отличный день для работы над долгосрочными целями. Звёзды отмечают твою надёжность и силу. Не забывай иногда отдыхать — даже горы иногда нуждаются в передышке.' 
  },
  { 
    sign: 'Водолей', 
    text: 'Оригинальность и свобода — твои главные темы дня. Приходят неожиданные идеи и решения. Отличное время для дружбы, сетевого общения и внедрения новых технологий. Не бойся быть не таким, как все — именно в этом твоя сила.' 
  },
  { 
    sign: 'Рыбы', 
    text: 'Интуиция и мечты сегодня ведут тебя. День полон тонких знаков и волшебных совпадений. Позволь себе помечтать и почувствовать связь со Вселенной. В любви и творчестве — особенно сильная энергия. Доверься потоку.' 
  }
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
    alert(`Покупка "${title}" за ${amount} Stars`);
    confetti({ particleCount: 200, spread: 70 });
  };

  const drawTarot = () => {
    const shuffled = [...tarotData].sort(() => 0.5 - Math.random()).slice(0, 3);
    setSelectedCards(shuffled);
    setIsFlipped(true);
  };

  const sharePrediction = () => {
    const text = `✨ Мой гороскоп сегодня от Звёздного Оракула:\n${horoscopes.find(h => h.sign === userSign)?.text}\n\nОткрывай свой: t.me/${BOT_USERNAME}?startapp`;
    navigator.clipboard.writeText(text);
    alert('Текст скопирован! Отправь в чат ❤️');
  };

  return (
    <div className="min-h-screen pb-24 text-white bg-cosmic relative overflow-hidden">
      {/* Фон с звёздами */}
      <div className="stars" />

      {/* Header */}
      <div className="text-center py-8 border-b border-purple/30">
        <h1 className="text-4xl font-bold glow-gold tracking-wide">Звёздный Оракул</h1>
        <p className="text-sm text-white/60 mt-1">Твой личный проводник по звёздам ✨</p>
      </div>

      {/* Основной контент */}
      {activeTab === 'home' && (
        <div className="p-6">
          <div className="text-center mb-8">
            <p className="text-xl">Привет! Сегодня карта дня:</p>
          </div>
          {dailyCard && (
            <div className="mx-auto w-80 rounded-3xl overflow-hidden shadow-2xl border border-gold/30">
              <img src={dailyCard.image} className="w-full" alt={dailyCard.name} />
              <div className="bg-black/70 p-6 text-center">
                <h3 className="text-3xl font-bold text-gold mb-2">{dailyCard.name}</h3>
                <p className="text-lg">{dailyCard.meaning}</p>
              </div>
            </div>
          )}
          <button onClick={sharePrediction} className="mt-10 w-full py-5 bg-gradient-to-r from-neonGold to-yellow-300 text-black font-bold text-xl rounded-3xl shadow-gold">
            Поделиться предсказанием ❤️
          </button>
        </div>
      )}

      {/* Остальные табы можно оставить как были или улучшить позже */}

      {/* Нижняя навигация (красивая) */}
      <div className="fixed bottom-0 left-0 right-0 bg-cosmic/95 border-t border-purple/30 flex justify-around py-3 z-50 backdrop-blur-xl">
        {[
          {id:'home', icon:Home, label:'Дом'},
          {id:'horoscope', icon:Star, label:'Гороскоп'},
          {id:'tarot', icon:BookOpen, label:'Таро'},
          {id:'compatibility', icon:Users, label:'Совмест.'},
          {id:'shop', icon:ShoppingCart, label:'Магазин'},
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center transition-all ${activeTab === tab.id ? 'text-neonGold scale-110' : 'text-white/60'}`}>
              <Icon className="w-8 h-8" />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;