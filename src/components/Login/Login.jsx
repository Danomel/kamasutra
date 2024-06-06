import { ErrorMessage, Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../redux/auth-reducer";
import loginFormSchema from "../FormValidation/LoginFormSchema";
import e from "./error.module.css";
import { createField } from "../../utils/object-helpers";

const LoginForm = ({ login }) => {
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
      onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
        setSubmitting(true);
        login(values.email, values.password, values.rememberMe, setStatus).then(
          () => {
            setSubmitting(false);
          }
        );
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
          {status && status.error && (
            <div>
              {status.error.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          )}
          <div>
            <button type="sumbit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
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
