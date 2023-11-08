import { Client, Message } from "whatsapp-web.js";

let userList: User[];

function findUserByID(_id: string) {
  let user = userList.find((user) => {
    user.whatsappID === _id;
  });

  if (!user) {
    user = new User("", _id);
    userList.push(user);
  }

  return user;
}

export default function (_client: Client, _message: Message) {}
