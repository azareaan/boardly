import { Provider } from "react-redux";
import { store } from "../../redux/redux";
import { Outlet, Link } from "react-router";
import styles from "./layout.module.scss"


const Layout = () => {

    return (
        <main>
            <div className={styles.layout}>
                <nav>
                    <ul>
                        <Link to="/">
                            <li>َHome</li>
                        </Link>
                    </ul>
                </nav>
            </div>
            <Provider store={store}>
                <Outlet />
            </Provider>
        </main>
    );
};

export default Layout;