const mongoose = require('mongoose');
require('dotenv').config();


//Define the MongoDB connection URL

const mongoURL = process.env.MONGODB_URL_LOCAL;

console.log(mongoURL);


// Set up MongoDB connection
mongoose.connect(mongoURL,{
   
  serverSelectionTimeoutMS: 30000
});

const db = mongoose.connection;

db.on('connected', () => {

    console.log('connected to MongoDB server');

});


db.on('error', (err) =>{

    console.log('MongoDB connection error:', err);

});

db.on('disconnected', () => {

    console.log('MongoDB disconnected');

});

module.exports = db;