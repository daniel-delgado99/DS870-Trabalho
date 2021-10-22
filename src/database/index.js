const Sequelize = require("sequelize");
const dbConfig = require("./config/dbconfig");

const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Physician = require("../models/Physician");

const connection = new Sequelize(dbConfig);

Physician.init(connection);
Patient.init(connection);
Appointment.init(connection);

Physician.associate(connection.models);
Patient.associate(connection.models);
Appointment.associate(connection.models);

module.exports = connection;
