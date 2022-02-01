const mongoose = require('mongoose');

module.exports = {
    port: process.env.port||8082,
    db: "mongodb://127.0.0.1:27017/olms",
    jwtSecret: "olmssecretkey",
    connect:() => {
        mongoose.connect("mongodb://127.0.0.1:27017/olms");
        mongoose.Promise = global.Promise;
    }
}