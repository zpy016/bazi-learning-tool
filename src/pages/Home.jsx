import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getBaziFromDate, TG_WU_XING, TG_YIN_YANG, DZ_WU_XING, DZ_YIN_YANG, DZ_CANG_GAN, getShiShen, WX_COLOR } from '../utils/bazi';
import { Calendar, Clock, Info, ArrowRight, Flame, Wind, Mountain, Users, Shield, Sparkles, BookOpen, Scale } from 'lucide-react';
import casesData from '../data/cases.json';

const quickLinks = [
  { path: '/wuxing', label: '五行生克', icon: Flame, color: 'from-red-900/40 to-orange-900/40', desc: '探索相生相克关系' },
  { path: '/tiangan', label: '十天干', icon: Wind, color: 'from-green-900/40 to-emerald-900/40', desc: '翻转卡片学天干' },
  { path: '/dizhi', label: '十二地支', icon: Mountain, color: 'from-yellow-900/40 to-amber-900/40', desc: '藏干与合冲关系' },
  { path: '/shishen', label: '十神关系', icon: Users, color: 'from-blue-900/40 to-cyan-900/40', desc: '以日干为中心的关系网' },
  { path: '/shenqiang', label: '身强身弱', icon: Scale, color: 'from-purple-900/40 to-violet-900/40', desc: '三步判断法练习' },
  { path: '/shensha', label: '神煞速查', icon: Shield, color: 'from-pink-900/40 to-rose-900/40', desc: '贵人桃花驿马查询' },
  { path: '/tiaohou', label: '调候用神', icon: Sparkles, color: 'from-teal-900/40 to-emerald-900/40', desc: '寒暖燥湿调节' },
  { path: '/geju', label: '格局识别', icon: BookOpen, color: 'from-indigo-900/40 to-blue-900/40', desc: '八字格局练习' },
];

