import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./SignupForm.module.scss";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/slices/userSlice";
import { UserData } from "../../types/type";
import { Link, useNavigate } from "react-router";

type SignupInputs = {
  name: string;
  email: string;
  password: string;
};

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>();

  const onSubmit: SubmitHandler<SignupInputs> = (data) => {
    const userData: UserData = {
      name: data.name,
      email: data.email,
      pass: data.password,
      role: "admin"
    }
    dispatch(userActions.addUser(userData));
    navigate("/login");
    console.log("Signup Data:", userData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.title}>Sign up</h2>

        <input
          className={styles.input}
          {...register("name", { required: "neme is required" })}
          placeholder="name"
        />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}

        <input
          className={styles.input}
          {...register("email", { required: "email is required" })}
          placeholder="email"
          type="email"
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}

        <input
          className={styles.input}
          {...register("password", { required: "password is required" })}
          placeholder="password"
          type="password"
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}

        <button className={styles.submitButton} type="submit">ُSign up</button>
        <Link className={styles.link} to="/login">You have already an account? Login now.</Link>
      </form>
    </div>
  );
}

export default SignupForm;
