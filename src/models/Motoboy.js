const mongoose = require("mongoose");

const Motoboy = new mongoose.Schema({
	name: {
        type: String,
        required: true,
    },
	cpf: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
	phoneNumber: {
        type: String,
        required: true
    },
});

module.exports = Motoboy;