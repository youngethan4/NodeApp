"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "admin",
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "mod",
          id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user",
          id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Role", null, {});
  },
};
