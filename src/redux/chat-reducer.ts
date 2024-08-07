import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { chatAPI, ChatMessageAPIType, StatusType } from "api/chat-api";
import { Dispatch } from "redux";
import {v1} from "uuid"

export type ChatMessageType = ChatMessageAPIType & {id: string}
const initialState = {
  messages: [] as Array<ChatMessageType>,
  status: "pending" as StatusType
};

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "SN/chat/MESSAGES_RECEIVED":
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))].filter((m, index, array) => index >= array.length -  100),
      };
    case "SN/chat/STATUS_CHANGED":
      return {
        ...state,
        status: action.payload.status
      };
    default:
      return state;
  }
};

const actions = {
  messagesReceived: (messages: ChatMessageAPIType[]) => ({
    type: "SN/chat/MESSAGES_RECEIVED",
    payload: { messages }
  } as const),
  statusChanged: (status: StatusType) => ({
    type: "SN/chat/STATUS_CHANGED",
    payload: { status }
  } as const),
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status))
    }
  }
  return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe("message-received", newMessageHandlerCreator(dispatch));
  chatAPI.subscribe("status-changed", statusChangedHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.stop()
  chatAPI.unsubscribe("message-received", newMessageHandlerCreator(dispatch))
  chatAPI.unsubscribe("status-changed", statusChangedHandlerCreator(dispatch))
};

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message)
};

export default chatReducer;
export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
