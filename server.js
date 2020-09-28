//Express Web Server Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dbConfig = require("./app/config/db.config");
require("dotenv").config();

const app = express();

//ensure we only allow CORS from the client we are expecting
//cors provides Express middleware to enable CORS
const corsOptions = {
  origin: process.env.corsOrigin || "http://localhost:3000",
};
app.use(cors(corsOptions));

//parse content-type - application/json requests
//body-parser helps to parse the request and create the req.body object
app.use(bodyParser.json());
//parse content-type - applications/x-www-form-url encoded requests
app.use(bodyParser.urlencoded({ extended: true }));

//Configure mongoose to mongo db
const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(
    process.env.MONGODB_URI ||
      `mongodb+srv://${dbConfig.HOST}/${dbConfig.DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000,
    }
  )
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

//create the roles in the db
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({ name: "user" }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({ name: "admin" }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

//Below setupd done to enable client to be embedded in server.
//Deployment done to Heroku
// ... other app.use middleware
app.use(express.static(path.join(__dirname, "client", "build")));

//This code is added so that express also serves the react files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
