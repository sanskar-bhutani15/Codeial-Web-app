const mongoose = require('mongoose');
const env = require('../config/environment');
mongoose.set('strictQuery', false);
mongoose.connect(`mongodb://localhost/${env.db}`);


const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', () =>{
    console.log("Database Connected successfully");
})

module.exports = db;
