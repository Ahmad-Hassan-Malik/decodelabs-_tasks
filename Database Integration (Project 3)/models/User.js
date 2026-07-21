const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory (NOT NULL)'],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Enforces absolute distinctness (Slide 14)
        lowercase: true
    },
    role: {
        type: String,
        enum: ['intern', 'mentor', 'admin'],
        default: 'intern'
    },
    age: {
        type: Number,
        min: [18, 'Age must be >= 18 (CHECK Constraint)'] // Slide 14
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);