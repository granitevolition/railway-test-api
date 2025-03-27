# Andikar Admin Backend

A simple admin backend for managing the Andikar AI system. This API provides administrative functionality for user management, analytics, and system monitoring.

## Features

- **Authentication:** Secure admin login with JWT-based authentication
- **User Management:** Create, read, update, and delete users
- **Analytics:** Track system usage and performance metrics
- **Dashboard:** Get summary data for the admin dashboard

## API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Analytics

- `GET /api/analytics/usage` - Get usage statistics
- `GET /api/analytics/transactions` - Get transaction statistics
- `GET /api/analytics/health` - Get system health information

### Dashboard

- `GET /api/dashboard` - Get dashboard summary data

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=3001
   JWT_SECRET=your_secret_key
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password
   ```

### Running the Server

Development mode:
```
npm run dev
```

Production mode:
```
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3001 |
| JWT_SECRET | Secret for JWT token generation | andikar-admin-secret-key |
| ADMIN_USERNAME | Admin username | admin |
| ADMIN_PASSWORD | Admin password | admin123 |

## Integration with Andikar Frontend

This admin backend is designed to work with the Andikar frontend application. The frontend connects to this API for administrative functions.

## Deployment

This project is configured for deployment on Railway.com. The `package.json` includes the necessary configuration for Railway deployment.

## Security Considerations

- Change the default admin credentials in production
- Set a strong JWT secret in production
- Enable HTTPS in production
- Implement rate limiting for production use
