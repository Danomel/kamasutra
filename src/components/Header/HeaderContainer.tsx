import React from "react";
import Header from "./Header.tsx";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer.ts";
import { AppStateType } from "../../redux/redux-store.ts";

type PropsType = MapStatePropsType & MapDispatchPropsType;

type MapStatePropsType = {
  login: string | null;
  isAuth: boolean;
};

type MapDispatchPropsType = {
  logout: () => void;
};
class HeaderContainer extends React.Component<PropsType> {
  render() {
    return (
      <Header
        login={this.props.login}
        isAuth={this.props.isAuth}
        logout={this.props.logout}
      />
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  {},
  AppStateType
>(mapStateToProps, { logout })(HeaderContainer);
