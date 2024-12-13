import { validateEmail, validatePassword } from "../consts/consts.js";

export const validation = (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // check if username | email | password not null
    if (!username || !email || !password) {
      res.status(400).json({
        status: 400,
        message: "Tous les champs sont obligatoires !",
      });
    }

    if (!validateEmail(email) || !validatePassword(password)) {
      res.status(400).json({
        status: 400,
        message: "Informations invalides",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
