const db = require("../../models");
const expect = require("chai").expect;

let make = { name: "Nissan" };

describe("Make model tests...", () => {
  before(async () => {
    try {
      db.sequelize.sync();
      let data = await db.Make.create(make);
      make = data.dataValues;
    } catch (err) {
      console.error(err);
    }
  });

  it("Creates a car make", async () => {
    let data;
    try {
      data = await db.Make.create({ name: "Ford" });
      data = data.dataValues;
    } catch (err) {
      console.error(err);
    }
    expect(data).to.have.property("id");
    expect(data.id).to.be.a("number");
  });

  it("Gets a car make", async () => {
    let data;
    try {
      data = await db.Make.findByPk(make.id);
      data = data.dataValues;
    } catch (err) {
      console.log(err);
    }
    expect(data.id).to.be.equal(make.id);
  });

  it("Gets all car makes", async () => {
    let data;
    try {
      data = await db.Make.findAll();
    } catch (err) {
      console.error(err);
    }
    expect(data).to.be.a("array");
  });

  it("Updates a car make", async () => {
    let data;
    try {
      data = await db.Make.update(
        { name: "Chevy" },
        { where: { id: make.id } }
      );
    } catch (err) {
      console.error(err);
    }
    expect(data[0]).to.be.equal(1);
  });

  it("Deletes a car make", async () => {
    let deleted;
    let data;
    try {
      let temp = await db.Make.create({ name: "Mitsubishi" });
      temp = temp.dataValues;
      deleted = await db.Make.destroy({ where: { id: temp.id } });
      data = await db.Make.findByPk(temp.id);
    } catch (err) {
      console.error(err);
    }
    expect(deleted).to.be.equal(1);
    expect(data).to.be.null;
  });
});
