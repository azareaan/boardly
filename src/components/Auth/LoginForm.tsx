import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./AuthForm.module.scss";

type LoginInputs = {
  email: string;
  password: string;
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2>ورود</h2>

      <input
        {...register("email", { required: "ایمیل الزامی است" })}
        placeholder="ایمیل"
        type="email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        {...register("password", { required: "رمز عبور الزامی است" })}
        placeholder="رمز عبور"
        type="password"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">ورود</button>
    </form>
  );
}

export default LoginForm;
