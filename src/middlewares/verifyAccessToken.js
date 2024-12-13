import jwt from "jsonwebtoken";

export const verifyAccessToken = (req, res, next) => {
  try {
    if (!req.headers.length) {
      const accessToken = req.headers.authorization;
      const accessTokenSplit = accessToken.split(" ")[1];

      jwt.verify(
        accessTokenSplit,
        process.env.JWT_SECRET_ACCES_TOKEN,
        (err, decoded) => {
          req.id_user = decoded.id_user;
        }
      );
      next();
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
