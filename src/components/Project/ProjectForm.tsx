import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./ProjectForm.module.scss";

export interface ProjectInput {
  title: string;
  description: string;
  createdAt: string;
}

interface ProjectFormProps {
  onSubmit: (data: ProjectInput) => void;
  defaultValues?: ProjectInput;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectInput>({
    defaultValues: defaultValues || {
      createdAt: new Date().toISOString().split("T")[0],
    },
  });

  const submitHandler: SubmitHandler<ProjectInput> = (data) => {
    onSubmit(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <h2 className={styles.title}>افزودن / ویرایش پروژه</h2>

      <div className={styles.formGroup}>
        <label htmlFor="title">عنوان پروژه</label>
        <input
          id="title"
          {...register("title", { required: "عنوان پروژه الزامی است" })}
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
        <label htmlFor="createdAt">تاریخ ایجاد</label>
        <input
          type="date"
          id="createdAt"
          readOnly
          {...register("createdAt")}
        />
      </div>

      <button className={styles.submitBtn} type="submit">ثبت</button>
    </form>
  );
};

export default ProjectForm;
