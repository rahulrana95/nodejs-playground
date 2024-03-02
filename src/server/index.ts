import { Server } from "socket.io";
import appServer from "./server";
import SocketHandler from "../handlers/socket";
import VideoHandler from "../handlers/socket/video";

const server = appServer.listen("3001", () => {
  console.log("server at 3001");
});

const io = new Server(server, {
  // options
});

SocketHandler(io);
// VideoHandler(io);
