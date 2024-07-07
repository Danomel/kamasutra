import React, { useEffect } from "react";
import Paginator from "../../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import UsersSearchForm from "./UsersSearchForm.tsx";
import {
  FilterType,
  follow,
  requestUsers,
  unfollow,
} from "../../redux/users-reducer.ts";
import { useSelector } from "react-redux";
import {
  getcurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from "../../redux/users-selectors.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/redux-store.ts";

const Users: React.FC = (props) => {
  const users = useSelector(getUsers);
  const totalItemsCount = useSelector(getTotalUsersCount);
  const page = useSelector(getcurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(requestUsers(page, pageSize, filter));
  }, [dispatch, filter, page, pageSize]);

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };
  const followUser = (userId: number) => {
    dispatch(follow(userId));
  };

  const unfollowUser = (userId: number) => {
    dispatch(unfollow(userId));
  };

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator
        page={page}
        onPageChanged={onPageChanged}
        totalItemsCount={totalItemsCount}
        pageSize={pageSize}
      />
      <div>
        {users.map((u) => (
          <User
            user={u}
            followingInProgress={followingInProgress}
            follow={followUser}
            unfollow={unfollowUser}
            key={u.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
