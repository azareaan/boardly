import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./TaskForm.module.scss";

type Priority = "کم" | "متوسط" | "زیاد";
type Status = "do-to" | "در حال انجام" | "انجام شده";

export interface TaskInput {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  assignee: string;
}

interface TaskFormProps {
  onSubmit: (data: TaskInput) => void;
  defaultValues?: TaskInput;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<TaskInput>({
    defaultValues: defaultValues || {
      priority: "متوسط",
      status: "do-to",
      dueDate: new Date().toISOString().split("T")[0],
      assignee: "",
    },
  });

  const submitHandler: SubmitHandler<TaskInput> = (data) => {
    onSubmit(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <h2 className={styles.title}>افزودن / ویرایش وظیفه</h2>

      <div className={styles.formGroup}>
        <label htmlFor="title">عنوان تسک</label>
        <input
          id="title"
          {...register("title", { required: "عنوان تسک الزامی است" })}
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">توضیحات</label>
        <textarea
          id="description"
          rows={4}
          {...register("description")}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="priority">اولویت</label>
        <select id="priority" {...register("priority")}>
          <option value="کم">کم</option>
          <option value="متوسط">متوسط</option>
          <option value="زیاد">زیاد</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="status">وضعیت</label>
        <select id="status" {...register("status")}>
          <option value="do-to">do-to</option>
          <option value="در حال انجام">در حال انجام</option>
          <option value="انجام شده">انجام شده</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dueDate">تاریخ سررسید</label>
        <input
          type="date"
          id="dueDate"
          {...register("dueDate", { required: "تاریخ سررسید الزامی است" })}
        />
        {errors.dueDate && <p className={styles.error}>{errors.dueDate.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="assignee">مسئول تسک</label>
        <input
          id="assignee"
          {...register("assignee", { required: "مسئول تسک الزامی است" })}
        />
        {errors.assignee && <p className={styles.error}>{errors.assignee.message}</p>}
      </div>

      <button className={styles.submitBtn} type="submit">ثبت</button>
    </form>
  );
};

export default TaskForm;
