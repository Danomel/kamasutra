import Users from "./Users.tsx";
import React from "react";
import Preloader from "../../common/preloader/preloader.tsx";
import { getIsFetching } from "../../redux/users-selectors.ts";
import { useSelector } from "react-redux";
type UsersPagePropsType = {
  pageTitle: string;
};

const UsersPage: React.FC<UsersPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching);
  return (
    <>
      <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};
export default UsersPage;
