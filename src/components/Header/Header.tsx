import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import React from "react";

type PropsType = {
  login: string | null;
  isAuth: boolean;
  logout: () => void;
};

const Header: React.FC<PropsType> = ({ isAuth, login, logout }) => {
  return (
    <header className={s.header}>
      <img
        src="https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg"
        alt=""
      />
      <div className={s.loginBlock}>
        {isAuth ? (
          <div>
            {" "}
            {login} <button onClick={logout}>Log out</button>
          </div>
        ) : (
          <NavLink to={"/login"}>login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
