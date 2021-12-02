const express = require("express");
const deliveryRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");

const { verifyJWT } = require("../middleware/auth");

deliveryRouter.get("/findAll", verifyJWT, deliveryController.findAll);
deliveryRouter.post("/new", verifyJWT, deliveryController.new);
deliveryRouter.get("/findCompleted", verifyJWT, deliveryController.findCompleted);
deliveryRouter.get("/findPending", verifyJWT, deliveryController.findPending);
deliveryRouter.post("/findByMotoboy", verifyJWT, deliveryController.findByMotoboy);
deliveryRouter.patch("/updatePending/:_id", verifyJWT, deliveryController.updatePending);
deliveryRouter.delete("/deletePending/:_id", verifyJWT, deliveryController.deletePending);


deliveryRouter.post("/reportMotoboyPayment", verifyJWT, deliveryController.reportMotoboyPayment);
deliveryRouter.post("/reportAssociatePayment", verifyJWT, deliveryController.reportAssociatePayment);
deliveryRouter.post("/reportAdministrativo", verifyJWT, deliveryController.reportAdministrativo);


module.exports = deliveryRouter;
