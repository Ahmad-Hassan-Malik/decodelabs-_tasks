const mongoose = require('mongoose');

// Pillar 1: The Blueprint - Schema Design
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);