const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user credential'],
    },
    imageUrl: String,
    result: String,
}, { timestamp: true })

module.exports =  mongoose.model('Result', resultSchema);