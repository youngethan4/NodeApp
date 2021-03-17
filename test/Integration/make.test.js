const db = require("../../models");
const app = require("../../app");
const request = require("supertest")(app);
const expect = require("chai").expect;

let make = { name: "Ford" };

describe("Car Make integration tests...", () => {
  before(async () => {
    try {
      db.sequelize.sync();
      let data = await db.Make.create(make);
      make = data.dataValues;
    } catch (err) {
      console.error(err);
    }
  });

  it("Gets a car make", async () => {
    let res = await request.get("/api/make/" + make.id).expect(200);
    expect(res.body.id).to.be.equal(make.id);
  });

  it("Does not get a car make", async () => {
    await request.get("/api/make/" + 1000).expect(404);
  });

  it("Gets all car makes", async () => {
    let res = await request.get("/api/make").expect(200);
    expect(res.body).to.be.a("array");
  });

  it("Updates a car make", async () => {
    let res = await request
      .put("/api/make/" + make.id)
      .send({ name: "Chevy" })
      .expect(200);
    let updatedMake = await request.get("/api/make/" + make.id).expect(200);
    expect(res.body[0]).to.be.equal(1);
    expect(updatedMake.body.name).to.be.equal("Chevy");
  });

  it("Does not update a car make", async () => {
    await request
      .put("/api/make/" + 1000)
      .send({ name: "Chevy" })
      .expect(404);
  });

  it("Creates a new car make", async () => {
    let res = await request
      .post("/api/make")
      .send({ name: "Nissan" })
      .expect(200);
    expect(res.body).to.have.property("id");
    expect(res.body.id).to.be.a("number");
  });

  it("Deletes a car make", async () => {
    let temp = await request
      .post("/api/make")
      .send({ name: "BMW" })
      .expect(200);
    temp = temp.body;
    await request.delete("/api/make/" + temp.id).expect(204);
  });

  it("Does not delete a car make", async () => {
    await request.delete("/api/make/" + 1000).expect(404);
  });
});
