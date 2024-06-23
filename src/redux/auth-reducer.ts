import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS";

const initialState = {
  userId: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false as boolean,
  captchaUrl: null as string | null, // if null, then captcha is not required
};

export type InitialStateType = typeof initialState
const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA,
  payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) 
: SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth, },
});

type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: {captchaUrl},
});

export const getAuthUserData = () => async (dispatch: any) => {
  const response = await authAPI.me();
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean, setStatus: any, captcha: any) => async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }
      setStatus({ error: response.data.messages });
    }
  };

export const logout = () => async (dispatch: any) => {
  const response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
