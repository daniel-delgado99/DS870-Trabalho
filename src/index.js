const express = require("express");
const app = express();
const router = require('./routes/router')
// require("./database")
const mongoose = require('mongoose')

try {
	mongoose.connect("mongodb+srv://admin:root@cluster0.0dt2r.mongodb.net/algoritmos", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
        autoIndex: true,
	});


} catch (error) {
	console.log("Erro de conexão com MongoDB.");
}


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router)

app.listen(process.env.SYSTEM_PORT, () => {
    console.log('listening on port', process.env.SYSTEM_PORT)
})

module.exports = app;
