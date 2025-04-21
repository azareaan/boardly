import React from "react";
import { useForm } from "react-hook-form";
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>ورود</h2>

      <div className={styles.inputGroup}>
        <label>ایمیل</label>
        <input
          type="email"
          {...register("email", { required: "ایمیل الزامی است" })}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.inputGroup}>
        <label>رمز عبور</label>
        <input
          type="password"
          {...register("password", { required: "رمز عبور الزامی است" })}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className={styles.submitButton}>
        ورود
      </button>
    </form>
  );
};

export default LoginForm;

