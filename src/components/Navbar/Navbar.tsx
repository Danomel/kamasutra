import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";
import React from "react";
const Navbar: React.FC = () => {
  return (
    <nav className={s.nav}>
      <div className={`${s.item} ${s.active}`}>
        <NavLink
          to={"/profile"}
          className={(navData) => (navData.isActive ? s.activeLink : s.item)}
        >
          Profile
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink
          to={"/dialogs"}
          className={(navData) => (navData.isActive ? s.activeLink : s.item)}
        >
          Messages
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink
          to={"/users"}
          className={(navData) => (navData.isActive ? s.activeLink : s.item)}
        >
          Users
        </NavLink>
      </div>
      <div className={s.item}>News</div>
      <div className={s.item}>Settings</div>
    </nav>
  );
};

export default Navbar;
