import { ResultCodeForCaptchaEnum, ResultCodesEnum } from "../api/api.ts";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { authAPI } from "../api/authAPI.ts";
import { securityAPI } from "../api/securityAPI.ts";


const initialState = {
  userId: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false as boolean,
  captchaUrl: null as string | null, // if null, then captcha is not required
};


const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "SET_USER_DATA":
    case "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, 
    isAuth: boolean) => ({
    type: "SET_USER_DATA",
    payload: { userId, email, login, isAuth, },
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS",
    payload: {captchaUrl},
  } as const)
}


export const getAuthUserData = () : 
ThunkType => async (dispatch) => {
  const meData = await authAPI.me();
  if (meData.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = meData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean, setStatus: any, captcha: any) : 
  ThunkType => async (dispatch) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      setStatus({ error: loginData.messages });
    }
  };

export const logout = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>