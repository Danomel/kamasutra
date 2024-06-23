import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer.tsx";
import { withRouter } from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer.tsx";
import LoginPage from "./components/Login/Login";
import React, { Suspense, lazy } from "react";
import { Provider, connect } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer.ts";
import Preloader from "./common/preloader/preloader";
import store from "./redux/redux-store.ts";
const DialogsContainer = lazy(() =>
  import("./components/Dialogs/DialogsContainer.tsx")
);
const ProfileContainer = lazy(() =>
  import("./components/Profile/ProfileContainer")
);
class App extends React.Component {
  catchAllUnHandledErrors = (promiseRejectionEvent) => {
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
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
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
              <Route path="/profile/:userId?" element={<ProfileContainer />} />
              <Route
                path="/users"
                element={<UsersContainer pageTitle={"САМУРАИ"} />}
              />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const SamuraiJSApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};
export default SamuraiJSApp;
