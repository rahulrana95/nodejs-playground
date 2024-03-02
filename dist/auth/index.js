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
exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
// Function to hash a password
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Generate a salt
            const salt = yield bcrypt_1.default.genSalt(10);
            // Hash the password with the salt
            const hash = yield bcrypt_1.default.hash(password, salt);
            return hash;
        }
        catch (error) {
            throw new Error('Error hashing password');
        }
    });
}
exports.hashPassword = hashPassword;
function comparePasswords(plainPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Compare the plain password with the hashed password
            const isMatch = yield bcrypt_1.default.compare(plainPassword, hashedPassword);
            return isMatch;
        }
        catch (error) {
            throw new Error('Error comparing passwords');
        }
    });
}
exports.comparePasswords = comparePasswords;
function getJWTToken() {
}
//# sourceMappingURL=index.js.map