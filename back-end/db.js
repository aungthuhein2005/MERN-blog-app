const {MongoClient} = require("mongodb");
const mongoose = require("mongoose");

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => {
            dbConnection = client.connection; // Assign client.connection to dbConnection
            console.log("Connected to MongoDB");
            return cb();
        })
        .catch((err) => {
            console.log(err);
            return cb(err);
        });
    },
    getDb: () => dbConnection
};
