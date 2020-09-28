const mongoose = require("mongoose");
const db = require("../models");
const { decrypt } = require("../utils/crypto");
const User = db.user;
const Role = db.role;

exports.adminBoard = (req, res) => {
  //We get only the columns were are interested in from Mongodb
  const usersProjection = {
    __v: false,
    role: false,
    password: false,
    username: false,
  };

  Role.findOne({
    name: "user",
  }).exec((err, role) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    User.find(
      {
        role: mongoose.Types.ObjectId(role._id),
      },
      usersProjection
    ).exec((err, users) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      const userRes = users.map((user) => {
        user.ssn = decrypt(user.ssn);
        return user;
      });

      res.status(200).send(JSON.stringify(userRes));
    });
  });
};
