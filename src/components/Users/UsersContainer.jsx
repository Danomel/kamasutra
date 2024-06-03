import { connect } from "react-redux";
import {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingProgress,
  requestUsers,
} from "../../redux/users-reducer";
import Users from "./Users";
import React from "react";
import Preloader from "../../common/preloader/preloader";
import { compose } from "redux";
import {
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getPages,
  getTotalUsersCount,
  getUsers,
  getcurrentPage,
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    const { page, pageSize } = this.props;
    this.props.requestUsers(page, pageSize);
  }
  onPageChanged = (pageNumber) => {
    const { pageSize } = this.props;
    this.props.requestUsers(pageNumber, pageSize);
  };
  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
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
//     totalUsersCount: state.usersPage.totalUsersCount,
//     page: state.usersPage.page,
//     pages: state.usersPage.pages,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//   };
// };

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    // users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    page: getcurrentPage(state),
    pages: getPages(state),
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
  connect(mapStateToProps, {
    // follow: follow,
    follow,
    unfollow,
    // setCurrentPage: setCurrentPage,
    setCurrentPage,
    toggleFollowingProgress,
    requestUsers,
  })
)(UsersContainer);
