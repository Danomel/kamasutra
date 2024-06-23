import { getAuthUserData } from "./auth-reducer.ts";

const INITIALIZED_SUCCESSS = "INITIALIZED_SUCCESSS";

type InitialStateType = {
  initialized: boolean
}

const initialState : InitialStateType = {
  initialized: false,
};
const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESSS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESSS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({
  type: INITIALIZED_SUCCESSS,
});

export const initializeApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
      dispatch(initializedSuccess());
    });
  };
};

export default appReducer;
