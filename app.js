const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const port = 4000;

const startServer = (router) => {
  app.use(cors());
  app.use(express.json());

  router(app);

  server.listen(port, () => {
    console.log("Server listening on port " + port);
  });
};

exports.startServer = startServer;
