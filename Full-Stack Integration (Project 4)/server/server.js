require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Pillar 2: The Bridge Protocol
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors()); // Allows Frontend on one port to talk to Backend on another

// Connect to Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connection: Stable"))
    .catch(err => console.error("Database Connection Error:", err));

// GET: Retrieve Data (Slide 7)
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Server Synapse Error" });
    }
});

// POST: Create Resource (Slide 7)
app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend Cognitive Vault running on port ${PORT}`));