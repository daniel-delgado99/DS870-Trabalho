const express = require("express");
const patientRouter = express.Router();
const patientsController = require("../controllers/patientsController");

patientRouter.post("/searchPatientByName", patientsController.searchPatientByName);
patientRouter.post("/newPatient", patientsController.newPatient);
patientRouter.get("/searchPatientByPhysicianId/:physicianId", patientsController.searchPatientByPhysicianId);
patientRouter.patch("/updatePatient", patientsController.updatePatient);

module.exports = patientRouter;
