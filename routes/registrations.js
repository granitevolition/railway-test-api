const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const router = express.Router();

// Get all registrations
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM registrations ORDER BY created_at DESC');
    
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching registrations'
    });
  }
});

// Get registration by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM registrations WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching registration:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching registration'
    });
  }
});

// Create a new registration (public endpoint)
router.post('/', async (req, res) => {
  const { name, email, phone, details } = req.body;
  
  // Validate inputs
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required'
    });
  }
  
  try {
    // Check if email already exists
    const checkResult = await db.query('SELECT * FROM registrations WHERE email = $1', [email]);
    
    if (checkResult.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    const id = uuidv4();
    
    await db.query(
      'INSERT INTO registrations (id, name, email, phone, details) VALUES ($1, $2, $3, $4, $5)',
      [id, name, email, phone || null, details ? JSON.stringify(details) : null]
    );
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { id, name, email }
    });
  } catch (error) {
    console.error('Error creating registration:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating registration'
    });
  }
});

// Update a registration (admin only)
router.put('/:id', async (req, res) => {
  const { name, email, phone, details } = req.body;
  
  try {
    const checkResult = await db.query('SELECT * FROM registrations WHERE id = $1', [req.params.id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }
    
    await db.query(
      'UPDATE registrations SET name = $1, email = $2, phone = $3, details = $4 WHERE id = $5',
      [
        name || checkResult.rows[0].name,
        email || checkResult.rows[0].email,
        phone !== undefined ? phone : checkResult.rows[0].phone,
        details !== undefined ? JSON.stringify(details) : checkResult.rows[0].details,
        req.params.id
      ]
    );
    
    res.json({
      success: true,
      message: 'Registration updated successfully'
    });
  } catch (error) {
    console.error('Error updating registration:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating registration'
    });
  }
});

// Delete a registration (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.query('DELETE FROM registrations WHERE id = $1 RETURNING *', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Registration deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting registration'
    });
  }
});

module.exports = router;
