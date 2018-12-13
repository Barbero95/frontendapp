import {ChatUser} from "./chatUser";

export class Room {
  room: String;
  users: ChatUser[];
  created: Date;
  messages: any[];
  lastMessage: String;
  lastMessageDate: Date;
}
