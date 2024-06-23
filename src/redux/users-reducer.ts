import { usersAPI } from "../api/api";
import { userType } from "../types/types";
import { updateObjectArray } from "../utils/object-helpers";

const UNFOLLOW = "UNFOLLOW";
const FOLLOW = "FOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";
const initialState = {
  users: [] as Array<userType>,
  newPostText: "it-kamasutra.com",
  pageSize: 10,
  totalItemsCount: 0,
  page: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
};
type initialStateType = typeof initialState
const UsersReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_CURRENT_PAGE:
      return { ...state, page: action.page };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalItemsCount: action.totalCount,
        // action.totalCount > 45 ? (action.totalCount = 50) : action.totalCount,
      };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
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

type FollowSuccessActionType = {
  type: typeof FOLLOW,
  userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({
  type: FOLLOW,
  userId,
});

type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW,
  userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({
  type: UNFOLLOW,
  userId,
});

type SetUsersActionType = {
  type: typeof SET_USERS,
  users: Array<userType>
};

export const setUsers = (users: Array<userType>): SetUsersActionType => ({
  type: SET_USERS,
  users,
});

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE,
  page: number
}

export const setCurrentPage = (page: number): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  page,
});

type SetUsersTotalCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT,
  totalCount: number
}

export const setUsersTotalCount = (totalCount: number): SetUsersTotalCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalCount,
});

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING,
  isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type ToggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching: boolean,
  userId: number
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

export const requestUsers = (page, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.requestUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setUsersTotalCount(data.totalCount));
    dispatch(setCurrentPage(page));
  };
};

const followUnfollowFlow = async (
  dispatch: any,
  userId: number,
  apiMethod: any,
  actionCreator: any
) => {
  dispatch(toggleFollowingProgress(true, userId));
  const response = await apiMethod;
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      followSuccess
    );
  };
};

export const unfollow = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      unfollowSuccess
    );
  };
};

export default UsersReducer;
