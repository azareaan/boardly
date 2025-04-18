import { useLocation, useNavigate } from "react-router";
import styles from "./project.module.scss"


const Project = () => {
    const task = "task"; // get task from redux
    const navigate = useNavigate();
    const location = useLocation();
    const project = location.state?.project;
    return (
        <div className={styles.project}>
            <h1>Project page</h1>
            <button onClick={() => navigate(`/${project}/${task}`)}>task</button>
            <button onClick={() => navigate(`/${project}/team`)}>team</button>
        </div>
    );
};

export default Project;