import { ErrorMessage, Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../redux/auth-reducer";
import loginFormSchema from "../FormValidation/LoginFormSchema";
import e from "./error.module.css";

const LoginForm = (props) => {
  return (
    <Formik
      initialValues={{ email: "", password: "", rememberMe: false }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log("form data ", values);
        props.login(values.email, values.password, values.rememberMe);
        setSubmitting(true);
        resetForm();
        setSubmitting(false);
      }}
      validationSchema={loginFormSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="email">email</label>
            <Field type={"text"} name={"email"} placeholder="email" />
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
          <div>
            <button type="sumbit" disabled={isSubmitting}>
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Login = (props) => {
  if (props.isAuth) return <Navigate to={"/profile"} />;
  return (
    <div>
      <h1>Login</h1>
      <LoginForm {...props} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
