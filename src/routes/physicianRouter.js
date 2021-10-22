const express = require("express");
const physicianRouter = express.Router();
const physiciansController = require("../controllers/physiciansController");
const auth = require("../middleware/auth");

physicianRouter.get("/listAllPhysicians", auth, physiciansController.listAllPhysicians);
physicianRouter.post("/newPhysician", auth, physiciansController.newPhysician);
physicianRouter.delete("/deletePhysician/:id", auth, physiciansController.deletePhysician);
physicianRouter.patch("/updatePhysician", auth, physiciansController.updatePhysician);

physicianRouter.post("/authentication", physiciansController.authentication);
physicianRouter.get("/logout", auth, physiciansController.logout);


module.exports = physicianRouter;
