import { WebSocketServer } from "ws";
import { client } from "@repo/db";

const server = new WebSocketServer({
  port: 3001,
});

server.on("connection", async (socket) => {
  socket.send("Hi there, you are connected tot the server");
  const res = await client.user.create({
    data: {
      email: Math.random().toString(),
      password: Math.random().toString(),
    },
  });
  console.log(res);
});
