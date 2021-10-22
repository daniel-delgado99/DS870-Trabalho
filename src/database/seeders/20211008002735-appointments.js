'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Appointments', [{
      physicianId: 1,
      patientId: 1,
      appointmentDate: Sequelize.literal("CURRENT_TIMESTAMP"),
      description: "Muita dor",
    },
    {
      physicianId: 1,
      patientId: 2,
      appointmentDate: Sequelize.literal("CURRENT_TIMESTAMP"),
      description: "Perdeu o pé",
    },
    {
      physicianId: 2,
      patientId: 3,
      appointmentDate: Sequelize.literal("CURRENT_TIMESTAMP"),
      description: "Câncer",
    },
    {
      physicianId: 2,
      patientId: 4,
      appointmentDate: Sequelize.literal("CURRENT_TIMESTAMP"),
      description: "Morreu",
    },
    {
      physicianId: 3,
      patientId: 5,
      appointmentDate: Sequelize.literal("CURRENT_TIMESTAMP"),
      description: "Latiu e quitou",
    },
    {
      physicianId: 3,
      patientId: 6,
      appointmentDate: Sequelize.literal("CURRENT_TIMESTAMP"),
      description: "Tropeçou no pau",
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Appointments', null, {});
  }
};
