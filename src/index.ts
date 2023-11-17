import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import handleMessage from "./handleMessage";

const client: Client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();

client.on("message", (message) => {
  if (!message.author === undefined || message.isStatus) {
    return;
  }
  handleMessage(client, message);
});

client.on("message", (message) => {
  if (message.body === "!ping") {
    message.reply("pong");
  }
});
