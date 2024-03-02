"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const server_1 = __importDefault(require("./server"));
const socket_1 = __importDefault(require("../handlers/socket"));
const server = server_1.default.listen("3001", () => {
    console.log("server at 3001");
});
const io = new socket_io_1.Server(server, {
// options
});
(0, socket_1.default)(io);
// VideoHandler(io);
//# sourceMappingURL=index.js.map