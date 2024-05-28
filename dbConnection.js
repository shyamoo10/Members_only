const mongoose = require('mongoose');

// Load environment variables from a .env file into process.env
require('dotenv').config();

async function MongoConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error("Database connection error:", error.message);
        throw error;
    }
}

// Call the MongoConnection function
MongoConnection();

// Export the mongoose connection  
module.exports = mongoose.connection;

// In another
