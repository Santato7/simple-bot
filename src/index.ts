import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

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
  if (message.author === undefined && !message.isStatus) {
    console.log("aaaaaaaaaaaaaaaaaaaaa");
  }
  console.log(`Autor: ${message.from}, Mensagem: ${message.body}`);
});

client.on("message", (message) => {
  if (message.body === "!ping") {
    message.reply("pong");
  }
});
