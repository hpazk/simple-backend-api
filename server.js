// app.js
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/services', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const query = 'INSERT INTO services (name, url, category_id, owner) VALUES (?)';
    connection.query(query, [name], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error saving name' });
        }
        res.status(201).json({ id: results.insertId, name });
    });
});

app.get('/api/services', (req, res) => {
    const query = 'SELECT * FROM services';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching names' });
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
