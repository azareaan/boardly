import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./ LoginForm.module.scss";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/slices/userSlice";

type LoginInputs = {
  email: string;
  pass: string;
};

function LoginForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    dispatch(userActions.Authentication(data));
    console.log("Login Data:", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2>ورود</h2>

        <input
          {...register("email", { required: "ایمیل الزامی است" })}
          placeholder="ایمیل"
          type="email"
        />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          {...register("pass", { required: "رمز عبور الزامی است" })}
          placeholder="رمز عبور"
          type="password"
        />
        {errors.pass && <span>{errors.pass.message}</span>}

        <button type="submit">ورود</button>
      </form>
      <Link to="/signup">You don't have an account? Sign-up now.</Link>
    </>
  );
}

export default LoginForm;
