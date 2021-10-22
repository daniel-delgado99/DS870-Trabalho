const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentsController");

appointmentRouter.post("/searchAppointmentByPatientId", appointmentController.searchAppointmentByPatientId);
appointmentRouter.post("/searchAppointmentByPhysicianId", appointmentController.searchAppointmentByPhysicianId);
appointmentRouter.delete("/deleteAppointment/:id", appointmentController.deleteAppointment);
appointmentRouter.post("/newAppointment", appointmentController.newAppointment);

module.exports = appointmentRouter;
