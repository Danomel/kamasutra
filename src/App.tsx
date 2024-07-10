import "./App.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import s from "./components/Navbar/Navbar.module.css";
import {
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
import { withRouter } from "./components/Profile/ProfileContainer.tsx";
import { LoginPage } from "./components/Login/Login.tsx";
import React, { Suspense, lazy } from "react";
import { Provider, connect } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer.ts";
import Preloader from "./common/preloader/preloader.tsx";
import store, { AppStateType } from "./redux/redux-store.ts";
import UsersPage from "./components/Users/UsersContainer.tsx";

import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Breadcrumb, Layout, Menu, theme } from "antd";
import useToken from "antd/es/theme/useToken";
import { Header } from "./components/Header/Header.tsx";
const DialogsContainer = lazy(
  () => import("./components/Dialogs/DialogsContainer.tsx")
);
const ProfileContainer = lazy(
  () => import("./components/Profile/ProfileContainer.tsx")
);

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

class App extends React.Component<MapPropsType & DispatchPropsType> {
  catchAllUnHandledErrors = (e: PromiseRejectionEvent) => {
    alert("some error occured");
    // console.log(promiseRejectionEvent);
  };
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnHandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnHandledErrors
    );
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    const { Content, Footer, Sider } = Layout;

    const items2: MenuProps["items"] = [
      {
        key: "sub1",
        icon: <UserOutlined />,
        label: "Профиль",
        children: [
          {
            key: "1",
            label: (
              <div>
                <div>
                  <Link to={"/profile"}>Профиль</Link>
                </div>
              </div>
            ),
          },
          {
            key: "2",
            label: (
              <div>
                <Link to={"/dialogs"}>Сообщения</Link>
              </div>
            ),
          },
        ],
      },
      // {
      //   key: "sub2",
      //   icon: <LaptopOutlined />,
      //   label: "Пользователи",
      //   children: [
      //     {
      //       key: "3",
      //       label: (
      //         <div className={s.item}>
      //           <NavLink to={"/users"} className={s.item}>
      //             Пользователи
      //           </NavLink>
      //         </div>
      //       ),
      //     },
      //   ],
      // },
    ];

    // const {
    //   token: { colorBgContainer, borderRadiusLG },
    // } = theme.useToken();
    return (
      <Layout>
        <Header />
        <Content style={{ padding: "0 48px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            style={{
              padding: "24px 0",
              // background: colorBgContainer,
              // borderRadius: borderRadiusLG,
            }}
          >
            <Sider
              style={
                {
                  // background: colorBgContainer
                }
              }
              width={200}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                // defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
                items={items2}
              />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Suspense
                fallback={
                  <div>
                    <Preloader />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Navigate to="/profile" />} />
                  <Route path="/dialogs/*" element={<DialogsContainer />} />
                  <Route
                    path="/profile/:userId?"
                    element={<ProfileContainer />}
                  />
                  <Route
                    path="/developers"
                    element={<UsersPage pageTitle={"САМУРАИ"} />}
                  />
                  <Route path="/login" element={<LoginPage />} />
                </Routes>
              </Suspense>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Samurai Social NetWork ©{new Date().getFullYear()} Created by
          IT-Kamasutra
        </Footer>
      </Layout>
      // <div className="app-wrapper">
      //   <HeaderContainer />
      //   <Navbar />
      //   <div className="app-wrapper-content">
      //     <Suspense
      //       fallback={
      //         <div>
      //           <Preloader />
      //         </div>
      //       }
      //     >
      //       <Routes>
      //         <Route path="/" element={<Navigate to="/profile" />} />
      //         <Route path="/dialogs/*" element={<DialogsContainer />} />
      //         <Route path="/profile/:userId?" element={<ProfileContainer />} />
      //         <Route
      //           path="/users"
      //           element={<UsersPage pageTitle={"САМУРАИ"} />}
      //         />
      //         <Route path="/login" element={<LoginPage />} />
      //       </Routes>
      //     </Suspense>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const SamuraiJSApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};
export default SamuraiJSApp;
