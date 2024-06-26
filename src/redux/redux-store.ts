import {
  Action,
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import profileReducer from "./profile-reducer.ts";
import dialogsReducer from "./dialogs-reducer.ts";
import sidebarReducer from "./sidebar-reducer.js";
import UsersReducer from "./users-reducer.ts";
import authReducer from "./auth-reducer.ts";
import { ThunkAction, thunk } from "redux-thunk";
import appReducer from "./app-reducer.ts";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: UsersReducer,
  auth: authReducer,
  app: appReducer,
});

type RootReducerType = typeof rootReducer; // (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends {[key: string]: 
  (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, undefined, A>
// @ts-ignore
let store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));
// @ts-ignore
window.store = store;

export default store;
