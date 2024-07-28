import { Link } from 'react-router-dom';

const SideMenu = () => {

    // 画面表示html(jsx)
    return (
        <aside className="sidebar">
            <ul className="menu">
                <li>
                    <Link to="/">ホーム</Link>
                </li>
                <li>
                    <Link to="/hello">Hello World</Link>
                </li>
                <li>
                    <Link to="/counter">カウンタ(ステート基礎の理解)</Link>
                </li>
                <li>
                    <Link to="/list_basic">リスト表示基礎</Link>
                </li>
                <li>
                    <Link to="/api_call">REST-API連携基礎</Link>
                </li>
            </ul>
        </aside>
    )
}

export default SideMenu;