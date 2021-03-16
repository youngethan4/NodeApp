const db = require("../../models");
const expect = require("chai").expect;

let make = { name: "Nissan" };
let model = { name: "Sentra" };
let car = {
  description: "Good condition",
  year: 1998,
  color: "Yellow",
  transmission: "Manual",
  drivetrain: "FWD",
};

describe("Car model tests...", () => {
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

  it("Creates a car", async () => {
    let data;
    try {
      let { id, ...car2 } = car;
      data = await db.Car.create({ modelId: model.id, ...car2 });
      data = data.dataValues;
    } catch (err) {
      console.error(err);
    }
    expect(data).to.have.property("id");
    expect(data.id).to.be.a("number");
  });

  it("Does not create a car", async () => {
    let data;
    try {
      await db.Car.create({ modelId: 1000, ...car });
    } catch (err) {
      data = err;
    }
    expect(data).to.not.be.null;
    expect(data).to.not.be.undefined;
  });

  it("Gets a car", async () => {
    let data;
    try {
      data = await db.Car.findByPk(car.id);
      data = data.dataValues;
    } catch (err) {
      console.log(err);
    }
    expect(data.id).to.be.equal(car.id);
  });

  it("Gets all cars", async () => {
    let data;
    try {
      data = await db.Car.findAll();
    } catch (err) {
      console.error(err);
    }
    expect(data).to.be.a("array");
  });

  it("Updates a car", async () => {
    let data;
    try {
      data = await db.Car.update({ color: "Blue" }, { where: { id: car.id } });
    } catch (err) {
      console.error(err);
    }
    expect(data[0]).to.be.equal(1);
  });

  it("Deletes a car", async () => {
    let deleted;
    let data;
    try {
      let { id, car2 } = car;
      let temp = await db.Car.create({
        ...car2,
        modelId: model.id,
      });
      temp = temp.dataValues;
      deleted = await db.Car.destroy({ where: { id: temp.id } });
      data = await db.Car.findByPk(temp.id);
    } catch (err) {
      console.error(err);
    }
    expect(deleted).to.be.equal(1);
    expect(data).to.be.null;
  });
});
