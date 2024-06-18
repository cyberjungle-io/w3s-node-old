const { MongoClient } = require('mongodb');

// Load MongoDB connection string from environment variables
const url = process.env.MONGODB_CONNECTION_STRING; // MongoDB server URL
if (!url) {
    console.error("MongoDB connection string is not set in environment variables.");
    process.exit(1);
}

const dbName = 'w3s'; // Specify your database name here
let db = null;

// Connect to the MongoDB client
async function connectToServer() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("Successfully connected to MongoDB.");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
}

// Get database
function getDb() {
    if (!db) {
        console.error("No database connection. Please connect to the server first.");
    }
    return db;
}

module.exports = { connectToServer, getDb };
