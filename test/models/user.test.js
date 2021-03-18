const expect = require("chai").expect;
const db = require("../../models");
let testUser = {
  username: "bobyjoe",
  email: "bobyj@gmail.com",
  password: "JollyJ03!",
  role: 1,
};
let destroyUser = {
  email: "boby@gmail.com",
  ...testUser,
};

describe("User model tests...", () => {
  before(async () => {
    try {
      await db.sequelize.sync({ force: true });
      testUser = await db.User.create(testUser);
      testUser = testUser.dataValues;
      destroyUser = await db.User.create(destroyUser);
      destroyUser = destroyUser.dataValues;
    } catch (err) {
      console.error(err);
    }
  });

  it("Creates a user with an id", async () => {
    let user;
    try {
      user = await db.User.create({
        email: "b@b.b",
        username: "bb",
        password: "testest",
        role: 1,
      });
      user = user.dataValues;
    } catch (err) {
      console.error(err);
    }
    expect(user).to.have.property("id");
    expect(user.id).to.be.a("number");
  });

  it("Gets user from db", async () => {
    let user;
    try {
      user = await db.User.findByPk(testUser.id);
      user = user.dataValues;
    } catch (err) {
      console.error(err);
    }
    expect(user.id).to.equal(testUser.id);
  });

  it("Gets all users", async () => {
    let users;
    try {
      users = await db.User.findAll();
    } catch (err) {
      console.error(err);
    }
    expect(users).to.be.a("array");
  });

  it("Updates a user", async () => {
    let res;
    try {
      res = await db.User.update(
        { username: "billybob" },
        { where: { id: testUser.id } }
      );
    } catch (err) {
      console.error(err);
    }
    expect(res[0]).to.be.equal(1);
  });

  it("Deletes a user", async () => {
    let data;
    let user;
    try {
      data = await db.User.destroy({ where: { id: destroyUser.id } });
      user = await db.User.findByPk(destroyUser.id);
    } catch (err) {
      console.error(err);
    }
    expect(data).to.be.equal(1);
    expect(user).to.be.null;
  });
});
