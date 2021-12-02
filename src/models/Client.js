const mongoose = require("mongoose");

const Client = new mongoose.Schema({
	name: {
		type: String,
        required: true,
	},
	cnpj: {
		type: String,
        required: true,
	},
	address: {
		type: String,
        required: true,
	},
});

module.exports = Client;
