import React, { useEffect } from "react";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import {
  FilterType,
  follow,
  requestUsers,
  unfollow,
} from "../../redux/users-reducer";
import { useSelector } from "react-redux";
import {
  getcurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from "../../redux/users-selectors";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/redux-store";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Users: React.FC = (props) => {
  const users = useSelector(getUsers);
  const totalItemsCount = useSelector(getTotalUsersCount);
  const page = useSelector(getcurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress);

  type QueryParamsType = {
    term?: string;
    page?: string;
    friend?: string;
  };
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  debugger;
  useEffect(() => {
    let parsed: QueryParamsType = {
      term: searchParams.get("term") ?? undefined,
      page: searchParams.get("page") ?? undefined,
      friend: searchParams.get("friend") ?? undefined,
    };
    let actualPage = page;
    let actualFilter = filter;
    if (!!parsed.page) actualPage = Number(parsed.page);

    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term };

    switch (parsed.friend) {
      case "null":
        actualFilter = { ...actualFilter, friend: null };
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true };
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false };
    }
    dispatch(requestUsers(actualPage, pageSize, actualFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const query: QueryParamsType = {};
    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (page !== 1) query.page = String(page);

    const queryString = new URLSearchParams(query).toString();
    navigate({
      pathname: "/developers",
      search: queryString,
    });
  }, [filter, navigate, page]);

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
