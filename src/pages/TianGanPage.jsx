import { useState } from 'react';
import tianganData from '../data/tiangan.json';
import { TG_WU_XING, TG_YIN_YANG, WX_COLOR } from '../utils/bazi';
import { RotateCw, Filter } from 'lucide-react';

const WU_XING_FILTER = ['全部', '木', '火', '土', '金', '水'];

export default function TianGanPage() {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [filter, setFilter] = useState('全部');

  const toggleFlip = (name) => {
    const newSet = new Set(flippedCards);
    if (newSet.has(name)) {
      newSet.delete(name);
    } else {
      newSet.add(name);
    }
    setFlippedCards(newSet);
  };

  const filteredData = filter === '全部' 
    ? tianganData 
    : tianganData.filter(tg => tg.wuxing === filter);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-bazi-accent mb-2">十天干详解</h2>
        <p className="text-bazi-text-muted">点击卡片翻转，探索每个天干的奥秘</p>
      </div>

      {/* Filter */}
      <div className="flex justify-center gap-2 flex-wrap">
        {WU_XING_FILTER.map(wx => (
          <button
            key={wx}
            onClick={() => setFilter(wx)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === wx
                ? wx === '全部' 
                  ? 'bg-bazi-accent text-bazi-text'
                  : 'text-bazi-text'
                : 'bg-bazi-card text-bazi-text-muted border border-bazi-border hover:border-gray-500'
            }`}
            style={filter === wx && wx !== '全部' ? { backgroundColor: WX_COLOR[wx] } : {}}
          >
            {wx === '全部' ? '全部' : wx}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredData.map((tg) => {
          const isFlipped = flippedCards.has(tg.name);
          const wuxingColor = WX_COLOR[tg.wuxing];
          const isYang = tg.yinyang === '阳';

          return (
            <div
              key={tg.name}
              onClick={() => toggleFlip(tg.name)}
              className="flip-card cursor-pointer h-64"
            >
              <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                {/* Front */}
                <div 
                  className="flip-card-front flex flex-col items-center justify-center p-4 border-2"
                  style={{ 
                    backgroundColor: `${wuxingColor}15`,
                    borderColor: `${wuxingColor}40`
                  }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-serif font-bold mb-3"
                    style={{ backgroundColor: wuxingColor }}
                  >
                    {tg.name}
                  </div>
                  <p className="text-lg font-bold text-bazi-text">{tg.wuxing}{tg.yinyang}</p>
                  <p className="text-sm text-bazi-text-muted mt-1">{isYang ? '阳干' : '阴干'}</p>
                  <div className="mt-3 px-3 py-1 rounded-full text-xs" style={{ backgroundColor: `${wuxingColor}30`, color: wuxingColor }}>
                    点击查看详情
                  </div>
                </div>

                {/* Back */}
                <div 
                  className="flip-card-back flex flex-col p-4 overflow-y-auto border-2"
                  style={{ 
                    backgroundColor: `${wuxingColor}20`,
                    borderColor: `${wuxingColor}60`
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-serif font-bold"
                      style={{ backgroundColor: wuxingColor }}
                    >
                      {tg.name}
                    </span>
                    <span className="text-bazi-text font-bold">{tg.wuxing}{tg.yinyang}</span>
                  </div>

                  {tg.ditiandui && (
                    <div className="mb-2">
                      <p className="text-xs text-bazi-text-muted">《滴天髓》</p>
                      <p className="text-sm text-bazi-accent font-serif">{tg.ditiandui}</p>
                    </div>
                  )}

                  {tg.leixiang && (
                    <div className="mb-2">
                      <p className="text-xs text-bazi-text-muted">类象</p>
                      <p className="text-sm text-bazi-text">{tg.leixiang}</p>
                    </div>
                  )}

                  {tg.xingge && (
                    <div className="mb-2">
                      <p className="text-xs text-bazi-text-muted">性格</p>
                      <p className="text-sm text-bazi-text">{tg.xingge}</p>
                    </div>
                  )}

                  {tg.xiji && (
                    <div>
                      <p className="text-xs text-bazi-text-muted">喜忌</p>
                      <p className="text-sm text-bazi-text">{tg.xiji}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Understanding Tips */}
      <div className="bg-bazi-card rounded-xl p-6 border border-bazi-border">
        <h3 className="text-lg font-bold text-bazi-accent mb-4">天干理解要点</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-bazi-surface rounded-lg p-4">
            <p className="text-yang font-medium mb-2">阳干（甲丙戊庚壬）</p>
            <p className="text-bazi-text-muted">刚健、主动、外向、扩张。喜克（需要雕琢），怕生扶太过。如同大树需要斧头修剪。</p>
          </div>
          <div className="bg-bazi-surface rounded-lg p-4">
            <p className="text-yin font-medium mb-2">阴干（乙丁己辛癸）</p>
            <p className="text-bazi-text-muted">柔顺、内敛、被动、收缩。喜生（需要滋养），怕克伐太过。如同花草需要阳光雨露。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
