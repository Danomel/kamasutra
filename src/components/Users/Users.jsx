import Paginator from "../../common/Paginator/Paginator";
import User from "./User";

const Users = ({
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
