const express = require('express');
const app = express();
const PORT = 3000;

// Middleware: The Neurotransmitter (JSON Parser)
app.use(express.json());

// In-memory "Database" (Project 2 focuses on API logic, not DB scaling yet)
let tasks = [
    { id: 1, title: "Initial Architecture", status: "completed" }
];

// --- GET ENDPOINT: Retrieval (Safe & Idempotent) ---
// RESTful Naming: Resources are Nouns (/tasks)
app.get('/api/tasks', (req, res) => {
    res.status(200).json({
        status: "success",
        results: tasks.length,
        data: tasks
    });
});

// --- POST ENDPOINT: Creation (The Gatekeeper Rule) ---
app.post('/api/tasks', (req, res) => {
    const { title, status } = req.body;

    // 1. Syntactic Validation: Is the format correct?
    if (!title || !status) {
        return res.status(400).json({
            status: "error",
            code: 400,
            message: "Malformed Data: Title and Status are mandatory fields."
        });
    }

    // 2. Semantic Validation: Is the logic valid?
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (!validStatuses.includes(status)) {
        return res.status(422).json({
            status: "error",
            message: "Invalid Logic: Status must be pending, in-progress, or completed."
        });
    }

    // Process: Computation
    const newTask = {
        id: tasks.length + 1,
        title,
        status,
        timestamp: new Date().toISOString()
    };

    tasks.push(newTask);

    // Output: 201 Created
    res.status(201).json({
        status: "success",
        message: "Resource Created Successfully",
        data: newTask
    });
});

// --- GET BY ID: Error Handling Protocol (404 Not Found) ---
app.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    
    if (!task) {
        return res.status(404).json({
            status: "error",
            code: 404,
            message: "Resource not found in the synapse."
        });
    }

    res.status(200).json(task);
});

// Start the Engine
app.listen(PORT, () => {
    console.log(`
    -------------------------------------------
    DECODELABS BACKEND ENGINE: RUNNING
    Endpoint: http://localhost:${PORT}/api/tasks
    Integrity Check: STABLE
    -------------------------------------------
    `);
});