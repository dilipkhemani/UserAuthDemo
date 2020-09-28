//Initialize mongoose
//These Mongoose Models represents users & roles collections in MongoDB database.
//User object will have a role with roles collection as reference.
const mongoose = require("mongoose");
const dbConfig = require("../config/db.config");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin"];

module.exports = db;
