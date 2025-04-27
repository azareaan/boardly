import { Outlet, Link } from "react-router";
import styles from "./layout.module.scss"
import { useSelector } from "react-redux";
import { UserState } from "../../types/type";


const Layout = () => {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    const userIndex = auth.userIndex;
    const userList: UserState = useSelector((state:any) => state.user);
    const user = userList.users[userIndex];

    

    const handleExit = () => {
        localStorage.setItem("auth", JSON.stringify({ auth: "false", userIndex: -1 }));
        window.location.href = "/login";
    };


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
                <div className={styles.userName}>
                    <p>welcome {user?.name}</p>
                    <button onClick={handleExit}>exit</button>
                </div>
            </div>
            <Outlet />
        </main>
    );
};

export default Layout;