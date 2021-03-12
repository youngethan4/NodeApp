const userRouter = require("./user.route");
const authRouter = require("./auth.route");

const router = (app) => {
  app.use("/api/user", userRouter);
  app.use("/auth", authRouter);
};

module.exports = router;
