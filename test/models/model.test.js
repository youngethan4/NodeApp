const db = require("../../models");
const expect = require("chai").expect;

let make = { name: "Nissan" };
let model = { name: "Sentra" };

describe("Car Model model tests...", () => {
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

  it("Creates a car model", async () => {
    let data;
    try {
      data = await db.CarModel.create({ makeId: make.id, name: "Maxima" });
      data = data.dataValues;
    } catch (err) {
      console.error(err);
    }
    expect(data).to.have.property("id");
    expect(data.id).to.be.a("number");
  });

  it("Does not create a car model", async () => {
    let data;
    try {
      await db.CarModel.create({ makeId: 1000, name: "Outback" });
    } catch (err) {
      data = err;
    }
    expect(data).to.not.be.null;
    expect(data).to.not.be.undefined;
  });

  it("Gets a car model", async () => {
    let data;
    try {
      data = await db.CarModel.findByPk(model.id);
      data = data.dataValues;
    } catch (err) {
      console.log(err);
    }
    expect(data.id).to.be.equal(model.id);
  });

  it("Gets all car models", async () => {
    let data;
    try {
      data = await db.CarModel.findAll();
    } catch (err) {
      console.error(err);
    }
    expect(data).to.be.a("array");
  });

  it("Updates a car model", async () => {
    let data;
    try {
      data = await db.CarModel.update(
        { name: "Chevy" },
        { where: { id: model.id } }
      );
    } catch (err) {
      console.error(err);
    }
    expect(data[0]).to.be.equal(1);
  });

  it("Deletes a car model", async () => {
    let deleted;
    let data;
    try {
      let temp = await db.CarModel.create({
        name: "Mitsubishi",
        makeId: make.id,
      });
      temp = temp.dataValues;
      deleted = await db.CarModel.destroy({ where: { id: temp.id } });
      data = await db.CarModel.findByPk(temp.id);
    } catch (err) {
      console.error(err);
    }
    expect(deleted).to.be.equal(1);
    expect(data).to.be.null;
  });
});
