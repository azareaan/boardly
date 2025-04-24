import React, { useState } from "react";
import { useNavigate } from "react-router";
import TaskForm, { TaskInput } from "../components/TaskForm";
import styles from "./Task.module.scss";

const TaskManagement = () => {
  const [tasks, setTasks] = useState<TaskInput[]>([]);
  const navigate = useNavigate();

  const addTaskHandler = (task: TaskInput) => {
    setTasks([...tasks, task]);
  };

  const editTaskHandler = (taskId: number) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      navigate("/edit-task", { state: { task: taskToEdit } });
    }
  };

  const deleteTaskHandler = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className={styles.taskManagement}>
      <h1>مدیریت تسک‌ها</h1>

      <TaskForm onSubmit={addTaskHandler} />

      <div className={styles.taskList}>
        {tasks.length === 0 ? (
          <p>هیچ تسکی برای نمایش وجود ندارد.</p>
        ) : (
          <ul>
            {tasks.map((task, index) => (
              <li key={index} className={styles.taskItem}>
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <small>تاریخ سررسید: {task.dueDate}</small>
                  <div>Status: {task.status}</div>
                  <div>اولویت: {task.priority}</div>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => editTaskHandler(task.id)}>
                    ویرایش
                  </button>
                  <button onClick={() => deleteTaskHandler(task.id)}>
                    حذف
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskManagement;
