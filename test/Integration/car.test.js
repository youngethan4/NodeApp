const db = require("../../models");
const app = require("../../app");
const request = require("supertest")(app);
const expect = require("chai").expect;
const endpoint = "/api/car";

let make = { name: "Nissan" };
let model = { name: "Sentra" };
let car = {
  description: "Good condition",
  year: 1998,
  color: "Yellow",
  transmission: "Manual",
  drivetrain: "FWD",
};

describe("Car integration tests...", () => {
  before(async () => {
    try {
      await db.sequelize.sync();
      let data = await db.Make.create(make);
      make = data.dataValues;
      data = await db.CarModel.create({ makeId: make.id, ...model });
      model = data.dataValues;
      data = await db.Car.create({ modelId: model.id, ...car });
      car = data.dataValues;
    } catch (err) {
      console.error(err);
    }
  });

  it("Gets a car", async () => {
    let res = await request.get(endpoint + "/" + car.id).expect(200);
    expect(res.body).to.have.property("id");
    expect(res.body.id).to.be.a("number");
  });

  it("Does not get a car", async () => {
    await request.get(endpoint + "/" + 1000).expect(404);
  });

  it("Gets all cars", async () => {
    let res = await request.get(endpoint).expect(200);
    console.log(res.body);
    expect(res.body).to.be.a("array");
  });

  it("Updates a car", async () => {
    let res = await request
      .put(endpoint + "/" + car.id)
      .send({ color: "Green" })
      .expect(200);
    let updatedModel = await request.get(endpoint + "/" + car.id).expect(200);
    expect(updatedModel.body.color).to.be.equal("Green");
  });

  it("Does not update a car", async () => {
    await request
      .put(endpoint + "/" + 1000)
      .send({ color: "Red" })
      .expect(404);
  });

  it("Creates a car", async () => {
    let { id, ...car2 } = car;
    let res = await request.post(endpoint).send(car2).expect(200);
    expect(res.body).to.have.property("id");
    expect(res.body.id).to.be.a("number");
  });

  it("Does not create a car", async () => {
    let { id, ...car2 } = car;
    await request
      .post(endpoint)
      .send({ ...car2, modelId: 1000 })
      .expect(500);
  });

  it("Deletes a car", async () => {
    let { id, ...car2 } = car;
    let temp = await request.post(endpoint).send(car2).expect(200);
    await request.delete(endpoint + "/" + temp.body.id).expect(204);
    await request.get(endpoint + "/" + temp.id).expect(404);
  });

  it("Does not delete a car", async () => {
    await request.delete(endpoint + "/" + 1000).expect(404);
  });
});
