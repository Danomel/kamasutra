const subscribers = {
  "message-received": [] as MessagesReceivedSubscriberType[],
  "status-changed": [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null;

type EventsNamesType = "message-received" | "status-changed" 

const closeHandler = () => {
  notifySubscribersAboutStatus("pending")
  console.log("close ws");
  setTimeout(createChannel, 3000)
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers["message-received"].forEach((s: MessagesReceivedSubscriberType) => s(newMessages))
};

const openHandler = () => {
  notifySubscribersAboutStatus("ready")
};

const errorHandler = () => {
  notifySubscribersAboutStatus("error")
  console.log("REFRESH PAGE")
};

const cleanUp = () => {
  ws?.removeEventListener("close", closeHandler);
  ws?.removeEventListener("message", messageHandler);
  ws?.removeEventListener("open", openHandler);
  ws?.removeEventListener("error", errorHandler);
}

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers["status-changed"].forEach((s: StatusChangedSubscriberType) => s(status))
}

function createChannel() {
  cleanUp()
  ws?.close();
  ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
  notifySubscribersAboutStatus("pending")
  ws.addEventListener("close", closeHandler);
  ws.addEventListener("message", messageHandler);
  ws.addEventListener("open", openHandler);
  ws.addEventListener("error", errorHandler);
}

export const chatAPI = {
  start() {
    createChannel()
  },
  stop() {
    subscribers["message-received"] = []
    subscribers["status-changed"] = []
    cleanUp()
    ws?.close();
  },
  subscribe(EventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    subscribers[EventName].push(callback as any);  // Явное указание типа
    return () => {
      // @ts-ignore
      subscribers[EventName] = subscribers[EventName].filter((s: any) => s !== callback)
    }
  },
  unsubscribe(EventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    // @ts-ignore
    subscribers[EventName] = subscribers[EventName].filter((s: any) => s !== callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  }
}

type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

export type ChatMessageAPIType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

export type StatusType = "pending" | "ready" | "error"
