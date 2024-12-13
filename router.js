import express from "express";
import { identification } from "./src/middlewares/identification.js";
import userController from "./src/controllers/userController.js";
import { hashedPassword } from "./src/middlewares/hashPassword.js";
import { validation } from "./src/middlewares/validation.js";
import { verifyAccessToken } from "./src/middlewares/verifyAccessToken.js";

const router = express.Router();

//the following route allows to check if API is up
router.get("/health", (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      message: "Hello ! The API is up !",
    });
  } catch (error) {
    res.status(500).json({
      status: 200,
      message: error.message,
    });
  }
});

router.get("/users", verifyAccessToken, userController.read);
router.post("/signup", validation, hashedPassword, userController.create);
router.post("/login", identification, userController.logIn);

export default router;