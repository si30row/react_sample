import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderMenu from '@/components/layouts/HeaderMenu';
import SideMenu from '@/components/layouts/SideMenu';

// 各コンポーネントのロード
import Home00 from '@/pages/Home00';
import Hello01 from '@/pages/Hello01';
import Counter02 from '@/pages/Counter02';
import List03 from '@/pages/List03';
import ApiCall04 from '@/pages/ApiCall04';

function App() {

  return (
    <Router>
      <div className="app">
        {/* ヘッダーメニュー(別コンポーネントから描画) */}
        <HeaderMenu headerText="Reactサンプル" />

        {/* フッタ―メニュー(別コンポーネントから描画) */}
        <SideMenu />

        {/* メインコンテンツ */}
        <main className="content">
          {/* Routers,Routeは、React-RouterというReactのSPA(シングルページアプリケーション)を画面切り替えを制御する拡張コンポーネントとなっている */}
            <Routes>
              {/* メインコンテンツ内の切り替え対象の画面コンポーネントをRouteコンポーネントで羅列していく。
              ブラウザのURLがpath属性とマッチすると、メインコンテンツ内の領域がelementに指定したコンポーネントに切り替わる(サーバ側との通信はなし) */}
              <Route path="/" element={<Home00 />} />
              <Route path="/hello" element={<Hello01 />} />
              <Route path="/counter" element={<Counter02 />} />
              <Route path="/list_basic" element={<List03 />} />
              <Route path="/api_call" element={<ApiCall04 />} />
            </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
