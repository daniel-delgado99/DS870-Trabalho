const mongoose = require("mongoose");
const Client = require("./Client")
const Motoboy = require("./Motoboy")

const Delivery = new mongoose.Schema({
	description: {
		type: String,
        required: true,
	},
	client: {
		type: Client,
        required: true,
	},
	motoboy: {
		type: Motoboy,
        required: true,
	},
    status: {
		type: String,
        required: true,
	},
    value: {
		type: Number,
        required: true,
	}
});

module.exports = Delivery;
