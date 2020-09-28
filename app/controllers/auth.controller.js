const config = require("../config/auth.config");
const db = require("../models");
const { encrypt, decrypt } = require("../utils/crypto");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  //if admin key has been provided , it is an admin user. First make sure we are verifying the key before proceeding

  if (config.secret !== req.body.adminkey && req.body.role === "admin") {
    res.status(500).send({ message: "Invalid Admin key provided." });
    return;
  }

  const user = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    telephone: req.body.telephone,
    fulladdress: req.body.fulladdress,
    password: bcrypt.hashSync(req.body.password, 8),
    ssn: req.body.ssn ? encrypt(req.body.ssn) : undefined,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    //if no role then it is user role
    if (req.body.role) {
      Role.findOne(
        {
          name: req.body.role,
        },
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.role = role._id;

          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.role = role._id;

        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("role", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        telephone: user.telephone,
        fulladdress: user.fulladdress,
        ssn: user.ssn ? decrypt(user.ssn) : undefined,
        role: user.role.name,
        accessToken: token,
      });
    });
};
