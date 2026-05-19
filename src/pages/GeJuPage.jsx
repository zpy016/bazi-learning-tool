import { useState } from 'react';
import gejuData from '../data/geju.json';
import { BookOpen, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

const PRACTICE_CASES = [
  {
    bazi: { year: { gan: '戊', zhi: '辰' }, month: { gan: '甲', zhi: '寅' }, day: { gan: '丙', zhi: '午' }, hour: { gan: '己', zhi: '丑' } },
    answer: '正印格',
    hint: '月令寅木，寅中藏甲木，甲木透于月干，甲木生丙火（日干），为正印。',
    explanation: '月令寅木，甲木透干，甲木生丙火日干，构成正印格。'
  },
  {
    bazi: { year: { gan: '辛', zhi: '酉' }, month: { gan: '丁', zhi: '酉' }, day: { gan: '甲', zhi: '子' }, hour: { gan: '庚', zhi: '午' } },
    answer: '正官格',
    hint: '月令酉金，酉中藏辛金，辛金透于年干，辛金克甲木（日干），为正官。',
    explanation: '月令酉金，辛金透干，辛金克甲木日干，构成正官格。'
  },
  {
    bazi: { year: { gan: '壬', zhi: '子' }, month: { gan: '丙', zhi: '午' }, day: { gan: '戊', zhi: '戌' }, hour: { gan: '癸', zhi: '亥' } },
    answer: '正印格',
    hint: '月令午火，午中藏丁火，丁火生戊土（日干），火生土为印。',
    explanation: '月令午火，火生戊土日干，构成正印格。'
  }
];

export default function GeJuPage() {
  const [activeTab, setActiveTab] = useState('learn'); // 'learn' or 'practice'
  const [currentCase, setCurrentCase] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleNextCase = () => {
    setCurrentCase((prev) => (prev + 1) % PRACTICE_CASES.length);
    setShowAnswer(false);
    setSelectedAnswer(null);
  };

  const currentPractice = PRACTICE_CASES[currentCase];
  const isCorrect = selectedAnswer === currentPractice.answer;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-bazi-gold mb-2">格局识别</h2>
        <p className="text-gray-400">学习八字格局，练习识别技巧</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setActiveTab('learn')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            activeTab === 'learn'
              ? 'bg-bazi-gold text-bazi-dark'
              : 'bg-bazi-card text-gray-400 border border-gray-700'
          }`}
        >
          格局速查
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            activeTab === 'practice'
              ? 'bg-bazi-gold text-bazi-dark'
              : 'bg-bazi-card text-gray-400 border border-gray-700'
          }`}
        >
          识别练习
        </button>
      </div>

      {activeTab === 'learn' ? (
        <>
          {/* GeJu List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gejuData.map((geju, idx) => (
              <div key={idx} className="bg-bazi-card rounded-xl p-5 border border-gray-700/50 hover:border-bazi-gold/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="text-bazi-gold" size={20} />
                  <h3 className="text-lg font-bold text-white">{geju.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-bazi-gold/20 text-bazi-gold">
                    {geju.type}
                  </span>
                </div>
                
                {geju.condition && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500">成格条件</p>
                    <p className="text-sm text-gray-300">{geju.condition}</p>
                  </div>
                )}
                
                {geju.characteristics && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500">特征</p>
                    <p className="text-sm text-gray-300">{geju.characteristics}</p>
                  </div>
                )}
                
                {geju.examples && (
                  <div>
                    <p className="text-xs text-gray-500">案例</p>
                    <p className="text-sm text-bazi-gold">{geju.examples}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-bazi-card rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-bold text-bazi-gold mb-3">格局判断要点</h3>
            <ol className="space-y-2 text-sm text-gray-400 list-decimal list-inside">
              <li>先看<strong className="text-white">月令</strong>（月支）——月令是格局的出发点</li>
              <li>再看<strong className="text-white">天干透出</strong>什么——透出者成格</li>
              <li>判断透出的十神与日干的关系——生我/克我/我生/我克/同我</li>
              <li>结合<strong className="text-white">身强身弱</strong>判断格局的成败</li>
            </ol>
          </div>
        </>
      ) : (
        <>
          {/* Practice Case */}
          <div className="bg-bazi-card rounded-xl p-6 border border-bazi-gold/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">练习案例 #{currentCase + 1}</h3>
              <button
                onClick={handleNextCase}
                className="px-4 py-2 bg-bazi-dark rounded-lg text-sm text-bazi-gold hover:bg-bazi-gold/20 transition-all"
              >
                下一题 →
              </button>
            </div>

            {/* Bazi Display */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                { label: '年柱', ...currentPractice.bazi.year },
                { label: '月柱', ...currentPractice.bazi.month },
                { label: '日柱', ...currentPractice.bazi.day, isDay: true },
                { label: '时柱', ...currentPractice.bazi.hour },
              ].map((pillar, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-xs text-gray-500 mb-1">{pillar.label}</p>
                  <div className="space-y-1">
                    <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center text-xl font-serif font-bold ${
                      pillar.isDay ? 'bg-bazi-gold text-bazi-dark' : 'bg-bazi-dark border border-gray-700'
                    }`}>
                      {pillar.gan}
                    </div>
                    <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center text-xl font-serif font-bold ${
                      pillar.isDay ? 'bg-bazi-gold/30 text-bazi-gold border border-bazi-gold' : 'bg-bazi-dark border border-gray-700'
                    }`}>
                      {pillar.zhi}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Question */}
            <p className="text-center text-gray-300 mb-4">此八字属于什么格局？</p>

            {/* Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {['正官格', '七杀格', '正印格', '偏印格', '正财格', '偏财格', '食神格', '伤官格'].map((option) => (
                <button
                  key={option}
                  onClick={() => { setSelectedAnswer(option); setShowAnswer(true); }}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    showAnswer && option === currentPractice.answer
                      ? 'bg-green-600 text-white'
                      : showAnswer && option === selectedAnswer && option !== currentPractice.answer
                        ? 'bg-red-600 text-white'
                        : 'bg-bazi-dark border border-gray-700 hover:border-bazi-gold text-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Hint */}
            {!showAnswer && (
              <button
                onClick={() => setShowAnswer(true)}
                className="w-full py-2 text-sm text-bazi-gold hover:text-yellow-300 transition-all flex items-center justify-center gap-2"
              >
                <Lightbulb size={16} />
                需要提示？
              </button>
            )}

            {/* Answer Explanation */}
            {showAnswer && (
              <div className="mt-4 bg-bazi-dark rounded-lg p-4 animate-fade-in">
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="text-green-400" size={20} />
                  ) : (
                    <XCircle className="text-red-400" size={20} />
                  )}
                  <span className={`font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {isCorrect ? '回答正确！' : `正确答案：${currentPractice.answer}`}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{currentPractice.explanation}</p>
                {!isCorrect && (
                  <p className="text-sm text-bazi-gold mt-2">提示：{currentPractice.hint}</p>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
