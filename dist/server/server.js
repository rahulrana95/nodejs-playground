"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("../routes"));
const login_1 = __importDefault(require("../handlers/login"));
const signup_1 = __importDefault(require("../handlers/signup"));
const prisma_1 = require("../prisma");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
console.log(prisma_1.ensureDbConnectedMiddleware);
prisma_1.ensureDbConnectedMiddleware && app.use(prisma_1.ensureDbConnectedMiddleware);
// Whitelist localhost
const whitelist = [
    "http://localhost",
    "https://nodejs-playground.onrender.com",
    "http://nodejs-playground.onrender.com",
];
const corsOptions = {
    origin: function (origin, callback) {
        console.log(`Request from ${origin}`);
        callback(null, true);
        return;
        // if (whitelist.includes(origin)) {
        //   callback(null, true);
        // } else {
        //   console.log(`This ${origin} is not allowed by cors.`);
        //   callback(new Error("Not allowed by CORS"));
        // }
    },
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)("combined"));
// Parse JSON bodies
app.use(body_parser_1.default.json());
// Parse URL-encoded bodies
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.status(200);
    res.json({
        health: "ok",
    });
});
app.use("/api", routes_1.default);
app.post("/login", login_1.default);
app.post("/signup", signup_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map