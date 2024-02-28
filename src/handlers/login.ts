import { comparePasswords } from "../auth";
import { addTokenToCookie, createToken } from "../auth/tokens";
import prisma from "../prisma";

const loginHandler = async (req, res) => {
  const { username, password } = req.body;
  

  // find username in db
  const user = await prisma.userLogin.findUnique({
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


  if (!comparePasswords(user.password, password)) {
    res.status(401);
    res.json({
      username,
      token: "unauthorized",
    });
  };

  const token = createToken(username);
  addTokenToCookie(res, token);
  


  res.status(200);
  res.json({
    username,
    token
  });
};

export default loginHandler;
