'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Physicians', [{
      name: "Médico 01",
      email: "email01@medicina.com",
      password: "$2a$12$USysT/vuSsEty6nTCUM1.OuO.zrLE5ZWsBDDbMrsvvRWhJXIQqP6y"
    },
    {
      name: "Médico 02",
      email: "email02@medicina.com",
      password: "$2a$12$USysT/vuSsEty6nTCUM1.OuO.zrLE5ZWsBDDbMrsvvRWhJXIQqP6y"
    },
    {
      name: "Médico 03",
      email: "email03@medicina.com",
      password: "$2a$12$USysT/vuSsEty6nTCUM1.OuO.zrLE5ZWsBDDbMrsvvRWhJXIQqP6y"
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Physicians', null, {});
  }
};
