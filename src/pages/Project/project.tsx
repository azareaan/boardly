import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Project.module.scss";
import { useForm } from "react-hook-form";
import ProjectForm, { ProjectInput } from "../../components/Project/ProjectForm";
import { v4 as uuidv4 } from 'uuid';  

type Project = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const { register, handleSubmit, reset } = useForm<ProjectInput>();
  const navigate = useNavigate();

  const onSubmit = (data: ProjectInput) => {
    if (editProject) {
      
      const updatedProjects = projects.map((project) =>
        project.id === editProject.id
          ? { ...project, ...data }
          : project
      );
      setProjects(updatedProjects);
      setEditProject(null); 
    } else {
      // Add new project
      const newProject: Project = {
        id: uuidv4(),  
        ...data,
        createdAt: new Date().toLocaleDateString(),
      };
      setProjects([...projects, newProject]);
    }
    reset(); 
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const editProjectHandler = (project: Project) => {
    setEditProject(project);
    reset({ ...project });
  };

  return (
    <div className={styles.projects}>
      <h1>پروژه‌ها</h1>

      <ProjectForm onSubmit={onSubmit} defaultValues={editProject || undefined} />

      <ul className={styles.list}>
        {projects.map((project) => (
          <li key={project.id} className={styles.item}>
            <div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <small>تاریخ ایجاد: {project.createdAt}</small>
            </div>
            <div className={styles.actions}>
              <button onClick={() => editProjectHandler(project)}>ویرایش</button>
              <button onClick={() => deleteProject(project.id)}>حذف</button>
              <button
                onClick={() =>
                  navigate(`/project/${project.id}`, { state: { project: project.id } })
                }
              >
                ورود
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
