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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDbConnectedMiddleware = void 0;
// prisma.ts
const client_1 = require("@prisma/client");
const testConfig = {
    datasources: {
        db: {
            url: "file:mydatabase.db",
        },
    },
};
const prisma = process.env.TEST_ENV === "TEST"
    ? new client_1.PrismaClient(testConfig)
    : new client_1.PrismaClient();
const ensureDbConnectedMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ensure Prisma client is connected to the database
        yield prisma.$connect();
        //   req.db = prisma; // Attach Prisma client to the request object
        next();
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        next(error); // Pass error to the error handling middleware
    }
});
exports.ensureDbConnectedMiddleware = ensureDbConnectedMiddleware;
console.log(ensureDbConnectedMiddleware);
exports.default = prisma;
//# sourceMappingURL=index.js.map