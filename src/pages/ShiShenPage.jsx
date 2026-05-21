import { useState } from 'react';
import { TIAN_GAN, getShiShen, TG_WU_XING, TG_YIN_YANG, WX_COLOR } from '../utils/bazi';
import shishenData from '../data/shishen.json';
import { Users, ArrowRight } from 'lucide-react';

export default function ShiShenPage() {
  const [riGan, setRiGan] = useState('癸');
  const [selectedShiShen, setSelectedShiShen] = useState(null);

  const shishenList = TIAN_GAN.map(gan => ({
    gan,
    ...getShiShen(riGan, gan)
  }));

  const riGanWuxing = TG_WU_XING[riGan];
  const riGanYinyang = TG_YIN_YANG[riGan];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-bazi-accent mb-2">十神关系计算器</h2>
        <p className="text-bazi-text-muted">选择日干，查看其他天干与你的十神关系</p>
      </div>

      {/* Ri Gan Selector */}
      <div className="bg-bazi-card rounded-xl p-6 border border-bazi-accent/20">
        <div className="flex flex-col items-center gap-4">
          <p className="text-bazi-text-muted">选择日干（代表"我"）</p>
          <div className="flex gap-2 flex-wrap justify-center">
            {TIAN_GAN.map(gan => (
              <button
                key={gan}
                onClick={() => { setRiGan(gan); setSelectedShiShen(null); }}
                className={`w-12 h-12 rounded-full text-xl font-serif font-bold transition-all ${
                  riGan === gan
                    ? 'ring-4 ring-bazi-accent scale-110'
                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: WX_COLOR[TG_WU_XING[gan]] }}
              >
                {gan}
              </button>
            ))}
          </div>
          <div className="text-center">
            <span className="text-2xl font-serif font-bold" style={{ color: WX_COLOR[riGanWuxing] }}>
              {riGan}
            </span>
            <span className="text-bazi-text-muted ml-2">{riGanWuxing}{riGanYinyang} · 日干</span>
          </div>
        </div>
      </div>

      {/* Relation Graph */}
      <div className="bg-bazi-card rounded-xl p-6 border border-bazi-accent/20">
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {shishenList.map(({ gan, name, relation, zhengPian }) => {
            const isRiGan = gan === riGan;
            const wuxing = TG_WU_XING[gan];
            const ssInfo = shishenData.find(s => s.name === name);

            return (
              <button
                key={gan}
                onClick={() => !isRiGan && setSelectedShiShen({ gan, name, relation, zhengPian, wuxing })}
                className={`relative flex flex-col items-center p-3 rounded-lg transition-all ${
                  isRiGan
                    ? 'bg-bazi-accent text-bazi-text ring-2 ring-bazi-accent'
                    : selectedShiShen?.gan === gan
                      ? 'bg-bazi-surface ring-2 ring-bazi-accent'
                      : 'bg-bazi-surface hover:bg-bazi-surface'
                }`}
              >
                <span 
                  className="text-2xl font-serif font-bold mb-1"
                  style={{ color: isRiGan ? undefined : WX_COLOR[wuxing] }}
                >
                  {gan}
                </span>
                <span className={`text-xs ${isRiGan ? 'text-bazi-text/70' : 'text-bazi-text-muted'}`}>
                  {isRiGan ? '日干' : name}
                </span>
                {!isRiGan && (
                  <span className={`text-xs mt-1 ${zhengPian === '正' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                    {relation}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Detail */}
      {selectedShiShen && (
        <div className="bg-bazi-card rounded-xl p-6 border border-bazi-accent/30 animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-serif font-bold"
              style={{ backgroundColor: WX_COLOR[selectedShiShen.wuxing] }}
            >
              {selectedShiShen.gan}
            </div>
            <div>
              <h3 className="text-xl font-bold text-bazi-accent">
                {selectedShiShen.name}
              </h3>
              <p className="text-bazi-text-muted">
                {selectedShiShen.relation} · {selectedShiShen.zhengPian}（{selectedShiShen.zhengPian === '正' ? '有情' : '无情'}）
              </p>
            </div>
          </div>

          {(() => {
            const info = shishenData.find(s => s.name === selectedShiShen.name);
            if (!info) return null;

            return (
              <div className="space-y-3">
                {info.leixiang && (
                  <div className="bg-bazi-surface rounded-lg p-3">
                    <p className="text-xs text-bazi-text-muted">类象</p>
                    <p className="text-bazi-text">{info.leixiang}</p>
                  </div>
                )}
                {info.xingge && (
                  <div className="bg-bazi-surface rounded-lg p-3">
                    <p className="text-xs text-bazi-text-muted">性格特征</p>
                    <p className="text-bazi-text">{info.xingge}</p>
                  </div>
                )}
                {info.jixiong && (
                  <div className="bg-bazi-surface rounded-lg p-3">
                    <p className="text-xs text-bazi-text-muted">吉凶表现</p>
                    <p className="text-bazi-text">{info.jixiong}</p>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Understanding Table */}
      <div className="bg-bazi-card rounded-xl p-6 border border-bazi-border">
        <h3 className="text-lg font-bold text-bazi-accent mb-4">十神关系速查表</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-bazi-text-muted border-b border-bazi-border">
                <th className="text-center py-2">关系</th>
                <th className="text-center py-2">正（异性/有情）</th>
                <th className="text-center py-2">偏（同性/无情）</th>
                <th className="text-center py-2">类象</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rel: '生我', zheng: '正印', pian: '偏印', lx: '母亲、贵人、学问' },
                { rel: '克我', zheng: '正官', pian: '七杀', lx: '领导、法律、压力' },
                { rel: '我克', zheng: '正财', pian: '偏财', lx: '金钱、妻子、资源' },
                { rel: '我生', zheng: '伤官', pian: '食神', lx: '才华、子女、表达' },
                { rel: '同我', zheng: '劫财', pian: '比肩', lx: '兄弟、朋友、竞争' },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-bazi-border hover:bg-bazi-surface">
                  <td className="py-3 text-center text-bazi-accent">{row.rel}</td>
                  <td className="py-3 text-center text-green-600 dark:text-green-400">{row.zheng}</td>
                  <td className="py-3 text-center text-orange-600 dark:text-orange-400">{row.pian}</td>
                  <td className="py-3 text-center text-bazi-text-muted">{row.lx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
