import { useNavigate } from "react-router";
import styles from "./home.module.scss"


const Home = () => {
    const project = "project"; // get project from redux
    const navigate = useNavigate();

    return (
        <div className={styles.home}>
            <h1>Home</h1>
            <button className={styles.homeButton} onClick={() => navigate(`/${project}`, { state: { project } })}>see your project 💻</button>
        </div>
    );
};

export default Home;