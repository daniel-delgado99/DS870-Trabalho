const Sequelize = require("sequelize");

class Appointment extends Sequelize.Model {
	static init(sequelize) {
		super.init(
			{
				appointmentDate: Sequelize.DATE,
				description: Sequelize.STRING,
			},
			{
				sequelize,
			}
		);
	}

	static associate(models) {
		this.belongsToMany(models.Patient, { foreignKey: "patientId", through: "patient" });
		this.belongsToMany(models.Physician, { foreignKey: "physicianId", through: "physician" });
	}
}

module.exports = Appointment;