export default function Home() {
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(5);
  const [day, setDay] = useState(15);
  const [hour, setHour] = useState(12);
  const [bazi, setBazi] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);

  const handlePaiPan = () => {
    const result = getBaziFromDate(year, month, day, hour);
    setBazi(result);
    setSelectedCell(null);
  };

  const pillars = bazi ? [
    { label: '年柱', gan: bazi.year.gan, zhi: bazi.year.zhi },
    { label: '月柱', gan: bazi.month.gan, zhi: bazi.month.zhi },
    { label: '日柱', gan: bazi.day.gan, zhi: bazi.day.zhi, isDay: true },
    { label: '时柱', gan: bazi.hour.gan, zhi: bazi.hour.zhi },
  ] : [];

  const getCellInfo = (type, char) => {
    if (type === 'gan') {
      return {
        title: `${char} - ${TG_WU_XING[char]}${TG_YIN_YANG[char]}`,
        wuxing: TG_WU_XING[char],
        yinyang: TG_YIN_YANG[char],
        isGan: true
      };
    } else {
      const cangGan = DZ_CANG_GAN[char];
      return {
        title: `${char} - ${DZ_WU_XING[char]}${DZ_YIN_YANG[char]}`,
        wuxing: DZ_WU_XING[char],
        yinyang: DZ_YIN_YANG[char],
        cangGan,
        isGan: false
      };
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-bazi-gold mb-3">
          八字命理学习平台
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          通过互动式工具理解八字命理的核心知识，从五行生克到格局识别，循序渐进掌握命理精髓
        </p>
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((link, idx) => {
          const Icon = link.icon;
          return (
            <Link
              key={idx}
              to={link.path}
              className={`group bg-gradient-to-br ${link.color} rounded-xl p-5 border border-gray-700/50 hover:border-bazi-gold/50 transition-all hover:scale-105`}
            >
              <Icon className="text-bazi-gold mb-3 group-hover:scale-110 transition-transform" size={28} />
              <h3 className="font-bold text-white mb-1">{link.label}</h3>
              <p className="text-xs text-gray-400">{link.desc}</p>
              <ArrowRight className="text-gray-600 mt-2 group-hover:text-bazi-gold group-hover:translate-x-1 transition-all" size={16} />
            </Link>
          );
        })}
      </div>

      {/* Bazi Pai Pan Section */}
      <div className="bg-bazi-card rounded-xl p-6 border border-bazi-gold/20">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="text-bazi-gold" size={24} />
          <h2 className="text-2xl font-serif font-bold text-white">八字排盘</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">年</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full px-4 py-3 bg-bazi-dark rounded-lg border border-gray-700 text-white focus:border-bazi-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">月</label>
            <input
              type="number"
              min={1}
              max={12}
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full px-4 py-3 bg-bazi-dark rounded-lg border border-gray-700 text-white focus:border-bazi-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">日</label>
            <input
              type="number"
              min={1}
              max={31}
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="w-full px-4 py-3 bg-bazi-dark rounded-lg border border-gray-700 text-white focus:border-bazi-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">时</label>
            <input
              type="number"
              min={0}
              max={23}
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              className="w-full px-4 py-3 bg-bazi-dark rounded-lg border border-gray-700 text-white focus:border-bazi-gold focus:outline-none"
            />
          </div>
        </div>
        <button
          onClick={handlePaiPan}
          className="mt-6 w-full py-3 bg-gradient-to-r from-bazi-gold to-yellow-600 text-bazi-dark font-bold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all"
        >
          开始排盘
        </button>
      </div>

      {/* Bazi Display */}
      {bazi && (
        <div className="space-y-6">
          <div className="bg-bazi-card rounded-xl p-6 border border-bazi-gold/20">
            <div className="grid grid-cols-4 gap-4">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-sm text-gray-400 mb-3">{pillar.label}</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCell({ type: 'gan', char: pillar.gan, pillar: pillar.label })}
                      className={`w-16 h-16 mx-auto rounded-lg text-2xl font-serif font-bold flex items-center justify-center transition-all hover:scale-110 ${
                        pillar.isDay 
                          ? 'bg-bazi-gold text-bazi-dark ring-2 ring-bazi-gold glow-effect' 
                          : 'bg-bazi-dark border border-gray-700 hover:border-bazi-gold'
                      }`}
                      style={{ color: pillar.isDay ? undefined : WX_COLOR[TG_WU_XING[pillar.gan]] }}
                    >
                      {pillar.gan}
                    </button>
                    <button
                      onClick={() => setSelectedCell({ type: 'zhi', char: pillar.zhi, pillar: pillar.label })}
                      className={`w-16 h-16 mx-auto rounded-lg text-2xl font-serif font-bold flex items-center justify-center transition-all hover:scale-110 ${
                        pillar.isDay 
                          ? 'bg-bazi-gold/30 text-bazi-gold border border-bazi-gold' 
                          : 'bg-bazi-dark border border-gray-700 hover:border-bazi-gold'
                      }`}
                      style={{ color: pillar.isDay ? undefined : WX_COLOR[DZ_WU_XING[pillar.zhi]] }}
                    >
                      {pillar.zhi}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              点击任意字查看详细信息 · 日柱为命主（高亮显示）
            </p>
          </div>

          {/* Detail Panel */}
          {selectedCell && (
            <div className="bg-bazi-card rounded-xl p-6 border border-bazi-gold/30 animate-fade-in">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-bazi-gold">
                    {selectedCell.pillar} · {selectedCell.char}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {selectedCell.type === 'gan' ? '天干' : '地支'}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCell(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {(() => {
                const info = getCellInfo(selectedCell.type, selectedCell.char);
                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-bazi-dark rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-400">五行</p>
                        <p className="text-lg font-bold" style={{ color: WX_COLOR[info.wuxing] }}>
                          {info.wuxing}
                        </p>
                      </div>
                      <div className="bg-bazi-dark rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-400">阴阳</p>
                        <p className={`text-lg font-bold ${info.yinyang === '阳' ? 'text-orange-400' : 'text-purple-400'}`}>
                          {info.yinyang}
                        </p>
                      </div>
                      <div className="bg-bazi-dark rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-400">十神（对日干）</p>
                        <p className="text-lg font-bold text-bazi-gold">
                          {bazi ? getShiShen(bazi.day.gan, selectedCell.char).name : '-'}
                        </p>
                      </div>
                    </div>

                    {!info.isGan && info.cangGan && (
                      <div className="bg-bazi-dark rounded-lg p-4">
                        <p className="text-sm text-gray-400 mb-2">藏干</p>
                        <div className="flex gap-3">
                          {info.cangGan.map((g, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full text-sm font-bold"
                              style={{ 
                                backgroundColor: `${WX_COLOR[TG_WU_XING[g]]}20`,
                                color: WX_COLOR[TG_WU_XING[g]]
                              }}
                            >
                              {g}({TG_WU_XING[g]})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* Famous Cases */}
      <div className="bg-bazi-card rounded-xl p-6 border border-gray-700/50">
        <h2 className="text-xl font-serif font-bold text-bazi-gold mb-4">名人案例</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {casesData.slice(0, 3).map((c, idx) => (
            <div key={idx} className="bg-bazi-dark rounded-lg p-4 border border-gray-700/50">
              <h3 className="font-bold text-white mb-2">{c.name}</h3>
              <p className="text-sm text-bazi-gold font-mono mb-2">
                {c.year} {c.month} {c.day}
              </p>
              <p className="text-xs text-gray-400 mb-2">{c.description}</p>
              <div className="flex gap-2 flex-wrap">
                {c.highlights.map((h, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-full bg-bazi-gold/20 text-bazi-gold">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      {!bazi && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Calendar, title: '四柱结构', desc: '年柱代表祖上，月柱代表父母，日柱代表自己，时柱代表子女' },
            { icon: Clock, title: '天干地支', desc: '天干是气，外露活跃；地支是质，内藏稳定。干透支藏结合看' },
            { icon: Info, title: '日干为命主', desc: '日柱的天干称为日干，代表命主本人，是八字分析的中心' },
          ].map((tip, idx) => (
            <div key={idx} className="bg-bazi-card rounded-xl p-5 border border-gray-700/50">
              <tip.icon className="text-bazi-gold mb-3" size={24} />
              <h4 className="font-bold text-white mb-1">{tip.title}</h4>
              <p className="text-sm text-gray-400">{tip.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
