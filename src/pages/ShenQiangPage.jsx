import { useState } from 'react';
import { TIAN_GAN, DI_ZHI, TG_WU_XING, DZ_WU_XING, DZ_CANG_GAN, TG_YIN_YANG, WX_SHENG, getShiShen, WX_COLOR } from '../utils/bazi';
import { Scale, ChevronRight, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

const PRACTICE_CASES = [
  {
    name: '案例一',
    riGan: '甲',
    yueZhi: '寅',
    riZhi: '寅',
    otherGans: ['丙', '戊'],
    otherZhis: ['午', '辰'],
    answer: '身强',
    explanation: '甲木生于寅月得令，日支寅木为强根，年支午火中藏己土但木气旺盛，整体身强。'
  },
  {
    name: '案例二',
    riGan: '丁',
    yueZhi: '亥',
    riZhi: '酉',
    otherGans: ['壬', '辛'],
    otherZhis: ['子', '丑'],
    answer: '身弱',
    explanation: '丁火生于亥月不得令（水克火），日支酉金耗火，周围多水金，火力不足，身弱。'
  },
  {
    name: '案例三',
    riGan: '戊',
    yueZhi: '午',
    riZhi: '辰',
    otherGans: ['丙', '丁'],
    otherZhis: ['巳', '未'],
    answer: '身强',
    explanation: '戊土生于午月得令（火生土），日支辰土为根，多火来生土，土气旺盛，身强。'
  }
];

export default function ShenQiangPage() {
  const [mode, setMode] = useState('learn'); // 'learn' or 'practice'
  const [currentCase, setCurrentCase] = useState(0);
  const [step, setStep] = useState(0); // 0: initial, 1: deLing, 2: deDi, 3: deShi, 4: result
  const [userAnswer, setUserAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const currentPractice = PRACTICE_CASES[currentCase];
  const riWuxing = TG_WU_XING[currentPractice.riGan];
  const yueWuxing = DZ_WU_XING[currentPractice.yueZhi];

  // 判断是否得令
  const isDeLing = yueWuxing === riWuxing || WX_SHENG[yueWuxing] === riWuxing;
  
  // 判断是否得地
  const riZhiCangGan = DZ_CANG_GAN[currentPractice.riZhi];
  const hasRootInRiZhi = riZhiCangGan.some(g => TG_WU_XING[g] === riWuxing);
  const hasRootInOthers = currentPractice.otherZhis.some(z => 
    DZ_CANG_GAN[z].some(g => TG_WU_XING[g] === riWuxing)
  );
  const isDeDi = hasRootInRiZhi || hasRootInOthers;

  // 判断是否得势
  let supportCount = 0;
  currentPractice.otherGans.forEach(g => {
    const ss = getShiShen(currentPractice.riGan, g);
    if (ss.name === '比肩' || ss.name === '劫财' || ss.name === '正印' || ss.name === '偏印') {
      supportCount++;
    }
  });
  const isDeShi = supportCount >= 2;

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleReset = () => {
    setStep(0);
    setUserAnswer(null);
    setShowResult(false);
  };

  const handleNextCase = () => {
    setCurrentCase((prev) => (prev + 1) % PRACTICE_CASES.length);
    handleReset();
  };

  const isCorrect = userAnswer === currentPractice.answer;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-bazi-gold mb-2">身强身弱判断</h2>
        <p className="text-gray-400">学习判断日干强弱的三个维度：得令、得地、得势</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setMode('learn')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            mode === 'learn' ? 'bg-bazi-gold text-bazi-dark' : 'bg-bazi-card text-gray-400 border border-gray-700'
          }`}
        >
          学习原理
        </button>
        <button
          onClick={() => setMode('practice')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            mode === 'practice' ? 'bg-bazi-gold text-bazi-dark' : 'bg-bazi-card text-gray-400 border border-gray-700'
          }`}
        >
          判断练习
        </button>
      </div>

      {mode === 'learn' ? (
        <>
          {/* Three Dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                title: '得令', 
                subtitle: '月令是否帮扶',
                desc: '日干五行与月支五行相同或月支生日干，则为得令。',
                example: '甲木生于寅月（寅属木）→ 得令',
                color: 'from-green-600/20 to-green-900/20',
                borderColor: 'border-green-500/30'
              },
              { 
                title: '得地', 
                subtitle: '地支是否有根',
                desc: '日支或地支藏干中有与日干同五行的天干，称为"有根"。',
                example: '日干甲木，日支寅（藏甲木）→ 得地',
                color: 'from-blue-600/20 to-blue-900/20',
                borderColor: 'border-blue-500/30'
              },
              { 
                title: '得势', 
                subtitle: '天干是否帮扶',
                desc: '其他天干中有比劫（同五行）或印星（生我者），则为得势。',
                example: '日干甲木，天干见甲乙或壬癸 → 得势',
                color: 'from-purple-600/20 to-purple-900/20',
                borderColor: 'border-purple-500/30'
              },
            ].map((dim, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${dim.color} rounded-xl p-6 border ${dim.borderColor}`}>
                <h3 className="text-xl font-bold text-white mb-1">{dim.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{dim.subtitle}</p>
                <p className="text-sm text-gray-300 mb-3">{dim.desc}</p>
                <div className="bg-bazi-dark/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">示例</p>
                  <p className="text-sm text-bazi-gold">{dim.example}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-bazi-card rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-bold text-bazi-gold mb-3">判断标准</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <p className="text-gray-300"><strong>身强</strong>：得令 + 得地 + 得势（三者占其二以上）</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <p className="text-gray-300"><strong>中和</strong>：得令、得地、得势各占其一</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <p className="text-gray-300"><strong>身弱</strong>：三者中帮扶较少，克泄耗较多</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Practice */}
          <div className="bg-bazi-card rounded-xl p-6 border border-bazi-gold/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">{currentPractice.name}</h3>
              <div className="flex gap-2">
                <button onClick={handleReset} className="p-2 text-gray-400 hover:text-white">
                  <RotateCcw size={18} />
                </button>
                <button
                  onClick={handleNextCase}
                  className="px-3 py-1 bg-bazi-dark rounded-lg text-sm text-bazi-gold hover:bg-bazi-gold/20"
                >
                  下一题
                </button>
              </div>
            </div>

            {/* Bazi Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 bg-bazi-dark rounded-lg p-4">
              <div className="text-center">
                <p className="text-xs text-gray-500">日干</p>
                <p className="text-2xl font-serif font-bold" style={{ color: WX_COLOR[riWuxing] }}>
                  {currentPractice.riGan}
                </p>
                <p className="text-xs text-gray-400">{riWuxing}{TG_YIN_YANG[currentPractice.riGan]}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">月支</p>
                <p className="text-2xl font-serif font-bold text-white">{currentPractice.yueZhi}</p>
                <p className="text-xs text-gray-400">{yueWuxing}{DZ_WU_XING[currentPractice.yueZhi] === yueWuxing ? '' : ''}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">日支</p>
                <p className="text-2xl font-serif font-bold text-white">{currentPractice.riZhi}</p>
                <p className="text-xs text-gray-400">{DZ_WU_XING[currentPractice.riZhi]}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">其他天干</p>
                <p className="text-lg font-serif font-bold text-white">
                  {currentPractice.otherGans.join(' ')}
                </p>
              </div>
            </div>

            {/* Step by Step */}
            <div className="space-y-3">
              {/* Step 1: 得令 */}
              <div className={`rounded-lg p-4 transition-all ${step >= 1 ? 'bg-green-900/20 border border-green-500/30' : 'bg-bazi-dark'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'}`}>1</span>
                    <span className="font-medium text-white">是否得令？</span>
                  </div>
                  {step >= 1 && (
                    <span className={`text-sm font-bold ${isDeLing ? 'text-green-400' : 'text-red-400'}`}>
                      {isDeLing ? '✓ 得令' : '✗ 不得令'}
                    </span>
                  )}
                </div>
                {step >= 1 && (
                  <p className="text-sm text-gray-400 mt-2">
                    日干{currentPractice.riGan}属{riWuxing}，月支{currentPractice.yueZhi}属{yueWuxing}。
                    {isDeLing ? `月支${yueWuxing === riWuxing ? '与日干同五行' : '生助日干'}，故得令。` : '月支不帮扶日干，故不得令。'}
                  </p>
                )}
              </div>

              {/* Step 2: 得地 */}
              <div className={`rounded-lg p-4 transition-all ${step >= 2 ? 'bg-blue-900/20 border border-blue-500/30' : 'bg-bazi-dark'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}>2</span>
                    <span className="font-medium text-white">是否得地？</span>
                  </div>
                  {step >= 2 && (
                    <span className={`text-sm font-bold ${isDeDi ? 'text-blue-400' : 'text-red-400'}`}>
                      {isDeDi ? '✓ 得地' : '✗ 不得地'}
                    </span>
                  )}
                </div>
                {step >= 2 && (
                  <p className="text-sm text-gray-400 mt-2">
                    日支{currentPractice.riZhi}藏干：{riZhiCangGan.join('、')}。
                    {hasRootInRiZhi ? '日支有根，' : '日支无根，'}
                    {hasRootInOthers ? '其他地支也有根。' : '其他地支无根。'}
                    {isDeDi ? '故得地。' : '故不得地。'}
                  </p>
                )}
              </div>

              {/* Step 3: 得势 */}
              <div className={`rounded-lg p-4 transition-all ${step >= 3 ? 'bg-purple-900/20 border border-purple-500/30' : 'bg-bazi-dark'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'}`}>3</span>
                    <span className="font-medium text-white">是否得势？</span>
                  </div>
                  {step >= 3 && (
                    <span className={`text-sm font-bold ${isDeShi ? 'text-purple-400' : 'text-red-400'}`}>
                      {isDeShi ? '✓ 得势' : '✗ 不得势'}
                    </span>
                  )}
                </div>
                {step >= 3 && (
                  <p className="text-sm text-gray-400 mt-2">
                    其他天干对日干的关系：
                    {currentPractice.otherGans.map((g, i) => {
                      const ss = getShiShen(currentPractice.riGan, g);
                      return (
                        <span key={i} className="inline-block mr-3">
                          {g}→<span className={ss.name === '比肩' || ss.name === '劫财' || ss.name === '正印' || ss.name === '偏印' ? 'text-green-400' : 'text-red-400'}>{ss.name}</span>
                        </span>
                      );
                    })}
                    。帮扶者{supportCount}个，{isDeShi ? '故得势' : '故不得势'}。
                  </p>
                )}
              </div>

              {/* Navigation */}
              {step < 3 && (
                <button
                  onClick={handleNextStep}
                  className="w-full py-3 bg-bazi-gold/20 text-bazi-gold rounded-lg hover:bg-bazi-gold/30 transition-all flex items-center justify-center gap-2"
                >
                  {step === 0 ? '开始判断' : '下一步'}
                  <ChevronRight size={18} />
                </button>
              )}

              {/* Final Answer */}
              {step >= 3 && !showResult && (
                <div className="bg-bazi-dark rounded-lg p-4">
                  <p className="text-center text-white mb-3">综合以上三点，此命属于？</p>
                  <div className="flex gap-3 justify-center">
                    {['身强', '身弱', '中和'].map(ans => (
                      <button
                        key={ans}
                        onClick={() => { setUserAnswer(ans); setShowResult(true); }}
                        className="px-6 py-2 bg-bazi-card border border-gray-700 rounded-lg text-white hover:border-bazi-gold transition-all"
                      >
                        {ans}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Result */}
              {showResult && (
                <div className={`rounded-lg p-4 ${isCorrect ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? <CheckCircle className="text-green-400" /> : <XCircle className="text-red-400" />}
                    <span className={`font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {isCorrect ? '判断正确！' : `判断错误，正确答案是：${currentPractice.answer}`}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{currentPractice.explanation}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
