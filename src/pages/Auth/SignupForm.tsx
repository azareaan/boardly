import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./SignupForm.module.scss";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/slices/userSlice";
import { UserData } from "../../types/type";
import { Link } from "react-router";

type SignupInputs = {
  name: string;
  email: string;
  password: string;
};

function SignupForm() {
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
    console.log("Signup Data:", userData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2>ثبت‌ نام</h2>

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

        <button type="submit">ثبت‌ نام</button>
      </form>
      <Link to="/login">You have already an account? Login now.</Link>
    </>
  );
}

export default SignupForm;
