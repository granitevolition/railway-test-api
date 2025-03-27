const express = require('express');
const config = require('../config');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  // Return users without sensitive info
  const sanitizedUsers = config.DB.users.map(user => ({
    id: user.id,
    username: user.username,
    role: user.role,
    created_at: user.created_at
  }));
  
  res.json({
    success: true,
    count: sanitizedUsers.length,
    data: sanitizedUsers
  });
});

// Get user by ID
router.get('/:id', (req, res) => {
  const user = config.DB.users.find(u => u.id === req.params.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  // Return user without password
  const { password, ...userWithoutPassword } = user;
  
  res.json({
    success: true,
    data: userWithoutPassword
  });
});

// Create a new user
router.post('/', (req, res) => {
  const { username, password, role = 'user' } = req.body;
  
  // Check if username already exists
  if (config.DB.users.find(u => u.username === username)) {
    return res.status(400).json({
      success: false,
      message: 'Username already exists'
    });
  }
  
  // Create new user
  const bcrypt = require('bcrypt');
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  const newUser = {
    id: uuidv4(),
    username,
    password: hashedPassword,
    role,
    created_at: new Date().toISOString()
  };
  
  config.DB.users.push(newUser);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: userWithoutPassword
  });
});

// Update a user
router.put('/:id', (req, res) => {
  const userIndex = config.DB.users.findIndex(u => u.id === req.params.id);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  const updatedUser = { ...config.DB.users[userIndex] };
  
  // Update fields
  if (req.body.username) updatedUser.username = req.body.username;
  if (req.body.role) updatedUser.role = req.body.role;
  
  // Update password if provided
  if (req.body.password) {
    const bcrypt = require('bcrypt');
    updatedUser.password = bcrypt.hashSync(req.body.password, 10);
  }
  
  // Update user in DB
  config.DB.users[userIndex] = updatedUser;
  
  // Return user without password
  const { password, ...userWithoutPassword } = updatedUser;
  
  res.json({
    success: true,
    message: 'User updated successfully',
    data: userWithoutPassword
  });
});

// Delete a user
router.delete('/:id', (req, res) => {
  const userIndex = config.DB.users.findIndex(u => u.id === req.params.id);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  // Remove user from DB
  config.DB.users.splice(userIndex, 1);
  
  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

module.exports = router;
