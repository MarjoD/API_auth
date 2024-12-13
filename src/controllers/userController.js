import argon2 from "argon2";
import dotenv from "dotenv";
import { generateAccessToken } from "../consts/consts.js";
import userModel from "../models/userModel.js";

dotenv.config();

const userController = {
  create: async (req, res) => {
    try {
      const { username, email } = req.body;

      // verifier si le user n'existe pas dans la bdd
      const user = await userModel.readByEmail(email);

      if (user.length > 0) {
        res.status(401).json({
          status: 401,
          message: `user ${username} déja inscrit`,
        });
        // create le user
      } else {
        const isCreated = userModel.createUser(req.body);

        if (isCreated) {
          res
            .status(200)
            .json({ status: 200, message: `Félicitation user ${username} is created !` });
        } else {
          res.status(401).json({
            status: 401,
            message: "Error bdd",
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
  read: async (req, res) => {
    try {
      const [users] = await userModel.read();

      res.status(200).json({
        status: 200,
        message: "list des users",
        users,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
  logIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const [user] = await userModel.readByEmail(email);

      if (user) {
        // verifier le mode de passe
        const isMatch = await argon2.verify(user.hashedPassword, password);
        // si ok
        if (isMatch) {
          const accessToken = generateAccessToken({ id_user: user.id });

          return res.status(200).json({
            status: 200,
            message: `Welcome ${user.username}`,
            username: user.username,
            accessToken,
          });
        } else {
          return res.status(401).json({
            status: 401,
            message: " vérifiez vos données",
          });
        }
        // sinon
      } else {
        return res.status(404).json({
          status: 404,
          message: "Not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
};

export default userController;
