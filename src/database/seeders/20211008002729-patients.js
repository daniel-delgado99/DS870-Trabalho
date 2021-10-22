'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Patients', [{
      name: "Paciente 0",
      email: "paciente0@doente.com",
      phone: "01140028922"
    },
    {
      name: "Paciente 1",
      email: "paciente1@doente.com",
      phone: "01140028922"
    },
    {
      name: "Paciente 2",
      email: "paciente2@doente.com",
      phone: "01140028922"
    },
    {
      name: "Paciente 3",
      email: "paciente3@doente.com",
      phone: "01140028922"
    },
    {
      name: "Paciente 4",
      email: "paciente4@doente.com",
      phone: "01140028922"
    },
    {
      name: "Paciente 5",
      email: "paciente5@doente.com",
      phone: "01140028922"
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Patients', null, {});
  }
};
