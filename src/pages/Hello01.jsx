// ステートを使う場合、以下のようにuseStateをimportする
import { useState } from 'react';

/**
 * Reactコンポーネント
 * (Hello World)
 */
const Hello01 = () => {
    // ステート変数の宣言(useStateの中は、ステートの初期値)
    const [text] = useState('React');

    // 画面表示jsx
    return (
        // 以下のように、ルートタグをdiv等で囲めない場合などは、<></>で囲うことも可能
        // (このタグは、jsxを表現するReactの拡張コンポーネントとなっている。ブラウザに表示される際はタグとしては出てこない。中身のタグのみ)
        <>
            {/* 画面描画でステートを利用。{ステート変数名}を用いると、自動的に描画される */}
            <div>Hello World {text}</div>
            <div>(このプロジェクトは、{text} ライブラリを用いています)</div>
        </>
    );
}

// export default 関数名(変数名)で、他のモジュールからimportできるようにする(public宣言のようなものと思ってください)
export default Hello01;