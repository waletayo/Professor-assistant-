const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./environment")();

const createToken = ({ _id, name, email }) =>
  jwt.sign({ _id, name, email }, jwtSecret, { expiresIn: "365d" });

const verifyJwtToken = (token, secret) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, secret, (err, decoded) => {
      // err
      if (err) return reject(err);
      resolve(decoded);
    })
  );

module.exports = {
  createToken,
  verifyJwtToken,
};
