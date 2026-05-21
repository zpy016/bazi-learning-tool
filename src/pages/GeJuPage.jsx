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
        <h2 className="text-3xl font-serif font-bold text-bazi-accent mb-2">格局识别</h2>
        <p className="text-bazi-text-muted">学习八字格局，练习识别技巧</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setActiveTab('learn')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            activeTab === 'learn'
              ? 'bg-bazi-accent text-bazi-text'
              : 'bg-bazi-card text-bazi-text-muted border border-bazi-border'
          }`}
        >
          格局速查
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            activeTab === 'practice'
              ? 'bg-bazi-accent text-bazi-text'
              : 'bg-bazi-card text-bazi-text-muted border border-bazi-border'
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
              <div key={idx} className="bg-bazi-card rounded-xl p-5 border border-bazi-border hover:border-bazi-accent/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="text-bazi-accent" size={20} />
                  <h3 className="text-lg font-bold text-bazi-text">{geju.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-bazi-accent/20 text-bazi-accent">
                    {geju.type}
                  </span>
                </div>
                
                {geju.condition && (
                  <div className="mb-3">
                    <p className="text-xs text-bazi-text-muted">成格条件</p>
                    <p className="text-sm text-bazi-text-secondary">{geju.condition}</p>
                  </div>
                )}
                
                {geju.characteristics && (
                  <div className="mb-3">
                    <p className="text-xs text-bazi-text-muted">特征</p>
                    <p className="text-sm text-bazi-text-secondary">{geju.characteristics}</p>
                  </div>
                )}
                
                {geju.examples && (
                  <div>
                    <p className="text-xs text-bazi-text-muted">案例</p>
                    <p className="text-sm text-bazi-accent">{geju.examples}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-bazi-card rounded-xl p-6 border border-bazi-border">
            <h3 className="text-lg font-bold text-bazi-accent mb-3">格局判断要点</h3>
            <ol className="space-y-2 text-sm text-bazi-text-muted list-decimal list-inside">
              <li>先看<strong className="text-bazi-text">月令</strong>（月支）——月令是格局的出发点</li>
              <li>再看<strong className="text-bazi-text">天干透出</strong>什么——透出者成格</li>
              <li>判断透出的十神与日干的关系——生我/克我/我生/我克/同我</li>
              <li>结合<strong className="text-bazi-text">身强身弱</strong>判断格局的成败</li>
            </ol>
          </div>
        </>
      ) : (
        <>
          {/* Practice Case */}
          <div className="bg-bazi-card rounded-xl p-6 border border-bazi-accent/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-bazi-text">练习案例 #{currentCase + 1}</h3>
              <button
                onClick={handleNextCase}
                className="px-4 py-2 bg-bazi-surface rounded-lg text-sm text-bazi-accent hover:bg-bazi-accent/20 transition-all"
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
                  <p className="text-xs text-bazi-text-muted mb-1">{pillar.label}</p>
                  <div className="space-y-1">
                    <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center text-xl font-serif font-bold ${
                      pillar.isDay ? 'bg-bazi-accent text-bazi-text' : 'bg-bazi-surface border border-bazi-border'
                    }`}>
                      {pillar.gan}
                    </div>
                    <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center text-xl font-serif font-bold ${
                      pillar.isDay ? 'bg-bazi-accent/30 text-bazi-accent border border-bazi-accent' : 'bg-bazi-surface border border-bazi-border'
                    }`}>
                      {pillar.zhi}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Question */}
            <p className="text-center text-bazi-text-secondary mb-4">此八字属于什么格局？</p>

            {/* Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {['正官格', '七杀格', '正印格', '偏印格', '正财格', '偏财格', '食神格', '伤官格'].map((option) => (
                <button
                  key={option}
                  onClick={() => { setSelectedAnswer(option); setShowAnswer(true); }}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    showAnswer && option === currentPractice.answer
                      ? 'bg-green-600 text-bazi-text'
                      : showAnswer && option === selectedAnswer && option !== currentPractice.answer
                        ? 'bg-red-600 text-bazi-text'
                        : 'bg-bazi-surface border border-bazi-border hover:border-bazi-accent text-bazi-text-secondary'
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
                className="w-full py-2 text-sm text-bazi-accent hover:text-bazi-accent transition-all flex items-center justify-center gap-2"
              >
                <Lightbulb size={16} />
                需要提示？
              </button>
            )}

            {/* Answer Explanation */}
            {showAnswer && (
              <div className="mt-4 bg-bazi-surface rounded-lg p-4 animate-fade-in">
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
                  ) : (
                    <XCircle className="text-red-600 dark:text-red-400" size={20} />
                  )}
                  <span className={`font-bold ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {isCorrect ? '回答正确！' : `正确答案：${currentPractice.answer}`}
                  </span>
                </div>
                <p className="text-sm text-bazi-text-secondary">{currentPractice.explanation}</p>
                {!isCorrect && (
                  <p className="text-sm text-bazi-accent mt-2">提示：{currentPractice.hint}</p>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
