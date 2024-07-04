import { DialogType, MessageType } from "../types/types";
import { InferActionsTypes } from "./redux-store";


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
        
        const dialogsReducer = (state = initialState, action: ActionsTypes):
        InitialStateType => {
          switch (action.type) {
            case "SN/DIALOGS/SEND_MESSAGE": {
              let body = action.newMessageBody;
              return {...state, messages: [...state.messages, {id: 6, message: body}]};
            }
    default:
      return state;
  }
};
export const actions = {
  sendMessage :(newMessageBody: string)  => ({
    type: "SN/DIALOGS/SEND_MESSAGE",
    newMessageBody
  }) as const}
  
  export default dialogsReducer;
  
  export type InitialStateType = typeof initialState;
  type ActionsTypes = InferActionsTypes<typeof actions>