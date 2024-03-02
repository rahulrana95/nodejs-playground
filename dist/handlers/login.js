"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../auth");
const tokens_1 = require("../auth/tokens");
const prisma_1 = __importDefault(require("../prisma"));
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // find username in db
    const user = yield prisma_1.default.userLogin.findUnique({
        where: {
            username,
        },
    });
    if (!user) {
        res.status(401).json({
            username,
            token: "Username not found",
        });
    }
    if (!(0, auth_1.comparePasswords)(user.password, password)) {
        res.status(401);
        res.json({
            username,
            token: "unauthorized",
        });
    }
    ;
    const token = (0, tokens_1.createToken)(username);
    (0, tokens_1.addTokenToCookie)(res, token);
    res.status(200);
    res.json({
        username,
        token
    });
});
exports.default = loginHandler;
//# sourceMappingURL=login.js.map