const express = require("express");
const clientRouter = require("./clientRouter");
const associateRouter = require("./associateRouter");
const motoboyRouter = require("./motoboyRouter");
const deliveryRouter = require("./deliveryRouter");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("It's working");
});

router.use("/client", clientRouter);
router.use("/associate", associateRouter);
router.use("/motoboy", motoboyRouter);
router.use("/delivery", deliveryRouter);


module.exports = router;
