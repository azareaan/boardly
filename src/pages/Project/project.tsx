import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./Projects.module.scss";

type Project = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
};

type FormData = {
  title: string;
  description: string;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    const newProject: Project = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      createdAt: new Date().toLocaleDateString(),
    };
    setProjects([...projects, newProject]);
    reset();
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className={styles.projects}>
      <h1>پروژه‌ها</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input {...register("title", { required: true })} placeholder="عنوان پروژه" />
        <textarea {...register("description")} placeholder="توضیحات پروژه" />
        <button type="submit">افزودن پروژه</button>
      </form>

      <ul className={styles.list}>
        {projects.map(project => (
          <li key={project.id} className={styles.item}>
            <div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <small>تاریخ ایجاد: {project.createdAt}</small>
            </div>
            <div className={styles.actions}>
              <button onClick={() => navigate(`/project/${project.id}`, { state: { project } })}>
                ورود به پروژه
              </button>
              <button onClick={() => deleteProject(project.id)}>حذف</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
