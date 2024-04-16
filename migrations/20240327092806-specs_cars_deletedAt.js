'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //add deketedAt at cars
    await queryInterface.addColumn("cars", "deletedAt", {
      allowNull: true,
      type: Sequelize.DATE
    });
    // add deletedAt at details
    await queryInterface.addColumn("specs", "deletedAt", {
      allowNull: true,
      type: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("cars", "deletedAt");
    await queryInterface.removeColumn("specs", "deletedAt");
  }
};