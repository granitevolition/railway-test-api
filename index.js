const express = require('express');
const cors = require('cors');
const config = require('./config');
const db = require('./db');
const { router: authRouter, verifyToken, requireAdmin } = require('./routes/auth');
const usersRouter = require('./routes/users');
const analyticsRouter = require('./routes/analytics');
const registrationsRouter = require('./routes/registrations');

const app = express();
const PORT = config.PORT;

// Initialize admin user
config.initAdminUser();

// Add some sample data for demo purposes
function initSampleData() {
  // Sample transactions
  for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    config.DB.transactions.push({
      id: `tx-${i}`,
      user_id: 'user-1',
      amount: Math.floor(Math.random() * 1000) + 500,
      date: date.toISOString(),
      status: 'completed'
    });
  }
  
  // Sample usage logs
  for (let i = 0; i < 100; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 7));
    
    config.DB.usage_logs.push({
      id: `log-${i}`,
      user_id: Math.random() > 0.5 ? 'user-1' : 'user-2',
      action: 'humanize_text',
      timestamp: date.toISOString(),
      details: {
        characters: Math.floor(Math.random() * 1000) + 100
      }
    });
  }
  
  console.log('Sample data initialized');
}

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Andikar Admin API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Initialize database
db.initDatabase();

// Auth routes
app.use('/api/auth', authRouter);

// Public registration endpoint
app.use('/api/register', registrationsRouter);

// Protected routes
app.use('/api/users', verifyToken, requireAdmin, usersRouter);
app.use('/api/analytics', verifyToken, requireAdmin, analyticsRouter);
app.use('/api/admin/registrations', verifyToken, requireAdmin, registrationsRouter);

// Dashboard summary endpoint
app.get('/api/dashboard', verifyToken, requireAdmin, async (req, res) => {
  try {
    // Get registration count from database
    const registrationResult = await db.query('SELECT COUNT(*) FROM registrations');
    const registrationCount = parseInt(registrationResult.rows[0].count);
    
    // Get user count
    const userCount = config.DB.users.length;
    
    res.json({
      success: true,
      data: {
        users: {
          total: userCount
        },
        registrations: {
          total: registrationCount
        },
        system: {
          status: 'online',
          uptime: process.uptime()
        }
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Andikar Admin API running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  
  // Initialize sample data
  initSampleData();
});
