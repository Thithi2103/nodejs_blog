const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_educaton_dev');
        console.log('successfully')
    } catch(error) {
        console.log('failed to connect')
    }
}

module.exports = { connect }