const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    language: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    rating: { type: Number, required: true },
    is_active: { type: Boolean, required: true }
}, {
    versionKey: false
});

const MovieModel = mongoose.model("Movie", movieSchema);

module.exports = { MovieModel };