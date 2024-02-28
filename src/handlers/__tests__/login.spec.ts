import request from 'supertest';
import app from "../../server/server";
import prisma from '../../prisma';

describe("Login test", () => {
  let user;

  beforeEach(async () => {
    user = await prisma.userLogin.create({
      data: {
        username: "test2@gmail.com",
        password: 'test',
        createdOn: new Date(), // Assuming you want to timestamp the creation,
          lastUpdatedOn: new Date(), // Assuming you want to timestamp the last update
          isGmailLogin: false,
          isFacebookLogin: false,
      }
    });
  });

  test('dummy test', () => {
    expect(1).toBe(1)
  });

  test("Should able to return valid data on succcessful login", async () => {
    const response = await request(app)
    .post('/signup')
    .send({username: '3ra1@gmail.com', password: '123456'})
    .set("Accept","applicatino/json");

    console.log(response)


    expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toBe(200);
  })
})