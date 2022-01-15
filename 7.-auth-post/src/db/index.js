const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb://localhost/auth_post_graphql');
    console.log('MongoDB Connected');
};

module.exports = {
    connectDB
};