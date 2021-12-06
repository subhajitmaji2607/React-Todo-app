'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('todos','userId', {
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('todos','userId');
  }
};
