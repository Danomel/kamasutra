import React from "react";
import Paginator from "../../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import { UserType } from "../../types/types.ts";
import UsersSearchForm from "./UsersSearchForm.tsx";
import { FilterType } from "../../redux/users-reducer.ts";

type PropsType = {
  totalItemsCount: number;
  pageSize: number;
  page: number;
  onPageChanged: (pageNumber: number) => void;
  onFilterChanged: (filter: FilterType) => void;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};

const Users: React.FC<PropsType> = ({
  onPageChanged,
  page,
  totalItemsCount,
  pageSize,
  users,

  ...props
}) => {
  return (
    <div>
      <UsersSearchForm onFilterChanged={props.onFilterChanged} />
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
            followingInProgress={props.followingInProgress}
            unfollow={props.unfollow}
            follow={props.follow}
            key={u.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
