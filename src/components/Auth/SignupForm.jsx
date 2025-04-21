import React from "react";
import { useForm } from "react-hook-form";
import styles from "./SignupForm.module.scss";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signup Data:", data);
   
  };

  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>ثبت‌نام</h2>

      <div className={styles.inputGroup}>
        <label>نام کاربری</label>
        <input
          type="text"
          {...register("username", { required: "نام کاربری الزامی است" })}
        />
        {errors.username && (
          <p className={styles.error}>{errors.username.message}</p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>ایمیل</label>
        <input
          type="email"
          {...register("email", { required: "ایمیل الزامی است" })}
        />
        {errors.email && (
          <p className={styles.error}>{errors.email.message}</p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>رمز عبور</label>
        <input
          type="password"
          {...register("password", {
            required: "رمز عبور الزامی است",
            minLength: {
              value: 6,
              message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
            },
          })}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>تکرار رمز عبور</label>
        <input
          type="password"
          {...register("confirmPassword", {
            validate: (value) =>
              value === password || "رمز عبور مطابقت ندارد",
          })}
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <button type="submit" className={styles.submitButton}>
        ثبت‌نام
      </button>
    </form>
  );
};

export default SignupForm;
