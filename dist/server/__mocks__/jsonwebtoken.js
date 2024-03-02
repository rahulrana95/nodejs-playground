"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = jest.createMockFromModule("jsonwebtoken");
// Mock the sign function to create JWT tokens with specific payloads
jwt.sign = (payload, secretOrPrivateKey, options) => {
    // Return a mock token with the provided payload
    return "mock.token." + JSON.stringify(payload);
};
exports.default = jwt;
//# sourceMappingURL=jsonwebtoken.js.map