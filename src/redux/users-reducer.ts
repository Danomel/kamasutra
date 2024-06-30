import { Dispatch } from "redux";
import { UserType } from "../types/types";
import { updateObjectArray } from "../utils/object-helpers";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { usersAPI } from "../api/usersAPI.ts";

const initialState = {
  users: [] as Array<UserType>,
  newPostText: "it-kamasutra.com",
  pageSize: 10,
  totalItemsCount: 0,
  page: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
};
const UsersReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case "SN/USERS/FOLLOW":
      return {
        ...state,
        users: updateObjectArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case "SN/USERS/UNFOLLOW":
      return {
        ...state,
        users: updateObjectArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case "SN/USERS/SET_USERS":
      return { ...state, users: action.users };
    case "SN/USERS/SET_CURRENT_PAGE":
      return { ...state, page: action.page };
    case "SN/USERS/SET_TOTAL_USERS_COUNT":
      return {
        ...state,
        totalItemsCount: action.totalCount,
        // action.totalCount > 45 ? (action.totalCount = 50) : action.totalCount,
      };
    case "SN/USERS/TOGGLE_IS_FETCHING":
      return { ...state, isFetching: action.isFetching };
    case "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS":
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

export const actions = {
  followSuccess: (userId: number) =>
    ({
      type: "SN/USERS/FOLLOW",
      userId,
    } as const),

  unfollowSuccess: (userId: number) =>
    ({
      type: "SN/USERS/UNFOLLOW",
      userId,
    } as const),

  setUsers: (users: Array<UserType>) =>
    ({
      type: "SN/USERS/SET_USERS",
      users,
    } as const),

  setCurrentPage: (page: number) =>
    ({
      type: "SN/USERS/SET_CURRENT_PAGE",
      page,
    } as const),

  setUsersTotalCount: (totalCount: number) =>
    ({
      type: "SN/USERS/SET_TOTAL_USERS_COUNT",
      totalCount,
    } as const),

  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: "SN/USERS/TOGGLE_IS_FETCHING",
      isFetching,
    } as const),

  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const),
};

// type GetStateType = () => AppStateType
export const requestUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch, getState) => {
    // let a = getState().asdasdasd.fdg;
    dispatch(actions.toggleIsFetching(true));
    let data = await usersAPI.requestUsers(page, pageSize);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setUsersTotalCount(data.totalCount));
    dispatch(actions.setCurrentPage(page));
  };
};

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  const response = await apiMethod;
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      actions.followSuccess
    );
  };
};

export const unfollow = (userId): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      actions.unfollowSuccess
    );
  };
};

export default UsersReducer;

type DispatchType = Dispatch<ActionsTypes>;
type ActionsTypes = InferActionsTypes<typeof actions>;
type initialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionsTypes>;
