const expect = require("chai").expect;
const app = require("../../app");
const request = require("supertest")(app);
const db = require("../../models");
let user = {
  username: "ethan",
  email: "e@e.e",
  password: "eeeEEE",
  role: 1,
};

describe("User controller tests...", () => {
  before(async () => {
    await db.sequelize.sync({ force: true });
    let res = await request.post("/auth/register").send(user);
    user = res.body;
  });

  it("Gets a user", async () => {
    let res = await request.get("/api/user/" + user.id).expect(200);
    expect(res.body.username).to.be.equal(user.username);
  });

  it("Gets all users", async () => {
    let res = await request.get("/api/user").expect(200);
    expect(res.body).to.be.a("array");
  });

  it("Updates a user", async () => {
    let res = await request
      .put("/api/user/" + user.id)
      .send({ username: "eee", ...user })
      .expect(200);
    expect(res.body[0]).to.be.equal(1);
  });

  after(async () => {
    await request.delete("/api/user/" + user.id).expect(204);
  });
});
