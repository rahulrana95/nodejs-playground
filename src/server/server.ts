import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from "../routes";
import loginHandler from "../handlers/login";
import signupHandler from "../handlers/signup";
import prisma, { ensureDbConnectedMiddleware } from "../prisma";
import * as dotenv from "dotenv";
import { Server } from "socket.io";
import SocketHandler from "../handlers/socket";

dotenv.config();

// Define a custom interface for the Express Request object
interface CustomRequest extends Request {
  db: typeof prisma;
}

const app = express();

console.log(ensureDbConnectedMiddleware);
ensureDbConnectedMiddleware && app.use(ensureDbConnectedMiddleware);
// Whitelist localhost
const whitelist = [
  "http://localhost",
  "https://nodejs-playground.onrender.com",
  "http://nodejs-playground.onrender.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

app.use(morgan("combined"));
// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
  res.json({
    health: "ok",
  });
});

app.use("/api", router);
app.post("/login", loginHandler);
app.post("/signup", signupHandler);

export default app;
