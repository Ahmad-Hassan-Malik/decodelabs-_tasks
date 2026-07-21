require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(express.json());

// --- PILLAR 2: THE BRIDGE (Integration & Connection) ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/decodelabs_vault';

mongoose.connect(MONGO_URI)
    .then(() => console.log("--- DATABASE CONNECTION: STABLE ---"))
    .catch(err => console.error("DATABASE CONNECTION ERROR:", err));

// --- PILLAR 3: THE ACTION (CRUD & RESTful HTTP) ---

// 1. CREATE (POST)
app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save(); // Mongoose handles parameterization internally (Slide 16)
        res.status(201).json({ status: "success", data: newUser });
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message });
    }
});

// 2. READ (GET)
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: "success", results: users.length, data: users });
    } catch (err) {
        res.status(500).json({ status: "error", message: "Server Synapse Error" });
    }
});

// 3. UPDATE (PUT)
app.put('/api/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true // Enforces Schema Integrity during update
        });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ status: "success", data: updatedUser });
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message });
    }
});

// 4. DELETE (DELETE)
app.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(204).send(); // 204 No Content (Slide 14)
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Vault running on http://localhost:${PORT}`);
});