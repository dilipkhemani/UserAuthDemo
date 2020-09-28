let mongoose = require("mongoose");
const db = require("../app/models");
const config = require("../app/config/auth.config");
const User = db.user;
const Role = db.role;

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
const requestURL = "http://localhost:8000";

//Accesstokens after login
let accessTokenUser;
let accessTokenAdmin;

chai.use(chaiHttp);

describe("Users", () => {
  before((done) => {
    //Before each test we empty the database
    User.deleteMany(
      { username: { $in: ["_TestUser", "_TestAdmin"] } },
      (err) => {
        done();
      }
    );
  });

  describe("/POST Register New User", () => {
    it("Register a user", (done) => {
      let user = {
        username: "_TestUser",
        password: "_TestPassword",
        firstname: "linqpal_firstname",
        lastname: "linqpal_lastname",
        telephone: "123456789",
        fulladdress: "linqpal address",
        ssn: "linqpal ssn",
        role: "user",
      };
      chai
        .request(requestURL)
        .post("/api/auth/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eql("User was registered successfully!");
          done();
        });
    });
    it("Reject duplicate user", (done) => {
      let user = {
        username: "_TestUser",
        password: "_TestPassword",
        firstname: "linqpal_firstname",
        lastname: "linqpal_lastname",
        telephone: "9876543",
        fulladdress: "linqpal address",
        ssn: "linqpal ssn",
        role: "user",
      };
      chai
        .request(requestURL)
        .post("/api/auth/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("message")
            .eql("Failed! Username is already in use!");
          done();
        });
    });
  });

  describe("/POST Register New Admin", () => {
    it("Register an admin", (done) => {
      let user = {
        username: "_TestAdmin",
        password: "_TestPassword",
        role: "admin",
        adminkey: config.secret,
      };
      chai
        .request(requestURL)
        .post("/api/auth/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eql("User was registered successfully!");
          done();
        });
    });
    it("Reject duplicate admin", (done) => {
      let user = {
        username: "_TestAdmin",
        password: "_TestPassword",
        role: "admin",
        adminkey: config.secret,
      };
      chai
        .request(requestURL)
        .post("/api/auth/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("message")
            .eql("Failed! Username is already in use!");
          done();
        });
    });
    it("Admin key not provided", (done) => {
      let user = {
        username: "_TestAdmin1",
        password: "_TestPassword",
        role: "admin",
      };
      chai
        .request(requestURL)
        .post("/api/auth/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have
            .property("message")
            .eql("Invalid Admin key provided.");
          done();
        });
    });
    it("Incorrect Admin key", (done) => {
      let user = {
        username: "_TestAdmin1",
        password: "_TestPassword",
        role: "admin",
        adminkey: "xyz",
      };
      chai
        .request(requestURL)
        .post("/api/auth/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have
            .property("message")
            .eql("Invalid Admin key provided.");
          done();
        });
    });
  });

  describe("/POST Login User/Admin", () => {
    it("User Login correct username and password", (done) => {
      let user = {
        username: "_TestUser",
        password: "_TestPassword",
      };
      chai
        .request(requestURL)
        .post("/api/auth/signin")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          accessTokenUser = res.body.accessToken;
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          res.body.should.have.property("username");
          res.body.should.have.property("firstname");
          res.body.should.have.property("lastname");
          res.body.should.have.property("telephone");
          res.body.should.have.property("fulladdress");
          res.body.should.have.property("ssn");
          res.body.should.have.property("role");
          res.body.should.have.property("accessToken");
          done();
        });
    });

    it("User Login correct username and incorrect password", (done) => {
      let user = {
        username: "_TestUser",
        password: "_TestPassword1",
      };
      chai
        .request(requestURL)
        .post("/api/auth/signin")
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message").eql("Invalid Password!");
          done();
        });
    });

    it("User Login incorrect username and incorrect password", (done) => {
      let user = {
        username: "_TestUser1",
        password: "_TestPassword",
      };
      chai
        .request(requestURL)
        .post("/api/auth/signin")
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message").eql("User Not found.");
          done();
        });
    });
    it("Admin Login correct username and password", (done) => {
      let user = {
        username: "_TestAdmin",
        password: "_TestPassword",
      };
      chai
        .request(requestURL)
        .post("/api/auth/signin")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          accessTokenAdmin = res.body.accessToken;
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          res.body.should.have.property("username");
          res.body.should.have.property("role");
          res.body.should.have.property("accessToken");
          done();
        });
    });
  });

  describe("/GET Admin dashboard details", () => {
    it("Try to get admin board details logged in as user", (done) => {
      chai
        .request(requestURL)
        .get("/api/test/admin")
        .set("x-access-token", accessTokenUser)
        .send()
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property("message").eql("Require Admin Role!");
          done();
        });
    });
    it("Try to get admin board details logged in as admin", (done) => {
      chai
        .request(requestURL)
        .get("/api/test/admin")
        .set("x-access-token", accessTokenAdmin)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          //console.log(accessTokenAdmin);
          //console.log(res.body);
          //res.body.should.be.a("array");
          done();
        });
    });
  });
});
