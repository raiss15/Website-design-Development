const mongoose = require('mongoose');
// Import dotenv at the top of the file
require('dotenv').config();

const connectDB = async () => {
    try {
        // Use process.env.MONGO_URI to access the environment variable
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
