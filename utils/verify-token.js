/* eslint-disable brace-style */
const { verifyJwtToken } = require("../config/jwt");
const logger = require("../config/winston");
const { jwtSecret } = require("../config/environment")();

const validateAccessToken = (req, res, next) => {
  try {
    const token = req?.headers?.Authorization || req?.headers?.authorization;

    const getToken = token?.split(":")[1]?.trim();

    verifyJwtToken(getToken, jwtSecret)
      .then((data) => {
        req.sub = data;
        req.userId = data._id;
        next();
      })
      .catch((err) => {
        logger.log("token validation error", err);
        res
          .status(401)
          .json({
            success: false,
            message: "Invalid access token",
            data: {},
          })
          .end();
      });
  } catch (error) {
    next(error);
  }
};

module.exports = validateAccessToken;
