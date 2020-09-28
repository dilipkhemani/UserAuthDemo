const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

//check duplications for username
checkDuplicateUsername = (req, res, next) => {
  //Username
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    next();
  });
};

//check if roles in the request is legal or not
checkRolesExisted = (req, res, next) => {
  if (req.body.role) {
    if (!ROLES.includes(req.body.role)) {
      res.status(400).send({
        message: `Failed! Role ${req.body.role} does not exist!`,
      });
      return;
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsername,
  checkRolesExisted,
};

module.exports = verifySignUp;
