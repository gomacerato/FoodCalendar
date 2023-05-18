const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    recipeName: {
        type: String
    },
    recipeDescription: {
        type: String
    },
    recipeIngredient: {
        type: String
    },
    recipeInstruction: {
        type: String
    },
    recipeTime: {
        type: String
    },
    recipeImage: {
        data: Buffer,
        contentType: String
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;