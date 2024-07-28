// ステートを使う場合、以下のようにuseStateをimportする
import { useState } from 'react';

/**
 * Reactコンポーネント(REST-API実行:検索)
 * (REST-APIの実行とステートの連携の基礎を理解する)
 */
const ApiCall04 = () => {
    // ステート変数(エラーメッセージ)
    const [message, setMessage] = useState(null);

    // ステート変数(郵便番号)
    const [zipCode, setZipCode] = useState('');

    // ステート変数の宣言(初期を空リストにする場合、useStateの初期値は[]と0要素の配列にしておく)
    const [list, setList] = useState([]);

    // クリアボタンの処理
    const handleClear = () => {
        // 検索条件の郵便番号をクリア(ステートを初期化する。画面で入力した郵便番号も連動してクリアされる)
        setZipCode('');
        // エラーメッセージのステートを初期化。画面に表示されたエラーメッセージ欄も連動してクリアされる
        setMessage(null);
        // 結果一覧のステートを初期化(空配列にする)。画面に表示された一覧も連弩してクリアされる
        setList([]);
    }

    // APIの実行と、APIの結果をステートに詰めて結果を表示します。
    const handleApiCall = async (event) => {
        // 検索結果のステートを初期化して、画面を検索前の状態に戻す
        setMessage(null);
        setList([]);

        // REST-APIのURLとオプションを設定
        // オプション詳細は　[https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch] 参照
        const api = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`;
        const options = {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            signal: AbortSignal.timeout(5000),  // タイムアウトを5000ミリ秒(5秒)に設定
        };

        try {
            // JavaScript標準のfetch関数を用いてREST-APIを実行
            // (fetch関数の利用方法は以下を参照)
            // https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch
            const response = await fetch(api, options);

            // サーバ側でエラーが発生した場合(response.okがfalseとなると、レスポンスコードが200以外となりサーバ側のエラーとみなせる)
            if (!response.ok) {
                setMessage(`サーバ側でエラーが発生しました(STATUS:${response.status} STATUS-TEXT:${response.statusText})`);
                return;
            }

            // 結果はJSONで取得
            const jsonData = await response.json();
            if (jsonData.results === null) {
                setMessage('該当データが存在しません');
            } else {
                setList(jsonData.results);
            }

        } catch (error) {
            setMessage('通信エラーが発生しました');
        }
    }

    // 画面表示html(jsx)
    return (
        // 以下のように、ルートタグをdiv等で囲めない場合などは、<></>で囲うことも可能
        // (このタグは、jsxを表現するReactの拡張コンポーネントとなっている。ブラウザに表示される際はタグとしては出てこない。中身のタグのみ)
        <>
            <div>
                <p>下記で入力した郵便番号から、API:https://zipcloud.ibsnet.co.jp/api/search を実行し、該当郵便番号の住所を表示するサンプルです</p>
                <p>(APIの詳細:https://zipcloud.ibsnet.co.jp/doc/api)</p>
            </div>
            <div>
                {/* 参考:複数の住所がある郵便番号:(0294205,0493521,1980000,4520961) */}
                郵便番号:<input type="text" value={zipCode} onChange={(event) => setZipCode(event.target.value)} />

                {/* APIを実行して表示するボタン */}
                <button onClick={(event) => handleApiCall(event)}>API実行(検索)</button>
                {/* クリアボタン */}
                <button onClick={handleClear}>クリア</button>
            </div>
            <div>
                {/* API実行失敗時などのメッセージを表示 */}
                <span style={{ color: 'red' }}>{message}</span>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>address1</th>
                            <th>address2</th>
                            <th>address3</th>
                            <th>kana1</th>
                            <th>kana2</th>
                            <th>kana3</th>
                            <th>prefcode</th>
                            <th>zipcode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* ループして表示する際は、配列宣言しているステートを、mapメソッドを用いてループする
                        mapメソッドはJavaScriptの標準関数なので、使い方はググるなりChatGPTなりに確認お願いします。 */}

                        {/* map内は1行ずつの表示結果を出力する関数処理を記載(returnする情報は、1行分の表示のhtml(jsx)とする)
                            mapの引数(data,index)について
                            ・data=1行ごとのデータの中身(1回目はlistの0要素目の情報 2回目はlistの1要素目の情報)
                            ・index=処理しているデータの要素番号(1回目は0、2回目のデータは1、3回目のデータは2 という感じになる) */}
                        {list.map((data, index) => {
                            return (
                                // リストをループして表示する場合、内部のjsxタグはkey属性をつけて、一意な値を設定すること(Reactの内部制御用)
                                // dataの一意となるキー or index値を指定すること
                                // ※keyを指定しないと、React側で警告を出してきます。
                                <tr key={index}>
                                    <td>{data.address1}</td>
                                    <td>{data.address2}</td>
                                    <td>{data.address3}</td>
                                    <td>{data.kana1}</td>
                                    <td>{data.kana2}</td>
                                    <td>{data.kana3}</td>
                                    <td>{data.prefcode}</td>
                                    <td>{data.zipcode}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

// export default 関数名(変数名)で、他のモジュールからimportできるようにする(public宣言のようなものと思ってください)
export default ApiCall04;