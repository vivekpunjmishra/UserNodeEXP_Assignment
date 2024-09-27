// src/server.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Add a route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the User Management API');
});

// Use the user routes
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});