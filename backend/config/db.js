const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('connect to db');
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connect