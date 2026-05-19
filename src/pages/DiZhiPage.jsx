import { useState } from 'react';
import dizhiData from '../data/dizhi.json';
import { DI_ZHI, DZ_WU_XING, DZ_YIN_YANG, DZ_CANG_GAN, TG_WU_XING, WX_COLOR } from '../utils/bazi';
import { Circle, GitBranch, ArrowRightLeft } from 'lucide-react';

// 六合关系
const LIU_HE = [
  ['子', '丑'], ['寅', '亥'], ['卯', '戌'],
  ['辰', '酉'], ['巳', '申'], ['午', '未']
];

// 三合关系
const SAN_HE = [
  ['申', '子', '辰'], ['寅', '午', '戌'],
  ['巳', '酉', '丑'], ['亥', '卯', '未']
];

// 六冲关系
const LIU_CHONG = [
  ['子', '午'], ['丑', '未'], ['寅', '申'],
  ['卯', '酉'], ['辰', '戌'], ['巳', '亥']
];

export default function DiZhiPage() {
  const [selectedZhi, setSelectedZhi] = useState(null);
  const [relationMode, setRelationMode] = useState(null); // 'liuhe', 'sanhe', 'chong'

  const handleSelect = (zhi) => {
    setSelectedZhi(selectedZhi === zhi ? null : zhi);
  };

  const getRelatedZhis = (zhi) => {
    if (!relationMode) return [];
    
    switch (relationMode) {
      case 'liuhe':
        const lh = LIU_HE.find(pair => pair.includes(zhi));
        return lh ? lh.filter(z => z !== zhi) : [];
      case 'sanhe':
        const sh = SAN_HE.find(group => group.includes(zhi));
        return sh ? sh.filter(z => z !== zhi) : [];
      case 'chong':
        const lc = LIU_CHONG.find(pair => pair.includes(zhi));
        return lc ? lc.filter(z => z !== zhi) : [];
      default:
        return [];
    }
  };

  const relatedZhis = selectedZhi ? getRelatedZhis(selectedZhi) : [];
  const selectedData = selectedZhi ? dizhiData.find(d => d.name === selectedZhi) : null;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-bazi-gold mb-2">十二地支探索器</h2>
        <p className="text-gray-400">点击地支查看藏干、特性及相互关系</p>
      </div>

      {/* Relation Mode Toggle */}
      <div className="flex justify-center gap-3 flex-wrap">
        {[
          { key: null, label: '查看藏干', icon: Circle },
          { key: 'liuhe', label: '六合', icon: ArrowRightLeft },
          { key: 'sanhe', label: '三合', icon: GitBranch },
          { key: 'chong', label: '六冲', icon: ArrowRightLeft },
        ].map(mode => (
          <button
            key={mode.key || 'default'}
            onClick={() => { setRelationMode(relationMode === mode.key ? null : mode.key); }}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
              relationMode === mode.key
                ? 'bg-bazi-gold text-bazi-dark'
                : 'bg-bazi-card text-gray-400 border border-gray-700 hover:border-gray-500'
            }`}
          >
            <mode.icon size={16} />
            {mode.label}
          </button>
        ))}
      </div>

      {/* 12 Zhi Circle Layout */}
      <div className="relative w-72 h-72 mx-auto">
        {DI_ZHI.map((zhi, idx) => {
          const angle = (idx * 30 - 90) * (Math.PI / 180);
          const x = Math.cos(angle) * 120 + 144;
          const y = Math.sin(angle) * 120 + 144;
          const isSelected = selectedZhi === zhi;
          const isRelated = relatedZhis.includes(zhi);
          const wuxing = DZ_WU_XING[zhi];

          return (
            <button
              key={zhi}
              onClick={() => handleSelect(zhi)}
              className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full text-lg font-serif font-bold flex items-center justify-center transition-all duration-300 ${
                isSelected
                  ? 'ring-4 ring-white scale-125 z-10'
                  : isRelated
                    ? 'scale-110 opacity-100 ring-2 ring-bazi-gold'
                    : selectedZhi
                      ? 'opacity-40'
                      : 'hover:scale-110'
              }`}
              style={{
                left: x,
                top: y,
                backgroundColor: WX_COLOR[wuxing],
                boxShadow: isSelected ? `0 0 25px ${WX_COLOR[wuxing]}` : 'none'
              }}
            >
              {zhi}
            </button>
          );
        })}

        {/* Center info */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-bazi-card border-2 border-bazi-gold/30 flex items-center justify-center">
            <span className="text-bazi-gold font-serif font-bold text-sm text-center">
              {selectedZhi || '地支'}
            </span>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedData && (
        <div className="bg-bazi-card rounded-xl p-6 border border-bazi-gold/20 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-serif font-bold"
              style={{ backgroundColor: WX_COLOR[selectedData.wuxing] }}
            >
              {selectedData.name}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {selectedData.name} - {selectedData.wuxing}{selectedData.yinyang}
              </h3>
              <p className="text-gray-400 text-sm">{selectedData.teshu}</p>
            </div>
          </div>

          {/* 藏干 */}
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">藏干（由强到弱）</p>
            <div className="flex gap-3">
              {selectedData.canggan && selectedData.canggan.split('、').map((gan, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{ backgroundColor: WX_COLOR[TG_WU_XING[gan]] }}
                  >
                    {gan}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    {i === 0 ? '本气' : i === 1 ? '中气' : '余气'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 关系 */}
          <div className="grid grid-cols-3 gap-3">
            {selectedData.liuhe && (
              <div className="bg-bazi-dark rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">六合</p>
                <p className="text-white font-medium">{selectedData.liuhe}</p>
              </div>
            )}
            {selectedData.sanhe && (
              <div className="bg-bazi-dark rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">三合</p>
                <p className="text-white font-medium">{selectedData.sanhe}</p>
              </div>
            )}
            {selectedData.liuchong && (
              <div className="bg-bazi-dark rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">六冲</p>
                <p className="text-red-400 font-medium">{selectedData.liuchong}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-bazi-card rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-bold text-bazi-gold mb-3">地支理解要点</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• <strong className="text-white">藏干</strong>：每个地支中隐藏着1-3个天干，代表内在的力量层次</li>
          <li>• <strong className="text-white">六合</strong>：两两地支相合，有合作、和合之意</li>
          <li>• <strong className="text-white">三合</strong>：三个地支合成一局，力量强大（如申子辰合水局）</li>
          <li>• <strong className="text-white">六冲</strong>：两两地支相冲，有冲突、变动之意</li>
        </ul>
      </div>
    </div>
  );
}
