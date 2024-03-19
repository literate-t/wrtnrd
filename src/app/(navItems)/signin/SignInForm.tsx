"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import styles from "./SignInForm.module.scss";
import { useRouter } from "next/navigation";

interface FormValue {
  username: string;
  password: string;
}

const initialValues: FormValue = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const SignInForm = () => {
  const router = useRouter();
  const formik = useFormik<FormValue>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          className={styles.input}
        />
        <label htmlFor="username" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
      <div className={styles.signup}>
        <button onClick={() => router.push("/signup")} className={styles.form}>
          SignUp
        </button>
        <button className={styles.google}>Google</button>
        <button className={styles.naver}>Naver</button>
      </div>
    </div>
  );
};

export default SignInForm;
