require('dotenv').config();

module.exports = {
  // Server configuration
  PORT: process.env.PORT || 3001,
  JWT_SECRET: process.env.JWT_SECRET || 'andikar-admin-secret-key',
  
  // Admin credentials
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
  
  // Database configuration (in-memory for now)
  DB: {
    users: [],
    transactions: [],
    usage_logs: [],
    api_keys: []
  },
  
  // Init admin user
  initAdminUser: function() {
    const bcrypt = require('bcrypt');
    if (!this.DB.users.find(u => u.username === this.ADMIN_USERNAME)) {
      this.DB.users.push({
        id: 'admin-001',
        username: this.ADMIN_USERNAME,
        password: bcrypt.hashSync(this.ADMIN_PASSWORD, 10),
        role: 'admin',
        created_at: new Date().toISOString()
      });
      console.log(`Admin user '${this.ADMIN_USERNAME}' initialized`);
    }
  }
};
