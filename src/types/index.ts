import { Message } from "whatsapp-web.js";

export class User {
  name: string;
  whatsappID: string;
  step: number = 0;
  lastMessage: Message;

  constructor(_name: string, _whatsappID: string, _lastMessage: Message) {
    this.name = _name;
    this.whatsappID = _whatsappID;
    this.lastMessage = _lastMessage;
  }
}
