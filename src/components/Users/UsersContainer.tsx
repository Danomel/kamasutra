import Users from "./Users";
import React from "react";
import Preloader from "../../common/preloader/preloader";
import { getIsFetching } from "../../redux/users-selectors";
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
