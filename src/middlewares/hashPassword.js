import argon2 from "argon2";

export const hashedPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hashingOptions = {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      paralleslism: 1,
    };
    const hashedPassword = await argon2.hash(password, hashingOptions);
    delete req.body.password;
    req.body.hashedPassword = hashedPassword;
    next();
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
