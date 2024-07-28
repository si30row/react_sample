// ステートを使う場合、以下のようにuseStateをimportする
import { useState } from 'react';

/**
 * Reactコンポーネント(カウンタ)
 * (ステートの取り扱いの基礎を理解する)
 */
const Counter02 = () => {
    // ステート変数の宣言
    // ※変数の宣言は[ステート変数名, ステート変数変更用の関数]という形式で宣言する
    // ※useStateの中は、ステートの初期値
    const [counter, setCounter] = useState(0);

    // カウンターを変更する関数
    const handleCountUp = (event) => {
        // 現在のカウンター値のステートを+1して、その結果をステート宣言時の第2引数で指定した関数(setCounter)に入れる。
        // こうすると、ステートcounterが変更される。
        // (ステートが変更されると、jsxで参照している個所全てが自動的に画面表示に反映される)
        //
        // NG例：counter = counter + 1 と直接変更してもステートは変化しない。
        //       必ずセットで宣言板ステート変更用関数を通してステートを変更すること
        //       こうすることで、Reactがステート変更を検知する仕組みになっている。
        const countUp = counter + 1;
        setCounter(countUp);
    }

    // カウンターをクリアボタンをトリガーする関数
    const handleCountClear = (event) => {
        // 初期値をステート宣言時の第2引数で指定した関数に入れると、ステートが初期化される
        // (同様に、jsxで参照している個所全てが自動的に表示に反映される)
        setCounter(0);
    }

    // 画面表示jsx
    return (
        // 以下のように、ルートタグをdiv等で囲めない場合などは、<></>で囲うことも可能
        // (このタグは、jsxを表現するReactの拡張コンポーネントとなっている。ブラウザに表示される際はタグとしては出てこない。中身のタグのみ)
        <>
            {/* 画面描画でステートを利用。{ステート変数名}を用いると、自動的に描画される */}
            <div>
                {/* カウンターのステートを変更する関数を実行するボタン */}
                <button onClick={handleCountUp}>カウントアップ</button>
                {/* カウンターのステートを変更する関数を実行するボタン */}
                <button onClick={handleCountClear}>カウントクリア</button>
            </div>
            <div>
                {/* ステート変数として宣言したカウンターを表示 */}
                {/* 上記のボタンでカウンターのステートが変更されると、下記の表示も自動的に反映される */}
                {counter}
            </div>
            <div>
                {/* ステートによる表示制御の理解
                以下の例は、カウンターのステート変数の条件を満たすと、表示が現れる画面描画制御となります */}
                {counter >= 5 &&
                    <span>カウンタが5以上になりました</span>
                }
            </div>
            <div>
                {/* ステートによる表示制御の理解 */}
                {/* 以下の例は、上記と同様にカウンターのステート変数の条件を満たすと、表示が現れる画面描画制御となります  */}
                {/* 更に、カウンターのステートが15になると文字が赤くなります(スタイルやクラスなどもステートを参照して可変にできる) */}
                {counter >= 10 &&
                    <span style={{ color: (counter >= 15 ? '#ff0000': '#000000') }}>カウンタが10以上になりました(15以上になると赤文字になります)</span>
                }
            </div>
        </>
    );
}

// export default 関数名(変数名)で、他のモジュールからimportできるようにする(public宣言のようなものと思ってください)
export default Counter02;