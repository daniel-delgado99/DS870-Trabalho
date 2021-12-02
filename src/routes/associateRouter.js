const express = require("express");
const associateRouter = express.Router();
const associateController = require("../controllers/associateController");

const { verifyJWT } = require("../middleware/auth");

associateRouter.get("/findAll", verifyJWT, associateController.findAll);
associateRouter.post("/new", associateController.new);
associateRouter.post("/findByCnpj", verifyJWT, associateController.findByCnpj);
associateRouter.patch("/update/:_id", verifyJWT, associateController.update);
associateRouter.delete("/delete/:_id", associateController.delete);

associateRouter.post("/authentication", associateController.authentication);
associateRouter.get("/logout", verifyJWT, associateController.logout);

module.exports = associateRouter;
