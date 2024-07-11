import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../redux/auth-reducer";
import React from "react";
import { AppStateType } from "../../redux/redux-store";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";

export const LoginPage: React.FC = (props) => {
  const captchaUrl = useSelector(
    (state: AppStateType) => state.auth.captchaUrl
  );
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  if (isAuth) return <Navigate to={"/profile"} />;
  return (
    <div>
      <h1>Login</h1>
      <LoginForm captchaUrl={captchaUrl} />
    </div>
  );
};
