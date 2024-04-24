const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE = "SEND_MESSAGE";
const initialState = {
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
  ],
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
  ],
  newMessageBody: "",
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

const dialogsReducer = (state = initialState, action) => {
  let stateCopy = { ...state, messages: [...state.messages] };
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY: {
      stateCopy.newMessageBody = action.body;
      return stateCopy;
    }
    case SEND_MESSAGE: {
      let body = state.newMessageBody;
      stateCopy.newMessageBody = "";
      stateCopy.messages.push({
        id: 6,
        message: body,
      });
      return stateCopy;
    }
    default:
      return state;
  }
};

export const sendMessageCreater = () => ({
  type: SEND_MESSAGE,
});

export const updateNewMessageBodyCreater = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body,
});

export default dialogsReducer;
