const jwt: any = jest.createMockFromModule("jsonwebtoken");

// Mock the sign function to create JWT tokens with specific payloads
jwt.sign = (payload, secretOrPrivateKey, options) => {
  // Return a mock token with the provided payload
  return "mock.token." + JSON.stringify(payload);
};

export default jwt;
