import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={s.header}>
      <img
        src="https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg"
        alt=""
      />
      <div className={s.loginBlock}>
        {props.isAuth ? props.login : <NavLink to={"/login"}>login</NavLink>}
      </div>
    </header>
  );
};

export default Header;
