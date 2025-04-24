

import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./tasks.module.scss";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  deadline?: string;
};

type TaskFormData = {
  title: string;
  description: string;
  deadline?: string;
  status: Task["status"];
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { register, handleSubmit, reset } = useForm<TaskFormData>();

  const onSubmit = (data: TaskFormData) => {
    const newTask: Task = {
      id: Date.now(),
      ...data,
    };
    setTasks([...tasks, newTask]);
    reset();
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateStatus = (id: number, newStatus: Task["status"]) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
  };

  return (
    <div className={styles.tasks}>
      <h1>مدیریت تسک‌ها</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input {...register("title", { required: true })} placeholder="عنوان تسک" />
        <textarea {...register("description")} placeholder="توضیحات" />
        <input type="date" {...register("deadline")} />
        <select {...register("status")}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit">افزودن تسک</button>
      </form>

      <div className={styles.list}>
        {tasks.map(task => (
          <div key={task.id} className={styles.card}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>وضعیت:</strong> {task.status}</p>
            {task.deadline && <p><strong>ددلاین:</strong> {task.deadline}</p>}
            <select value={task.status} onChange={(e) => updateStatus(task.id, e.target.value as Task["status"])}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <button onClick={() => deleteTask(task.id)}>حذف</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
