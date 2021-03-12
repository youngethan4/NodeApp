const { startServer } = require("./app");
const router = require("./routes/index");
startServer(router);
