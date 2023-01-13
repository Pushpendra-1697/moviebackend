const mongoose = require('mongoose');

const heroSchema = mongoose.Schema({
    name: String,
    power: Number
}, {
    versionKey: false
});

const heroModel = mongoose.model("hero", heroSchema);

module.exports = { heroModel };