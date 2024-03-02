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
const client_1 = require("@prisma/client");
const child_process_1 = require("child_process");
const path_1 = require("path");
const url_1 = require("url");
const uuid_1 = require("uuid");
const generateDatabaseURL = (schema) => {
    if (!process.env.DATABASE_URL) {
        throw new Error('please provide a database url');
    }
    const url = new url_1.URL(process.env.DATABASE_URL);
    url.searchParams.append('schema', schema);
    return url.toString();
};
const schemaId = `test-${(0, uuid_1.v4)()}`;
const prismaBinary = (0, path_1.join)(__dirname, '..', '..', '..', 'node_modules', '.bin', 'prisma');
const url = generateDatabaseURL(schemaId);
process.env.DATABASE_URL = url;
const prisma = new client_1.PrismaClient({
    datasources: { db: { url } },
});
beforeEach(() => {
    (0, child_process_1.execSync)(`${prismaBinary} db push`, {
        env: Object.assign(Object.assign({}, process.env), { DATABASE_URL: generateDatabaseURL(schemaId) }),
    });
});
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`);
    yield prisma.$disconnect();
}));
exports.default = prisma;
//# sourceMappingURL=index.js.map