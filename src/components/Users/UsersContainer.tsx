import { connect } from "react-redux";
import { follow, unfollow, requestUsers } from "../../redux/users-reducer.ts";
import Users from "./Users.tsx";
import React from "react";
import Preloader from "../../common/preloader/preloader.js";
import { compose } from "redux";
import {
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getcurrentPage,
} from "../../redux/users-selectors.ts";
import { UserType } from "../../types/types.ts";
import { AppStateType } from "../../redux/redux-store.ts";

type MapStatePropsType = {
  page: number;
  pageSize: number;
  isFetching: boolean;
  totalItemsCount: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
};

type MapDispatchPropsType = {
  requestUsers: (page: number, pageSize: number) => void;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};

type OwnPropsType = {
  pageTitle: string;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { page, pageSize } = this.props;
    this.props.requestUsers(page, pageSize);
  }
  onPageChanged = (pageNumber: number) => {
    const { pageSize } = this.props;
    this.props.requestUsers(pageNumber, pageSize);
  };
  render() {
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalItemsCount={this.props.totalItemsCount}
          pageSize={this.props.pageSize}
          page={this.props.page}
          onPageChanged={this.onPageChanged}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          users={this.props.users}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

// let mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalItemsCount: state.usersPage.totalItemsCount,
//     page: state.usersPage.page,
//     pages: state.usersPage.pages,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//   };
// };

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    // users: getUsers(state),
    pageSize: getPageSize(state),
    totalItemsCount: getTotalUsersCount(state),
    page: getcurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

// let mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => {
//       dispatch(followAC(userId));
//     },
//     unfollow: (userId) => {
//       dispatch(unfollowAC(userId));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users));
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(currentPageAC(pageNumber));
//     },
//     setTotalUsersCount: (totalCount) => {
//       dispatch(setUsersTotalCountAC(totalCount));
//     },
//     toggleIsFetching: (isFetching) => {
//       dispatch(toggleIsFetchingAC(isFetching));
//     },
//   };
// };

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      // follow: follow,
      follow,
      unfollow,
      // setCurrentPage: setCurrentPage,
      requestUsers,
    }
  )
)(UsersContainer);
