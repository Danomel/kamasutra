import { Link } from "react-router-dom";
import s from "./Header.module.css";
import React from "react";
import { Avatar, Button, Col, Layout, Menu, MenuProps, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import {
  selectCurrentUserLogin,
  selectIsAuth,
} from "../../redux/auth-selectors";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/redux-store";
import { logout } from "../../redux/auth-reducer";

export const Header: React.FC = (props) => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);
  const dispatch: AppDispatch = useDispatch();
  const logoutCallback = () => {
    dispatch(logout());
  };
  const { Header } = Layout;
  const items1: MenuProps["items"] = ["1"].map((key) => ({
    key,
    label: (
      <div className={s.item}>
        <Link to={"/developers"}>Developers</Link>
      </div>
    ),
  }));

  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <Row style={{ width: "100%" }}>
        <Col span={18}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={items1}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Col>

        {isAuth ? (
          <>
            <Col span={1}>
              <div>
                <Avatar
                  alt={login || ""}
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              </div>
            </Col>
            <Col span={5}>
              <div>
                <Button onClick={logoutCallback}>Log out</Button>
              </div>
            </Col>
          </>
        ) : (
          <Col span={6}>
            <Button>
              <Link to={"/login"}>login</Link>
            </Button>
          </Col>
        )}
      </Row>
    </Header>

    // <header className={s.header}>
    //   <img
    //     src="https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg"
    //     alt=""
    //   />
    //   <div className={s.loginBlock}>
    // {isAuth ? (
    //   <div>
    //     {" "}
    //     {login} <button onClick={logout}>Log out</button>
    //   </div>
    // ) : (
    //   <NavLink to={"/login"}>login</NavLink>
    // )}
    //   </div>
    // </header>
  );
};
