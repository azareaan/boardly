import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addTask, editTask, removeTask } from "@/store/taskSlice";
import TaskForm from "@/components/task/TaskForm";
import { TaskInput } from "@/types/types";
import styles from "./tasks.module.scss";

const Tasks: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const teamMembers = useSelector((state: RootState) => state.team.members);

  const [editingTask, setEditingTask] = useState<TaskInput | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddOrEditTask = (data: TaskInput) => {
    if (editingTask) {
      dispatch(editTask(data));
    } else {
      dispatch(addTask(data));
    }
    setEditingTask(null);
    setIsFormOpen(false);
  };

  const handleEditClick = (task: TaskInput) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (title: string) => {
    dispatch(removeTask(title));
  };

  return (
    <div className={styles.tasksPage}>
      <h1>مدیریت تسک‌ها</h1>

      <button className={styles.addBtn} onClick={() => { setIsFormOpen(true); setEditingTask(null); }}>
        افزودن تسک جدید
      </button>

      {isFormOpen && (
        <TaskForm
          onSubmit={handleAddOrEditTask}
          defaultValues={editingTask || undefined}
          teamMembers={teamMembers}
        />
      )}

      <div className={styles.taskList}>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div key={index} className={styles.taskCard}>
              <p><strong>عنوان:</strong> {task.title}</p>
              <p><strong>توضیحات:</strong> {task.description}</p>
              <p><strong>اولویت:</strong> {task.priority}</p>
              <p><strong>وضعیت:</strong> {task.status}</p>
              <p><strong>تاریخ سررسید:</strong> {task.dueDate}</p>
              <p><strong>مسئول:</strong> {task.assignee}</p>

              <div className={styles.actions}>
                <button onClick={() => handleEditClick(task)}>ویرایش</button>
                <button onClick={() => handleDeleteClick(task.title)}>حذف</button>
              </div>
            </div>
          ))
        ) : (
          <p>تسکی موجود نیست.</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
