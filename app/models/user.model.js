const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String, required: true },
    firstname: String,
    lastname: String,
    telephone: String,
    fulladdress: String,
    password: { type: String, required: true },
    ssn: Object,
    role: { type: mongoose.Schema.Types.Object, ref: "Role" },
  })
);

module.exports = User;
