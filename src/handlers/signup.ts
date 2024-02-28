import { addTokenToCookie, createToken } from "../auth/tokens";
import { deleteAllUsers } from "../delete";
import prisma from "../prisma";
import app from "../server/server";

const signupHandler = async (req, res) => {
    const { username, password } = req.body;

    try {
    const user = await prisma.userLogin.findUnique({
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

    const newUser =  await prisma.userLogin.create({
        data: {
          username,
          password,
          createdOn: new Date(), // Assuming you want to timestamp the creation,
          lastUpdatedOn: new Date(), // Assuming you want to timestamp the last update
          isGmailLogin: false,
          isFacebookLogin: false,
        },
      });

    const token = createToken(username)
    
    addTokenToCookie(res, token);

    res.status(200);
    res.json({
      username,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', message: err.message });
  }
}


export default signupHandler;