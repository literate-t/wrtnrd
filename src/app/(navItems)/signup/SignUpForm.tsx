"use client";

import styles from "./SignUpForm.module.scss";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

interface FormValue {
  email: string;
  password: string;
  confirmPassword: string;
}

interface Error {
  confirmPassword: string;
}

const initialValues: FormValue = {
  password: "",
  confirmPassword: "",
  email: "",
};

const signupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Not matched")
    .required("Required"),
});

const SignUpForm = () => {
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={async (values: FormValue) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <Field id="email" name="email" className={styles.input} />
          {/*<ErrorMessage name="email" className={styles.error} />*/}
          {errors.email && touched.email ? (
            <div className={styles.error}>{errors.email}</div>
          ) : null}
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <Field
            type="password"
            id="password"
            name="password"
            className={styles.input}
          />
          {errors.password && touched.password ? (
            <div className={styles.error}>{errors.password}</div>
          ) : null}
          <label htmlFor="confirmPassword" className={styles.label}>
            Password confirm
          </label>
          <Field
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={styles.input}
          />
          {/*<ErrorMessage name="confirmPassword" />*/}
          {errors.confirmPassword && touched.confirmPassword ? (
            <div className={styles.error}>{errors.confirmPassword}</div>
          ) : null}
          <button type="submit" className={styles.button}>
            Sign up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
