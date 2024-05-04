"use client";

import styles from "./RegisterForm.module.scss";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "@/utils/axios";
import { locate } from "@/utils/common";

interface FormValue {
  username: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValue = {
  username: "",
  password: "",
  confirmPassword: "",
};

const signupSchema = Yup.object().shape({
  username: Yup.string().email("Invalid email address").required("Required"),
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

const RegisterForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={async (values: FormValue) => {
        try {
          const resp = await axios("/auth/register", {
            method: "POST",
            data: values,
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (resp.status == 200) {
            locate("/");
          }
        } catch (e) {
          console.error("Error", e);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <label htmlFor="username" className={styles.label}>
            Email
          </label>
          <Field id="username" name="username" className={styles.input} />
          {errors.username && touched.username ? (
            <div className={styles.error}>{errors.username}</div>
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
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
