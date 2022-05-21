const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    owner: String,
    imageUrl: String,
    result: String,
})

//description,
module.exports =  mongoose.model('Result', ResultSchema);