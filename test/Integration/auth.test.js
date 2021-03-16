const expect = require("chai").expect;
const app = require("../../app");
const request = require("supertest")(app);
const db = require("../../models");
let user = {
  username: "auth",
  email: "a@a.a",
  password: "aaaAAA",
};

describe("Auth controller tests...", () => {
  before(async () => {
    await db.sequelize.sync({ force: true });
    let res = await request.post("/auth/register").send(user).expect(200);
    user = res.body;
  });

  it("Logs in a user", async () => {
    let res = await request
      .post("/auth/login")
      .send({ username: user.username, password: user.password })
      .expect(200);
    expect(res.body.id).to.be.equal(user.id);
  });

  it("Attempts login with invalid user credentials", async () => {
    await request
      .post("/auth/login")
      .send({ username: "error", password: "error" })
      .expect(401);
  });

  it("Attempts login with invalid password", async () => {
    await request
      .post("/auth/login")
      .send({ username: user.username, password: "error" })
      .expect(401);
  });
});
