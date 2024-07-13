import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { chatAPI, ChatMessageType } from "api/chat-api";
import { Dispatch } from "redux";


const initialState = {
  messages: [] as Array<ChatMessageType>
};


const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "SN/chat/MESSAGES_RECEIVED":
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };

    default:
      return state;
  }
};

const actions = {
  messagesReceived: (messages: ChatMessageType[] ) => ({
    type: "SN/chat/MESSAGES_RECEIVED",
    payload: { messages }
  } as const),
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreater = (dispatch: Dispatch) => {
  if(_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _newMessageHandler
}

export const startMessagesListening = () : 
ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe(newMessageHandlerCreater(dispatch));
};

export const stopMessagesListening = () : 
ThunkType => async (dispatch) => {
  chatAPI.stop()
  chatAPI.unsubscribe(newMessageHandlerCreater(dispatch))
};

export const sendMessage = (message: string) : 
ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message)
};


export default chatReducer;
export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>