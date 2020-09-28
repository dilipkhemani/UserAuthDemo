const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

//Process Authentication & Authorization:

//check if token is provided, legal or not.
//We get token from x-access-token of HTTP headers, then use jsonwebtoken's verify() function
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

//check if roles of the user contains required role or not
isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findOne(
      {
        _id: user.role,
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (role.name === "admin") {
          next();
          return;
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
};
module.exports = authJwt;
