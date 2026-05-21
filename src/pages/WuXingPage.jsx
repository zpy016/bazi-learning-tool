import { useState } from 'react';
import { WX_SHENG, WX_KE, WX_COLOR } from '../utils/bazi';
import { ArrowRight, Info } from 'lucide-react';

const WU_XING_LIST = ['木', '火', '土', '金', '水'];

const WU_XING_DETAILS = {
  '木': {
    yinyang: '甲乙',
    season: '春',
    direction: '东',
    color: '青/绿',
    organ: '肝/胆',
    emotion: '怒',
    desc: '木曰曲直，能屈能伸，主生发、条达。',
    nature: '树木、花草、藤蔓',
    character: '仁慈、正直、有恻隐之心'
  },
  '火': {
    yinyang: '丙丁',
    season: '夏',
    direction: '南',
    color: '红',
    organ: '心/小肠',
    emotion: '喜',
    desc: '火曰炎上，热情向上，主温热、升腾。',
    nature: '太阳、火焰、光明',
    character: '热情、急躁、有礼貌'
  },
  '土': {
    yinyang: '戊己',
    season: '四季末',
    direction: '中',
    color: '黄',
    organ: '脾/胃',
    emotion: '思',
    desc: '土曰稼穑，承载万物，主生化、受纳。',
    nature: '大地、山丘、田园',
    character: '诚信、稳重、有包容心'
  },
  '金': {
    yinyang: '庚辛',
    season: '秋',
    direction: '西',
    color: '白',
    organ: '肺/大肠',
    emotion: '忧',
    desc: '金曰从革，刚柔并济，主肃杀、收敛。',
    nature: '金属、矿石、刀剑',
    character: '果断、刚强、有义气'
  },
  '水': {
    yinyang: '壬癸',
    season: '冬',
    direction: '北',
    color: '黑/蓝',
    organ: '肾/膀胱',
    emotion: '恐',
    desc: '水曰润下，滋润下行，主寒凉、闭藏。',
    nature: '江河、湖泊、雨露',
    character: '智慧、灵活、有谋略'
  }
};

