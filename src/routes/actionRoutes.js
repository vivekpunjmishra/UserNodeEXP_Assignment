const express = require('express');
const router = express.Router();
const db = require('../db/sqliteConnection');

// Create Action for a User (POST /users/:user_id/actions)
router.post('/users/:user_id/actions', (req, res) => {
    const { user_id } = req.params;
    const { title, status, priority, timeline, created_date, completion_date } = req.body;
    db.run(`INSERT INTO Actions (user_id, title, status, priority, timeline, created_date, completion_date) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [user_id, title, status, priority, timeline, created_date, completion_date],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ action_id: this.lastID });
        }
    );
});

// Get All Actions for a User (GET /users/:user_id/actions)
router.get('/users/:user_id/actions', (req, res) => {
    const { user_id } = req.params;
    db.all(`SELECT * FROM Actions WHERE user_id = ?`, [user_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Other routes for updating and deleting actions can be similarly created
module.exports = router;
