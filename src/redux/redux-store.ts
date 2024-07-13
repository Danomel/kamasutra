import {
  Action,
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer.js";
import UsersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import { ThunkAction, thunk } from "redux-thunk";
import appReducer from "./app-reducer";
import chatReducer from "./chat-reducer";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: UsersReducer,
  auth: authReducer,
  app: appReducer,
  chat: chatReducer
});

type RootReducerType = typeof rootReducer; // (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>;

export type AppDispatch = typeof store.dispatch

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

// @ts-ignore
let store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));
// @ts-ignore
window.store = store;

export default store;
