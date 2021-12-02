const express = require("express");
const motoboyRouter = express.Router();
const motoboyController = require("../controllers/motoboyController");

const { verifyJWT } = require("../middleware/auth");

motoboyRouter.get("/findAll", verifyJWT, motoboyController.findAll);
motoboyRouter.post("/new", verifyJWT, motoboyController.new);
motoboyRouter.post("/findByCpf", verifyJWT, motoboyController.findByCpf);
motoboyRouter.patch("/update/:_id", verifyJWT, motoboyController.update);
motoboyRouter.delete("/delete/:_id", verifyJWT, motoboyController.delete);

motoboyRouter.post("/authentication", motoboyController.authentication);
motoboyRouter.get("/logout", verifyJWT, motoboyController.logout);

module.exports = motoboyRouter;
