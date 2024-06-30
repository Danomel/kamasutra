import { getAuthUserData } from "./auth-reducer.ts";
import { InferActionsTypes } from "./redux-store.ts";


const initialState = {
  initialized: false,
};

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SN/APP/INITIALIZED_SUCCESSS":
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};


export const actions = {
  initializedSuccess: () => ({
    type: "SN/APP/INITIALIZED_SUCCESSS",
  } as const),
}

export const initializeApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
      dispatch(actions.initializedSuccess());
    });
  };
};

export default appReducer;
