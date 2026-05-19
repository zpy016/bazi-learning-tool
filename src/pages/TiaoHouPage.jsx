import { useState } from 'react';
import { TIAN_GAN, DI_ZHI, TG_WU_XING, WX_COLOR } from '../utils/bazi';
import tiaohouData from '../data/tiaohou.json';
import { Sparkles, ThermometerSun, ThermometerSnowflake } from 'lucide-react';

const YUE_ZHI_SEASON = {
  '寅': '春', '卯': '春', '辰': '春末',
  '巳': '夏', '午': '夏', '未': '夏末',
  '申': '秋', '酉': '秋', '戌': '秋末',
  '亥': '冬', '子': '冬', '丑': '冬末'
};

const SEASON_ICON = {
  '春': '🌸', '春末': '🌿',
  '夏': '☀️', '夏末': '🌾',
  '秋': '🍂', '秋末': '🍁',
  '冬': '❄️', '冬末': '🌨️'
};

export default function TiaoHouPage() {
  const [riGan, setRiGan] = useState('甲');
  const [yueZhi, setYueZhi] = useState('子');

  const result = tiaohouData.find(
    t => t.riGan === riGan && t.yueZhi === yueZhi
  );

  const season = YUE_ZHI_SEASON[yueZhi];
  const isCold = season.includes('冬');
  const isHot = season.includes('夏');

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-bazi-gold mb-2">调候用神查询</h2>
        <p className="text-gray-400">根据日干和出生月份，查询对应用神</p>
      </div>

      {/* Input */}
      <div className="bg-bazi-card rounded-xl p-6 border border-bazi-gold/20">
        <div className="flex flex-col md:flex-row justify-center gap-6 items-end">
          <div>
            <label className="block text-sm text-gray-400 mb-2">日干</label>
            <div className="flex gap-2">
              {TIAN_GAN.map(gan => (
                <button
                  key={gan}
                  onClick={() => setRiGan(gan)}
                  className={`w-10 h-10 rounded-full text-lg font-serif font-bold transition-all ${
                    riGan === gan
                      ? 'ring-2 ring-bazi-gold scale-110'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: WX_COLOR[TG_WU_XING[gan]] }}
                >
                  {gan}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">月支（出生月份）</label>
            <div className="flex gap-2 flex-wrap">
              {DI_ZHI.map(zhi => (
                <button
                  key={zhi}
                  onClick={() => setYueZhi(zhi)}
                  className={`w-10 h-10 rounded-full text-lg font-serif font-bold transition-all ${
                    yueZhi === zhi
                      ? 'ring-2 ring-bazi-gold scale-110'
                      : 'bg-bazi-dark border border-gray-700 hover:border-gray-500'
                  }`}
                >
                  {zhi}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-bazi-card rounded-xl p-8 border border-bazi-gold/30 animate-fade-in">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-4xl">{SEASON_ICON[season]}</span>
            </div>
            <h3 className="text-xl text-gray-400">
              <span className="font-serif font-bold" style={{ color: WX_COLOR[TG_WU_XING[riGan]] }}>{riGan}</span>
              <span> 生于 </span>
              <span className="text-bazi-gold">{yueZhi}月</span>
              <span>（{season}）</span>
            </h3>
          </div>

          <div className="bg-bazi-dark rounded-xl p-6 text-center mb-4">
            <p className="text-sm text-gray-400 mb-2">调候用神</p>
            <p className="text-4xl font-serif font-bold text-bazi-gold">
              {result.yongShen}
            </p>
            {result.yongShen.split('').map((char, i) => {
              if (TIAN_GAN.includes(char)) {
                return (
                  <span key={i} className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-bold mr-2"
                    style={{ backgroundColor: `${WX_COLOR[TG_WU_XING[char]]}30`, color: WX_COLOR[TG_WU_XING[char]] }}
                  >
                    {char} ({TG_WU_XING[char]})
                  </span>
                );
              }
              return null;
            })}
          </div>

          {result.shuoMing && (
            <div className="bg-bazi-dark/50 rounded-lg p-4">
              <p className="text-sm text-gray-300 leading-relaxed">{result.shuoMing}</p>
            </div>
          )}

          {/* Temperature indicator */}
          <div className="flex justify-center gap-6 mt-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isHot ? 'bg-red-500/20 text-red-400' : 'text-gray-600'}`}>
              <ThermometerSun size={18} />
              <span className="text-sm">偏热</span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${!isHot && !isCold ? 'bg-yellow-500/20 text-yellow-400' : 'text-gray-600'}`}>
              <Sparkles size={18} />
              <span className="text-sm">温和</span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isCold ? 'bg-blue-500/20 text-blue-400' : 'text-gray-600'}`}>
              <ThermometerSnowflake size={18} />
              <span className="text-sm">偏寒</span>
            </div>
          </div>
        </div>
      )}

      {/* Explanation */}
      <div className="bg-bazi-card rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-bold text-bazi-gold mb-3">什么是调候用神？</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-3">
          调候用神是八字命理中非常重要的概念。它指的是根据出生的季节（月令），
          判断命局需要什么样的五行来"调节气候"，使命局达到平衡。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-bazi-dark rounded-lg p-4">
            <p className="text-blue-400 font-medium mb-1">冬生需火调候</p>
            <p className="text-gray-400">冬季寒冷，八字偏寒，需要火来温暖。如同人在冬天需要暖气。</p>
          </div>
          <div className="bg-bazi-dark rounded-lg p-4">
            <p className="text-red-400 font-medium mb-1">夏生需水调候</p>
            <p className="text-gray-400">夏季炎热，八字偏燥，需要水来滋润。如同人在夏天需要空调。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
