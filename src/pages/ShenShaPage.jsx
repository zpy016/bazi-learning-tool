import { useState } from 'react';
import { TIAN_GAN, DI_ZHI, getTianYiGuiRen, getTianDeGuiRen, getYueDeGuiRen, getTaoHua, getYiMa, getWenChang, TG_WU_XING, WX_COLOR } from '../utils/bazi';
import { Shield, Star, Heart, Zap, BookOpen } from 'lucide-react';

export default function ShenShaPage() {
  const [nianGan, setNianGan] = useState('甲');
  const [riGan, setRiGan] = useState('丙');
  const [yueZhi, setYueZhi] = useState('寅');
  const [riZhi, setRiZhi] = useState('午');

  const tianYi = getTianYiGuiRen(riGan);
  const tianDe = getTianDeGuiRen(yueZhi);
  const yueDe = getYueDeGuiRen(yueZhi);
  const taoHua = getTaoHua(riZhi);
  const yiMa = getYiMa(riZhi);
  const wenChang = getWenChang(riGan);

  const shenShaResults = [
    {
      name: '天乙贵人',
      icon: Star,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      result: tianYi.join('、'),
      desc: '后天际遇中的提携、解危之吉神。主荣名早达，成事多助。',
      koujue: '甲戊庚牛羊，乙己鼠猴乡。丙丁猪鸡位，壬癸蛇兔藏。六辛逢马虎，此是贵人方。'
    },
    {
      name: '天德贵人',
      icon: Shield,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      result: tianDe,
      desc: '上天有好生之德！逢凶化吉，有惊无险的守护力量。',
      koujue: '以月支查天干'
    },
    {
      name: '月德贵人',
      icon: Shield,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      result: yueDe,
      desc: '月亮的阴德，温和护佑。和天德一起出现时力量更强。',
      koujue: '寅午戌月丙，申子辰月壬，亥卯未月甲，巳酉丑月庚'
    },
    {
      name: '桃花',
      icon: Heart,
      color: 'text-pink-400',
      bgColor: 'bg-pink-400/10',
      result: taoHua,
      desc: '人缘、魅力、感情缘分的象征。桃花为喜则美貌聪慧，为忌则感情纠葛。',
      koujue: '申子辰在酉，寅午戌在卯，亥卯未在子，巳酉丑在午'
    },
    {
      name: '驿马',
      icon: Zap,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      result: yiMa,
      desc: '变动、远行、奔波的象征。驿马逢冲则动得更加厉害。',
      koujue: '申子辰马在寅，寅午戌马在申，亥卯未马在巳，巳酉丑马在亥'
    },
    {
      name: '文昌贵人',
      icon: BookOpen,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      result: wenChang,
      desc: '聪明好学，才华出众的象征。利于考试、学习、文化事业。',
      koujue: '甲乙巳午，丙戊申猴，丁己鸡酉，庚猪辛鼠，壬癸虎卯'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-bazi-gold mb-2">神煞速查工具</h2>
        <p className="text-gray-400">输入八字信息，快速查询命局中的神煞</p>
      </div>

      {/* Input Panel */}
      <div className="bg-bazi-card rounded-xl p-6 border border-bazi-gold/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">年干</label>
            <select
              value={nianGan}
              onChange={(e) => setNianGan(e.target.value)}
              className="w-full px-3 py-2 bg-bazi-dark rounded-lg border border-gray-700 text-white focus:border-bazi-gold focus:outline-none"
            >
              {TIAN_GAN.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">日干</label>
            <select
              value={riGan}
              onChange={(e) => setRiGan(e.target.value)}
              className="w-full px-3 py-2 bg-bazi-dark rounded-lg border border-gray-700 text-white focus:border-bazi-gold focus:outline-none"
            >
              {TIAN_GAN.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">月支</label>
            <select
              value={yueZhi}
              onChange={(e) => setYueZhi(e.target.value)}
              className="w-full px-3 py-2 bg-bazi-dark rounded-lg border border-gray-700 text-white focus:border-bazi-gold focus:outline-none"
            >
              {DI_ZHI.map(z => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">日支</label>
            <select
              value={riZhi}
              onChange={(e) => setRiZhi(e.target.value)}
              className="w-full px-3 py-2 bg-bazi-dark rounded-lg border border-gray-700 text-white focus:border-bazi-gold focus:outline-none"
            >
              {DI_ZHI.map(z => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shenShaResults.map((ss, idx) => {
          const Icon = ss.icon;
          return (
            <div key={idx} className={`bg-bazi-card rounded-xl p-5 border border-gray-700/50 hover:border-bazi-gold/30 transition-all`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${ss.bgColor}`}>
                  <Icon className={ss.color} size={20} />
                </div>
                <h3 className="font-bold text-white">{ss.name}</h3>
              </div>
              
              <div className="mb-3">
                <span className={`text-2xl font-serif font-bold ${ss.color}`}>
                  {ss.result || '无'}
                </span>
              </div>

              <p className="text-sm text-gray-400 mb-2">{ss.desc}</p>
              
              <div className="bg-bazi-dark rounded-lg p-2">
                <p className="text-xs text-gray-500">口诀</p>
                <p className="text-xs text-bazi-gold font-serif">{ss.koujue}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note */}
      <div className="bg-bazi-card rounded-xl p-6 border border-gray-700/50">
        <p className="text-sm text-gray-400">
          <strong className="text-bazi-gold">提示：</strong>
          神煞是八字命理的辅助工具，类似于星座中的"吉星""凶星"。在八字论断中，
          <strong className="text-white">五行喜忌为主，十神为辅，神煞为参考</strong>。
          不可本末倒置。天德月德贵人力量最大，天乙贵人次之。
        </p>
      </div>
    </div>
  );
}
