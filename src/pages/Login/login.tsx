import { Link } from "react-router";
import styles from "./login.module.scss"


const Login = () => {

    return (
        <div className={styles.login}>
            <h1>Login</h1>
            <Link to="/">go to home</Link>
        </div>
    );
};

export default Login;