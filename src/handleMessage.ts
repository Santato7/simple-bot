import { Client, Message } from "whatsapp-web.js";
import { User } from "./types";

const userList: User[] = [];

function createUser(_message: Message) {
  let foundUser = new User("", _message.from, _message);
  userList.push(foundUser);
  return foundUser;
}

function findUserByID(_id: string) {
  let foundUser = userList.find((user) => {
    return user.whatsappID === _id;
  });

  return foundUser;
}

function invalidMessage(_msg: string) {
  const regex = /^!!!/;
  return !regex.test(_msg);
}

export default function (_client: Client, _message: Message) {
  let user = findUserByID(_message.from);
  if (!user) {
    if (invalidMessage(_message.body)) {
      return;
    }
    user = createUser(_message);
  }

  user.lastMessage = _message;

  switch (user.step) {
    case 0:
      _client.sendMessage(user.whatsappID, "Qual seu nome?");
      user.step++;
      break;

    case 1:
      user.name = _message.body;
      _client.sendMessage(
        user.whatsappID,
        `Seu nome é: ${user.name}.\nEstá correto? S/N`
      );
      user.step++;
      break;
    case 2:
      switch (user.lastMessage.body.toUpperCase()) {
        case "S":
          user.step++;
          break;
        case "N":
          _client.sendMessage(user.whatsappID, "Digite seu nome corretamente.");
          user.step--;
          break;
        default:
          _client.sendMessage(user.whatsappID, "Responda apenas com S/N");
      }
    case 3:
      _client.sendMessage(
        user.whatsappID,
        `O que deseja fazer?
      1️⃣: Opção 1 do menu.
      2️⃣: Opção 2 do menu.
      3️⃣: Opção 3 do menu.
      4️⃣: Opção 4 do menu.`
      );
  }
}
