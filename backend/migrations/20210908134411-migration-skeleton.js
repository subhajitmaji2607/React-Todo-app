'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('todos','userId', {
      type: Sequelize.INTEGER,
      // references:{
      //   model : {
      //     tableName : 'users'
      //   },
      //   key : 'id'
      // },
      // allowNull : false
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('todos','userId');
  }
};

