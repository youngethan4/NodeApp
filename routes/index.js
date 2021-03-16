const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const makeRouter = require("./make.route");
const modelRouter = require("./model.route");
const carRouter = require("./car.route");

const router = (app) => {
  app.use("/api/user", userRouter);
  app.use("/auth", authRouter);
  app.use("/api/make", makeRouter);
  app.use("/api/model", modelRouter);
  app.use("/api/car", carRouter);
};

module.exports = router;
