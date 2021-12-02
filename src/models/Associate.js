const mongoose = require("mongoose");

const Associate = new mongoose.Schema({
	companyName: {
		type: String,
        required: true,
	},
	cnpj: {
		type: String,
        required: true,
	},
    password: {
		type: String,
        required: true,
	},
	address: {
		type: String,
        required: true,
	},
});

module.exports = Associate;
