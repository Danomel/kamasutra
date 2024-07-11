import UsersReducer, { actions, initialStateType } from "./users-reducer";
let state: initialStateType = {
users: [{
  id: 0, name: "Dimych 0", 
  followed: false, photos: {small: null, large: null}, 
  status: "status 0"
},
{
  id: 1, name: "Dimych 1", 
  followed: false, photos: {small: null, large: null}, 
  status: "status 1"
},
{
  id: 2, name: "Dimych 2", 
  followed: true, photos: {small: null, large: null}, 
  status: "status 2"
},
{
  id: 3, name: "Dimych 3", 
  followed: true, photos: {small: null, large: null}, 
  status: "status 3"
}],
pageSize: 10,
totalItemsCount: 0,
page: 1,
isFetching: true,
followingInProgress: [],
filter: {
  term: "",
  friend: null as null | boolean
}
}
beforeEach(() => {
  state = {
  users: [{
    id: 0, name: "Dimych 0", 
    followed: false, photos: {small: null, large: null}, 
    status: "status 0"
  },
  {
    id: 1, name: "Dimych 1", 
    followed: false, photos: {small: null, large: null}, 
    status: "status 1"
  },
  {
    id: 2, name: "Dimych 2", 
    followed: true, photos: {small: null, large: null}, 
    status: "status 2"
  },
  {
    id: 3, name: "Dimych 3", 
    followed: true, photos: {small: null, large: null}, 
    status: "status 3"
  }],
  pageSize: 10,
  totalItemsCount: 0,
  page: 1,
  isFetching: true,
  followingInProgress: [],
  filter: {
    term: "",
    friend: null as null | boolean
  }}
})
test("followSuccess", () => {
  const newState = UsersReducer(state, actions.followSuccess(1))
    // 3. expect
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});

test("unfollowSuccess", () => {
  const newState = UsersReducer(state, actions.unfollowSuccess(3))
    // 3. expect
  expect(newState.users[2].followed).toBeTruthy();
  expect(newState.users[3].followed).toBeFalsy();
});
