import jwt from 'jsonwebtoken';


export const createToken = (username: string) => {
  return jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Expires in 1 hour
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export const addTokenToCookie = (res, token) => { 
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
    });
}