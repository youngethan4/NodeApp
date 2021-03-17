const db = require("../../models");
const app = require("../../app");
const request = require("supertest")(app);
const expect = require("chai").expect;

let make = { name: "Ford" };
let model = { name: "Sentra" };

describe("Car Model integration tests...", () => {
  before(async () => {
    try {
      await db.sequelize.sync();
      let data = await db.Make.create(make);
      make = data.dataValues;
      data = await db.CarModel.create({ makeId: make.id, ...model });
      model = data.dataValues;
    } catch (err) {
      console.error(err);
    }
  });

  it("Gets a car model", async () => {
    let res = await request.get("/api/model/" + model.id).expect(200);
    expect(res.body).to.have.property("id");
    expect(res.body.id).to.be.a("number");
  });

  it("Does not get a car model", async () => {
    await request.get("/api/model/" + 1000).expect(404);
  });

  it("Gets all car models", async () => {
    let res = await request.get("/api/model").expect(200);
    console.log(res.body);
    expect(res.body).to.be.a("array");
  });

  it("Updates a car model", async () => {
    let res = await request
      .put("/api/model/" + model.id)
      .send({ name: "Maxima" })
      .expect(200);
    let updatedModel = await request.get("/api/model/" + model.id).expect(200);
    expect(updatedModel.body.name).to.be.equal("Maxima");
  });

  it("Does not update a car model", async () => {
    await request
      .put("/api/model/" + 1000)
      .send({ name: "Maxima" })
      .expect(404);
  });

  it("Creates a car model", async () => {
    let res = await request
      .post("/api/model")
      .send({ name: "350Z", makeId: make.id })
      .expect(200);
    expect(res.body).to.have.property("id");
    expect(res.body.id).to.be.a("number");
  });

  it("Does not create a car model", async () => {
    await request
      .post("/api/model")
      .send({ name: "370Z", makeId: 1000 })
      .expect(500);
  });

  it("Deletes a car model", async () => {
    let temp = await request
      .post("/api/model")
      .send({ name: "300Z", makeId: make.id })
      .expect(200);
    await request.delete("/api/model/" + temp.body.id).expect(204);
    await request.get("/api/model/" + temp.id).expect(404);
  });

  it("Does not delete a car model", async () => {
    await request.delete("/api/model/" + 1000).expect(404);
  });
});
