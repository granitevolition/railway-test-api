const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Railway Test API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API test endpoint is working',
    environment: process.env.NODE_ENV || 'development',
    railwayData: {
      project: process.env.RAILWAY_PROJECT_ID || 'Not deployed on Railway',
      service: process.env.RAILWAY_SERVICE_ID || 'Not deployed on Railway'
    }
  });
});

// Echo endpoint
app.post('/api/echo', (req, res) => {
  res.json({
    success: true,
    receivedData: req.body,
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
