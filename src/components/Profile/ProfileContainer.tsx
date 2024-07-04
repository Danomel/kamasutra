import React from "react";
import Profile from "./Profile.tsx";
import { connect } from "react-redux";
import {
  getStatus,
  getUserProfile,
  savePhoto,
  saveProfile,
  updateStatus,
} from "../../redux/profile-reducer.ts";
import { useNavigate, useParams } from "react-router-dom";
import {} from "../../hoc/WithAuthRedirect.tsx";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store.ts";
import { ProfileValuesType } from "./ProfileInfo/ProfileInfo.tsx";

export function withRouter(Children) {
  return (props) => {
    let navigate = useNavigate();
    const match = { params: useParams() };
    return <Children {...props} navigate={navigate} match={match} />;
  };
}

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getStatus: (userId: any) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (values: ProfileValuesType) => void;
};
type PathParamsType = {
  navigate: ReturnType<typeof useNavigate>;
  match: { params: { userId: any } };
};
type PropsType = MapPropsType & DispatchPropsType & PathParamsType;
class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    debugger;
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        debugger;
        this.props.navigate("/login");
      }
    }
    if (userId) {
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    debugger;
    if (this.props.match.params.userId !== prevProps.match.params.userId)
      this.refreshProfile();
  }
  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
    );
  }
}
const mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter
)(ProfileContainer);
