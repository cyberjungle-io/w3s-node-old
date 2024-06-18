// Assuming you have a MongoDB client setup and connected
const { getDb } = require('../../config/db');

// Function to get data from the mongo table

    module.exports.getData = async (mdata) => {
        const db = getDb();
    try {
        const collection = db.collection('userdata'); // Replace 'your_collection_name' with the actual name of your collection
        const data = await collection.findOne({account_id:mdata.account_id}); // Assuming you want to retrieve the first document in the collection
        console.log('Data retrieved successfully');
        //console.log(data);
        return data;
    } catch (error) {
        console.error('Error retrieving data:', error);
        throw error;
    }
}

// Function to set data in the mongo table
module.exports.setData = async (mdata)  => {
    const db = getDb();
    try {
        const collection = db.collection('userdata'); // Replace 'your_collection_name' with the actual name of your collection
        await collection.updateOne({ account_id: mdata.account_id }, { $set: mdata }, { upsert: true }); // Upsert the data based on the account_id attribute
        console.log('Data updated successfully');
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}