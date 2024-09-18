const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001

app.use(cors());
app.use(express.json());

// Test database connection
db.query('SELECT 1')
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// Routes
app.get('/api/companies', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM companies');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching companies', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});