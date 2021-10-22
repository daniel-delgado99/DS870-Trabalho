const express = require("express");
const app = express();
const router = require('./routes/router')
require("./database")

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router)

app.listen(process.env.SYSTEM_PORT, () => {
    console.log('listening on port', process.env.SYSTEM_PORT)
})

module.exports = app;
