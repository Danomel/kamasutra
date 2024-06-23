import { DialogType, MessageType } from "../types/types";

const SEND_MESSAGE = "SEND_MESSAGE";

const initialState = {
  dialogs: [
    {
      id: 1,
      name: "Dimych",
    },
    {
      id: 2,
      name: "Andrew",
    },
    {
      id: 3,
      name: "Sveta",
    },
    {
      id: 4,
      name: "Sasha",
    },
    {
      id: 5,
      name: "Viktor",
    },
    {
      id: 6,
      name: "Valera",
    },
  ] as Array<DialogType>,
  messages: [
    {
      id: 1,
      message: "Hi",
    },
    {
      id: 2,
      message: "How is your it-kamasutra",
    },
    {
      id: 3,
      message: "Yo",
    },
    {
      id: 4,
      message: "Yo",
    },
    {
      id: 5,
      message: "Yo",
    },
  ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;
// const dialogsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case UPDATE_NEW_MESSAGE_BODY:
//       return {
//         ...state,
//         newMessageBody: action.body,
//       };
//     case SEND_MESSAGE:
//       let body = state.newMessageBody;
//       return {
//         ...state,
//         messages: [...state.messages, { id: 6, message: body }],
//         newMessageBody: "",
//       };
//     default:
//       return state;
//   }
// };

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let body = action.newMessageBody;
      return {...state, messages: [...state.messages, {id: 6, message: body}]};
    }
    default:
      return state;
  }
};

type SendMessageCreaterActionType = {
  type: typeof SEND_MESSAGE,
  newMessageBody: string
}

export const sendMessageCreater = (newMessageBody: string) : SendMessageCreaterActionType => ({
  type: SEND_MESSAGE,
  newMessageBody
});

export default dialogsReducer;
