import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./TeamMemberForm.module.scss";
import { TeamMemberInput } from "../../types/type";

type Role = "مدیر" | "عضو عادی";

interface TeamMemberFormProps {
  onSubmit: (data: TeamMemberInput) => void;
  defaultValues?: TeamMemberInput;
}



const TeamMemberForm: React.FC<TeamMemberFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<TeamMemberInput>({
    defaultValues,
  });

  const submitHandler: SubmitHandler<TeamMemberInput> = (data) => {
    onSubmit(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <h2 className={styles.title}>افزودن / ویرایش عضو</h2>

      <div className={styles.formGroup}>
        <label htmlFor="name">نام</label>
        <input
          id="name"
          {...register("name", { required: "وارد کردن نام الزامی است" })}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="role">نقش</label>
        <select id="role" {...register("role", { required: "نقش را انتخاب کنید" })}>
          <option value="">انتخاب نقش</option>
          <option value="مدیر">مدیر</option>
          <option value="عضو عادی">عضو عادی</option>
        </select>
        {errors.role && <p className={styles.error}>{errors.role.message}</p>}
      </div>

      <button className={styles.submitBtn} type="submit">ثبت</button>
    </form>
  );
};

export default TeamMemberForm;
