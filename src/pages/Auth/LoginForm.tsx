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
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2>Login</h2>

        <input
          {...register("email", { required: "email is required" })}
          placeholder="email"
          type="email"
        />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          {...register("pass", { required: "password is required" })}
          placeholder="password"
          type="password"
        />
        {errors.pass && <span>{errors.pass.message}</span>}

        <button className={styles.submitButton} type="submit">Login</button>
        <Link to="/signup">You don't have an account? Sign-up now.</Link>
      </form>
    </div>
  );
}

export default LoginForm;
