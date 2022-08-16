import { Server, Socket } from "socket.io";
import { Server as httpServer } from "http";
import { PrismaClient } from "@prisma/client";

const DEVICES = "/devices";
const ADMIN = "/admin";

const PORT = 3001;
const prisma = new PrismaClient();

let connectedDevices: any[] = [];

interface OrderItems {
  productId: number;
  quantity: number;
}
interface NewOrder {
  device: number;
  orders: Array<OrderItems>;
}

function deviceConnect(socket: Socket, msg: any) {
  socket.join(DEVICES);
  connectedDevices
    .push({ id: msg.id, connectionId: socket.id });
  console.log(`DEVICE IS ONLINE : ${msg.token}`);
}

function adminConnect(socket: Socket, msg: any) {
  socket.join (ADMIN)
}
async function newOrder(socket: Socket, msg: NewOrder) {

}

function onDisconnect(socket: Socket) {
  connectedDevices = connectedDevices
    .filter((it) => {
      const cond = it.connectedDevices !== socket.id;
      if (cond) {
        socket.in(ADMIN).emit("deviceDisconnect", it);
        console.log(`DEVICE IS OFFLINE : ${socket.id}`);
      }
      return cond;
    });
}

export default function (server: httpServer) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    socket.on("deviceConnect", (msg) => deviceConnect(socket, msg));
    socket.on("adminConnect", (msg) => adminConnect(socket, msg));
    socket.on("deviceListRequest", 
      () => {
        console.log("DEVICE LIST REQUEST: ", connectedDevices)
        socket.emit("deviceListResponse", connectedDevices)
    });
    socket.on("newOrder", (msg) => newOrder(socket, msg));
    socket.on("disconnect", () => onDisconnect(socket));
  });

  io.listen(PORT);

  console.log(`WebSocket listening on port ${PORT}`);
}
