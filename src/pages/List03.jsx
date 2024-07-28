// ステートを使う場合、以下のようにuseStateをimportする
import { useState } from 'react';

/**
 * Reactコンポーネント(リスト表示)
 * (ステートにおけるリストの表示方法を理解する)
 */
const List03 = () => {
    // ステート変数の宣言(初期を空リストにする場合、useStateの初期値は[]と0要素の配列にしておく)
    const [list, setList] = useState([]);

    // 名前の入力欄を管理するステート
    const [inputName, setInputName] = useState('');

    // メールアドレスの入力欄を管理するステート
    const [inputMail, setInputMail] = useState('');

    // リストを作成して画面に表示する関数
    const handleCreateList = (event) => {
        const wkList = [
            {id: 1, name: '田中 太郎', mail: 'tanaka@example.com'},
            {id: 2, name: '佐藤 次郎', mail: 'sato@example.com'},
            {id: 3, name: '鈴木 三郎', mail: 'suzuki@example.com'}
        ]

        // 作成したリストをステート変数に反映
        setList(wkList);
    }

    const handleAddManual = (event) => {
        // Array.fromやスプレット演算子を用いて、元のステート管理の配列とは別オブジェクトにする。
        // (同一オブジェクトに配列データを追加したものをステートに対して変更かけても、ステートは変化しないため)
        const newList = Array.from(list);

        // 画面で入力した名前、メールアドレス欄
        newList.push({
            id: list.length + 1,
            name: inputName,
            mail: inputMail
        });

        // 入力欄の情報を追加したリストをステートに反映
        // (jsxのテーブル描画欄も、自動的に追記された状態になる)
        setList(newList);

        // 名前、メールアドレス欄の入力状態をクリア(ステート管理しているので、ステートを初期化すれば画面の入力欄もクリアされる)
        setInputName('');
        setInputMail('');
    }

    // 画面表示html(jsx)
    return (
        // 以下のように、ルートタグをdiv等で囲めない場合などは、<></>で囲うことも可能
        // (このタグは、jsxを表現するReactの拡張コンポーネントとなっている。ブラウザに表示される際はタグとしては出てこない。中身のタグのみ)
        <>
            <div>
                {/* リストを作成して表示するボタン */}
                <button onClick={(event) => handleCreateList(event)}>リスト表示</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>名前</th>
                            <th>メールアドレス</th>
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
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.mail}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                {/* リストを作成して表示するボタン */}
                <button onClick={(event) => handleAddManual(event)}>手動追加</button><br/>
                {/* 各入力欄とステート値を紐づけしている。以下の通りにすると、入力欄とステートが同期される */}
                名前:<input type="text" value={inputName} onChange={(event) => setInputName(event.target.value)} />({inputName})<br/>
                メールアドレス:<input type="text" value={inputMail} onChange={(event) => setInputMail(event.target.value)} />({inputMail})<br/>
            </div>
        </>
    );
}

// export default 関数名(変数名)で、他のモジュールからimportできるようにする(public宣言のようなものと思ってください)
export default List03;