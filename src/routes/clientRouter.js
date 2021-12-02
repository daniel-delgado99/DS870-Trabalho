const express = require("express");
const clientRouter = express.Router();
const clientController = require("../controllers/clientController");

const { verifyJWT } = require("../middleware/auth");

clientRouter.get("/findAll", verifyJWT, clientController.findAll);
clientRouter.post("/new", verifyJWT, clientController.new);
clientRouter.post("/findByCnpj", verifyJWT, clientController.findByCnpj);
clientRouter.patch("/update/:_id", verifyJWT, clientController.update);
clientRouter.delete("/delete/:_id", verifyJWT, clientController.delete);

module.exports = clientRouter;
