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
exports.deleteAllUsers = void 0;
const prisma_1 = __importDefault(require("../prisma"));
// Define a function to delete all users
const deleteAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete all records from the UserLogin table
        const deleteResult = yield prisma_1.default.userLogin.deleteMany();
        console.log(`Deleted ${deleteResult.count} users.`);
    }
    catch (error) {
        console.error('Error deleting users:', error);
    }
});
exports.deleteAllUsers = deleteAllUsers;
//# sourceMappingURL=index.js.map