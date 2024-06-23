import profileReducer, {
  addPostActionCreater,
  deletePost,
  updateNewPostTextActionCreater,
} from "./profile-reducer.ts";
let state = {
  posts: [
    {
      id: 1,
      message: "Hi, how are you?",
      like: 20,
    },
    {
      id: 2,
      message: "It's my first post",
      like: 15,
    },
  ],
  newPostText: "",
};
test("length of posts should be incremented", () => {
  // 1. test data
  let action = addPostActionCreater("it-kamasutra.com");
  // 2. action
  let newState = profileReducer(state, action);

  // 3. expect
  expect(newState.posts.length).toBe(3);
});

test("message of new posts should be correct", () => {
  // 1. test data
  let action = addPostActionCreater("it-kamasutra.com");

  // 2. action
  let newState = profileReducer(state, action);

  // 3. expect
  expect(newState.posts[2].message).toBe("it-kamasutra.com");
});

test("after deleting length of messages should be decrement", () => {
  // 1. test data
  let action = deletePost(1);

  // 2. action
  let newState = profileReducer(state, action);

  // 3. expect
  expect(newState.posts.length).toBe(1);
});

test("after deleting length shouldn't be decrement if id is incorrect", () => {
  // 1. test data
  let action = deletePost(1000);

  // 2. action
  let newState = profileReducer(state, action);

  // 3. expect
  expect(newState.posts.length).toBe(2);
});
