const express = require('express');
const config = require('../config');

const router = express.Router();

// Get usage statistics
router.get('/usage', (req, res) => {
  // Simulate usage data
  const totalRequests = config.DB.usage_logs.length;
  const totalUsers = config.DB.users.filter(u => u.role !== 'admin').length;
  
  // Calculate daily usage over the past 7 days
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  // Group logs by day
  const dailyUsage = {};
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    dailyUsage[dateStr] = 0;
  }
  
  // Count logs for each day
  config.DB.usage_logs.forEach(log => {
    const logDate = new Date(log.timestamp);
    if (logDate >= sevenDaysAgo) {
      const dateStr = logDate.toISOString().split('T')[0];
      if (dailyUsage[dateStr] !== undefined) {
        dailyUsage[dateStr]++;
      }
    }
  });
  
  res.json({
    success: true,
    data: {
      totalRequests,
      totalUsers,
      dailyUsage: Object.entries(dailyUsage).map(([date, count]) => ({
        date,
        count
      })).sort((a, b) => a.date.localeCompare(b.date))
    }
  });
});

// Get transaction statistics
router.get('/transactions', (req, res) => {
  const totalTransactions = config.DB.transactions.length;
  const totalValue = config.DB.transactions.reduce((sum, t) => sum + t.amount, 0);
  
  // Calculate monthly transactions
  const monthlyTransactions = {};
  config.DB.transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyTransactions[monthYear]) {
      monthlyTransactions[monthYear] = {
        count: 0,
        value: 0
      };
    }
    
    monthlyTransactions[monthYear].count++;
    monthlyTransactions[monthYear].value += transaction.amount;
  });
  
  res.json({
    success: true,
    data: {
      totalTransactions,
      totalValue,
      monthly: Object.entries(monthlyTransactions).map(([month, data]) => ({
        month,
        ...data
      })).sort((a, b) => a.month.localeCompare(b.month))
    }
  });
});

// Get system health
router.get('/health', (req, res) => {
  // Calculate API uptime (simulated)
  const uptime = process.uptime();
  
  // Calculate recent errors (simulated)
  const recentErrors = 0;
  
  // API response time (simulated)
  const responseTime = Math.random() * 100 + 50; // 50-150ms
  
  res.json({
    success: true,
    data: {
      uptime: {
        seconds: uptime,
        formatted: formatUptime(uptime)
      },
      status: 'online',
      recentErrors,
      responseTime: Math.round(responseTime)
    }
  });
});

// Helper function to format uptime
function formatUptime(uptime) {
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

module.exports = router;
