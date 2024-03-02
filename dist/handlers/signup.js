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
const tokens_1 = require("../auth/tokens");
const prisma_1 = __importDefault(require("../prisma"));
const signupHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield prisma_1.default.userLogin.findUnique({
            where: {
                username: username,
            }
        });
        if (user) {
            res.status(400);
            res.json({
                error: 'User already exists'
            });
            return;
        }
        const newUser = yield prisma_1.default.userLogin.create({
            data: {
                username,
                password,
                createdOn: new Date(), // Assuming you want to timestamp the creation,
                lastUpdatedOn: new Date(), // Assuming you want to timestamp the last update
                isGmailLogin: false,
                isFacebookLogin: false,
            },
        });
        const token = (0, tokens_1.createToken)(username);
        (0, tokens_1.addTokenToCookie)(res, token);
        res.status(200);
        res.json({
            username,
            token,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong', message: err.message });
    }
});
exports.default = signupHandler;
//# sourceMappingURL=signup.js.map