const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    recipe: String,
    video: String,
    description: String
}, {  collection: 'recipe' });

module.exports =  mongoose.model('recipe', recipeSchema);