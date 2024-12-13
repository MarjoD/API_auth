import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
export const validatePassword = (password) => {
  if (password.length > 7) {
    return true;
  } else {
    return false;
  }
};

export const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET_ACCES_TOKEN, {
    expiresIn: process.env.JWT_EXP_ACCESS_TOKEN,
  });
};