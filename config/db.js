const mongoose = require('mongoose');
//const dbURI = 'mongodb://localhost:27017/voyage_vibes_db';
const dbURI = "mongodb+srv://haru:harushan@cluster0.jwpk0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
