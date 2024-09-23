const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  let token;

  let authHeader = req.headers["authorization"];

  if (authHeader !== undefined) {
    token = authHeader.split(" ")[1];
  }

  if (token === undefined) {
    res.status(401).send({ message: "Invalid Token" });
  } else {
    jwt.verify(token, "secret_key", (err, payload) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        next();
      }
    });
  }
};

module.exports = authorization;
