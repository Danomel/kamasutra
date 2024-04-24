import styles from "./users.module.css";

const Users = (props) => {
  debugger;
  if (props.users.lenght === 0) {
    props.setUsers([
      {
        id: 1,
        photoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9_%D0%9C%D0%B5%D0%B4%D0%B2%D0%B5%D0%B4%D0%B5%D0%B2_%2808-04-2022%29.jpg/270px-%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9_%D0%9C%D0%B5%D0%B4%D0%B2%D0%B5%D0%B4%D0%B5%D0%B2_%2808-04-2022%29.jpg",
        fullName: "Dmitry",
        status: "I'm a boss",
        location: { city: "Minsk", country: "Belarus" },
        followed: false,
      },
      {
        id: 2,
        photoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9_%D0%9C%D0%B5%D0%B4%D0%B2%D0%B5%D0%B4%D0%B5%D0%B2_%2808-04-2022%29.jpg/270px-%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9_%D0%9C%D0%B5%D0%B4%D0%B2%D0%B5%D0%B4%D0%B5%D0%B2_%2808-04-2022%29.jpg",
        fullName: "Sasha",
        status: "I'm a boss too",
        location: { city: "Moscow", country: "Russia" },
        followed: true,
      },
      {
        id: 3,
        photoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9_%D0%9C%D0%B5%D0%B4%D0%B2%D0%B5%D0%B4%D0%B5%D0%B2_%2808-04-2022%29.jpg/270px-%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9_%D0%9C%D0%B5%D0%B4%D0%B2%D0%B5%D0%B4%D0%B5%D0%B2_%2808-04-2022%29.jpg",
        fullName: "Andrew",
        status: "I'm a boss too",
        location: { city: "Kiev", country: "Ukraine" },
        followed: false,
      },
    ]);
  }

  return (
    <div>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <img src={u.photoUrl} alt="хуй" className={styles.userPhoto} />
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    props.unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.follow(u.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.fullname}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{u.location.city}</div>
              <div>{u.location.country}</div>
              <div></div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
