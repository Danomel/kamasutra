import React from "react";
import Paginator from "../../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import { userType } from "../../types/types.ts";

type PropsType = {
  totalItemsCount: number;
  pageSize: number;
  page: number;
  onPageChanged: (pageNumber: number) => void;
  users: Array<userType>;
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
