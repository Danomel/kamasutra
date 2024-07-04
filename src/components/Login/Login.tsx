import { ErrorMessage, Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../redux/auth-reducer.ts";
import loginFormSchema from "../FormValidation/LoginFormSchema.js";
import e from "./error.module.css";
import { createField } from "../../utils/object-helpers.js";
import React from "react";
import { AppStateType } from "../../redux/redux-store.ts";

type MapDispatchType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    setStatus: (status?: string) => void,
    captcha: string | null
  ) => Promise<void>;
};

type MapPropsType = {
  captchaUrl: string | null;
  isAuth: boolean;
};

type PropsType = MapDispatchType & MapPropsType;

type FormPropsType = MapDispatchType & { captchaUrl: string | null };

const LoginForm: React.FC<FormPropsType> = ({ login, captchaUrl }) => {
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
        login(
          values.email,
          values.password,
          values.rememberMe,
          setStatus,
          values.captcha
        ).then(() => {
          setSubmitting(false);
        });
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

const Login: React.FC<PropsType> = (props) => {
  if (props.isAuth) return <Navigate to={"/profile"} />;
  return (
    <div>
      <h1>Login</h1>
      <LoginForm captchaUrl={props.captchaUrl} login={props.login} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapPropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);