export default function WuXingPage() {
  const [selected, setSelected] = useState(null);
  const [showRelation, setShowRelation] = useState('sheng'); // 'sheng' or 'ke'

  const handleSelect = (wx) => {
    setSelected(selected === wx ? null : wx);
  };

  // 计算关系
  const getRelations = (wx) => {
    if (showRelation === 'sheng') {
      return {
        shengWo: WU_XING_LIST.find(w => WX_SHENG[w] === wx),
        woSheng: WX_SHENG[wx],
      };
    } else {
      return {
        keWo: WU_XING_LIST.find(w => WX_KE[w] === wx),
        woKe: WX_KE[wx],
      };
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-bazi-accent mb-2">五行生克互动图</h2>
        <p className="text-bazi-text-muted">点击五行元素，探索相生相克关系</p>
      </div>

      {/* Relation Toggle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setShowRelation('sheng')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            showRelation === 'sheng'
              ? 'bg-green-600 text-bazi-text'
              : 'bg-bazi-card text-bazi-text-muted border border-bazi-border'
          }`}
        >
          相生关系
        </button>
        <button
          onClick={() => setShowRelation('ke')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            showRelation === 'ke'
              ? 'bg-red-600 text-bazi-text'
              : 'bg-bazi-card text-bazi-text-muted border border-bazi-border'
          }`}
        >
          相克关系
        </button>
      </div>

      {/* Five Elements Ring */}
      <div className="relative w-80 h-80 mx-auto">
        {/* Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-bazi-card border-2 border-bazi-accent flex items-center justify-center">
            <span className="text-bazi-accent font-serif font-bold">
              {selected || '?'}
            </span>
          </div>
        </div>

        {/* Five elements positioned in a circle */}
        {WU_XING_LIST.map((wx, idx) => {
          const angle = (idx * 72 - 90) * (Math.PI / 180);
          const x = Math.cos(angle) * 140 + 160;
          const y = Math.sin(angle) * 140 + 160;
          const isSelected = selected === wx;
          const relations = selected ? getRelations(selected) : {};
          const isRelated = selected && (
            wx === selected ||
            wx === relations.shengWo || wx === relations.woSheng ||
            wx === relations.keWo || wx === relations.woKe
          );

          return (
            <button
              key={wx}
              onClick={() => handleSelect(wx)}
              className={`absolute w-16 h-16 -ml-8 -mt-8 rounded-full text-xl font-serif font-bold flex items-center justify-center transition-all duration-300 ${
                isSelected
                  ? 'ring-4 ring-white scale-125 z-10'
                  : isRelated
                    ? 'scale-110 opacity-100'
                    : selected
                      ? 'opacity-30'
                      : 'hover:scale-110'
              }`}
              style={{
                left: x,
                top: y,
                backgroundColor: WX_COLOR[wx],
                color: '#fff',
                boxShadow: isSelected ? `0 0 30px ${WX_COLOR[wx]}` : 'none'
              }}
            >
              {wx}
            </button>
          );
        })}

        {/* Connection arrows */}
        {selected && (() => {
          const rels = getRelations(selected);
          const idx = WU_XING_LIST.indexOf(selected);
          const angle = (idx * 72 - 90) * (Math.PI / 180);
          const x1 = Math.cos(angle) * 140 + 160;
          const y1 = Math.sin(angle) * 140 + 160;

          return (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
              {rels.shengWo && (() => {
                const sIdx = WU_XING_LIST.indexOf(rels.shengWo);
                const sAngle = (sIdx * 72 - 90) * (Math.PI / 180);
                const x2 = Math.cos(sAngle) * 140 + 160;
                const y2 = Math.sin(sAngle) * 140 + 160;
                return (
                  <line x1={x2} y1={y2} x2={x1} y2={y1} stroke="var(--wx-wood)" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowGreen)" />
                );
              })()}
              {rels.woSheng && (() => {
                const sIdx = WU_XING_LIST.indexOf(rels.woSheng);
                const sAngle = (sIdx * 72 - 90) * (Math.PI / 180);
                const x2 = Math.cos(sAngle) * 140 + 160;
                const y2 = Math.sin(sAngle) * 140 + 160;
                return (
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--wx-wood)" strokeWidth="3" markerEnd="url(#arrowGreen)" />
                );
              })()}
              {rels.keWo && (() => {
                const sIdx = WU_XING_LIST.indexOf(rels.keWo);
                const sAngle = (sIdx * 72 - 90) * (Math.PI / 180);
                const x2 = Math.cos(sAngle) * 140 + 160;
                const y2 = Math.sin(sAngle) * 140 + 160;
                return (
                  <line x1={x2} y1={y2} x2={x1} y2={y1} stroke="var(--wx-fire)" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowRed)" />
                );
              })()}
              {rels.woKe && (() => {
                const sIdx = WU_XING_LIST.indexOf(rels.woKe);
                const sAngle = (sIdx * 72 - 90) * (Math.PI / 180);
                const x2 = Math.cos(sAngle) * 140 + 160;
                const y2 = Math.sin(sAngle) * 140 + 160;
                return (
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--wx-fire)" strokeWidth="3" markerEnd="url(#arrowRed)" />
                );
              })()}
              <defs>
                <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="var(--wx-wood)" />
                </marker>
                <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="var(--wx-fire)" />
                </marker>
              </defs>
            </svg>
          );
        })()}
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="bg-bazi-card rounded-xl p-6 border border-bazi-accent/20 shadow-sm animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-serif font-bold"
              style={{ backgroundColor: WX_COLOR[selected] }}
            >
              {selected}
            </div>
            <div>
              <h3 className="text-xl font-bold text-bazi-text">{selected}行详解</h3>
              <p className="text-bazi-text-muted">{WU_XING_DETAILS[selected].desc}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { label: '天干', value: WU_XING_DETAILS[selected].yinyang },
              { label: '季节', value: WU_XING_DETAILS[selected].season },
              { label: '方位', value: WU_XING_DETAILS[selected].direction },
              { label: '颜色', value: WU_XING_DETAILS[selected].color },
              { label: '脏腑', value: WU_XING_DETAILS[selected].organ },
              { label: '情志', value: WU_XING_DETAILS[selected].emotion },
            ].map((item, idx) => (
              <div key={idx} className="bg-bazi-surface rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="text-sm font-medium text-bazi-text">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-bazi-surface rounded-lg p-4">
              <p className="text-sm text-bazi-text-muted mb-1">自然类象</p>
              <p className="text-bazi-text">{WU_XING_DETAILS[selected].nature}</p>
            </div>
            <div className="bg-bazi-surface rounded-lg p-4">
              <p className="text-sm text-bazi-text-muted mb-1">性格特征</p>
              <p className="text-bazi-text">{WU_XING_DETAILS[selected].character}</p>
            </div>
          </div>
        </div>
      )}

      {/* You Qing / Wu Qing */}
      {selected && (
        <div className="bg-bazi-card rounded-xl p-6 border border-bazi-border shadow-sm">
          <h3 className="text-lg font-bold text-bazi-accent mb-4">"有情"与"无情"</h3>
          <p className="text-sm text-bazi-text-muted mb-4">
            课程中强调：五行生克有"有情"与"无情"之分，这是理解十神"正"与"偏"的关键。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 dark:bg-green-900/20 rounded-lg p-4 border border-green-500/30">
              <p className="text-green-600 dark:text-green-400 font-medium mb-2">异性相生 → 有情（正印）</p>
              <p className="text-sm text-bazi-text-secondary">
                甲木（阳）生丁火（阴）：大块木头生火，连绵持久，力量温和有情。
              </p>
            </div>
            <div className="bg-orange-500/10 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-500/30">
              <p className="text-orange-600 dark:text-orange-400 font-medium mb-2">同性相生 → 无情（偏印）</p>
              <p className="text-sm text-bazi-text-secondary">
                乙木（阴）生丁火（阴）：一堆稻草生火，力量有限，有始无终。
              </p>
            </div>
            <div className="bg-red-500/10 dark:bg-red-900/20 rounded-lg p-4 border border-red-500/30">
              <p className="text-red-600 dark:text-red-400 font-medium mb-2">同性相克 → 无情（七杀）</p>
              <p className="text-sm text-bazi-text-secondary">
                庚金（阳）克甲木（阳）：斧头砍大树，力量猛烈，直接无情。
              </p>
            </div>
            <div className="bg-blue-500/10 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">异性相克 → 有情（正官）</p>
              <p className="text-sm text-bazi-text-secondary">
                辛金（阴）克甲木（阳）：小剪刀修剪树木，力量温和，有情有制。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Memory Aid */}
      <div className="bg-bazi-card rounded-xl p-6 border border-bazi-border">
        <h3 className="text-lg font-bold text-bazi-accent mb-4 flex items-center gap-2">
          <Info size={20} />
          理解记忆法
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-green-600 dark:text-green-400 font-medium mb-1">相生（母子关系）</p>
            <p className="text-bazi-text-muted">木生火（木头烧火）→ 火生土（火烬成灰）→ 土生金（矿藏出土）→ 金生水（金属化水）→ 水生木（水养树木）</p>
          </div>
          <div>
            <p className="text-red-600 dark:text-red-400 font-medium mb-1">相克（制约关系）</p>
            <p className="text-bazi-text-muted">木克土（树木破土）→ 土克水（堤坝拦水）→ 水克火（水灭火势）→ 火克金（火炼金属）→ 金克木（斧头砍树）</p>
          </div>
        </div>
      </div>
    </div>
  );
}
