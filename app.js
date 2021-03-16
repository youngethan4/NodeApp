const http = require("http");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const initializePassport = require("./util/initializePassport");
const session = require("express-session");
const router = require("./routes/index");
const app = express();
const server = http.createServer(app);
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

router(app);

initializePassport(passport);

server.listen(port, () => {
  console.log("Server listening on port " + port);
});

module.exports = app;
