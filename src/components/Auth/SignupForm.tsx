import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./AuthForm.module.scss";

type SignupInputs = {
  name: string;
  email: string;
  password: string;
};

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>();

  const onSubmit: SubmitHandler<SignupInputs> = (data) => {
    console.log("Signup Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2>ثبت‌نام</h2>

      <input
        {...register("name", { required: "نام الزامی است" })}
        placeholder="نام"
      />
      {errors.name && <span>{errors.name.message}</span>}

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

      <button type="submit">ثبت‌نام</button>
    </form>
  );
}

export default SignupForm;
