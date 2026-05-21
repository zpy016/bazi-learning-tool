import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Flame, 
  Wind, 
  Mountain, 
  Users, 
  Shield, 
  Sparkles,
  BookOpen,
  Menu,
  X,
  Scale,
  Sun,
  Moon
} from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const navItems = [
  { path: '/', label: '八字排盘', icon: Home },
  { path: '/wuxing', label: '五行生克', icon: Flame },
  { path: '/tiangan', label: '十天干', icon: Wind },
  { path: '/dizhi', label: '十二地支', icon: Mountain },
  { path: '/shishen', label: '十神关系', icon: Users },
  { path: '/shenqiang', label: '身强身弱', icon: Scale },
  { path: '/shensha', label: '神煞速查', icon: Shield },
  { path: '/tiaohou', label: '调候用神', icon: Sparkles },
  { path: '/geju', label: '格局识别', icon: BookOpen },
];

export default function NavMenu() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-bazi-card rounded-lg border border-bazi-accent/30 text-bazi-accent"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full w-64 bg-bazi-card border-r border-bazi-accent/20
        transform transition-transform duration-300 z-40
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-bazi-accent mb-1">
              八字命理
            </h1>
            <p className="text-sm text-bazi-text-muted">互动学习平台</p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-bazi-surface text-bazi-text-secondary hover:text-bazi-accent transition-colors"
            title={theme === 'light' ? '切换到黑夜模式' : '切换到白天模式'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        <nav className="px-4 pb-6 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-bazi-accent/20 text-bazi-accent border border-bazi-accent/30' 
                    : 'text-bazi-text-secondary hover:bg-bazi-surface hover:text-bazi-text'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-bazi-accent animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
