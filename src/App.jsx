import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Home from './pages/Home';
import WuXingPage from './pages/WuXingPage';
import TianGanPage from './pages/TianGanPage';
import DiZhiPage from './pages/DiZhiPage';
import ShiShenPage from './pages/ShiShenPage';
import ShenShaPage from './pages/ShenShaPage';
import TiaoHouPage from './pages/TiaoHouPage';
import ShenQiangPage from './pages/ShenQiangPage';
import GeJuPage from './pages/GeJuPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex">
        <NavMenu />
        <main className="flex-1 lg:ml-64 p-4 md:p-8 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wuxing" element={<WuXingPage />} />
            <Route path="/tiangan" element={<TianGanPage />} />
            <Route path="/dizhi" element={<DiZhiPage />} />
            <Route path="/shishen" element={<ShiShenPage />} />
            <Route path="/shenqiang" element={<ShenQiangPage />} />
            <Route path="/shensha" element={<ShenShaPage />} />
            <Route path="/tiaohou" element={<TiaoHouPage />} />
            <Route path="/geju" element={<GeJuPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
