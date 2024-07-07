import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { createField } from "../../utils/object-helpers";
import e from "./error.module.css";
import loginFormSchema from "../FormValidation/LoginFormSchema";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth-reducer.ts";
import { AppDispatch } from "../../redux/redux-store";

type FormPropsType = { captchaUrl: string | null };

const LoginForm: React.FC<FormPropsType> = ({ captchaUrl }) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        rememberMe: false,
        captcha: "",
      }}
      validate={(values) => {
        const errors: any = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
        setSubmitting(true);
        dispatch(
          login(
            values.email,
            values.password,
            values.rememberMe,
            setStatus,
            values.captcha
          )
        );
        setSubmitting(false);
      }}
      validationSchema={loginFormSchema}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <div>
            <label htmlFor="email">email</label>
            {/* <Field type={"text"} name={"email"} placeholder="email" /> */}
            {createField("text", "email", "email")}
            <ErrorMessage className={e.error} name="email" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" name={"password"} placeholder="Password" />
            <ErrorMessage className={e.error} name="password" component="div" />
          </div>
          <div>
            <Field type="checkbox" name={"rememberMe"} />{" "}
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          {captchaUrl && <img alt="captcha" src={captchaUrl} />}
          {captchaUrl && (
            <Field
              type="text"
              name={"captcha"}
              placeholder="Symbols from image"
            />
          )}
          {status && status.error && (
            <div>
              {status.error.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          )}
          <div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
