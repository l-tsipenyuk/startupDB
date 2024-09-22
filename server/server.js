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

// Add a new company
app.post('/api/companies', async (req, res) => {
    try {
      const { Name, Link, Contact, ContactRole, Edge, Country, GrowthStage, Category, Keyword } = req.body;
      const [result] = await db.query(
        'INSERT INTO companies (Name, Link, Contact, ContactRole, Edge, Country, GrowthStage, Category, Keyword) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [Name, Link, Contact, ContactRole, Edge, Country, GrowthStage, Category, Keyword]
      );
      res.status(201).json({ id: result.insertId, message: 'Company added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding company', error });
    }
  });
  
  // Delete a company
  app.delete('/api/companies/:id', async (req, res) => {
    try {
      const [result] = await db.query('DELETE FROM companies WHERE id = ?', [req.params.id]);
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Company not found' });
      } else {
        res.json({ message: 'Company deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting company', error });
    }
  });
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});