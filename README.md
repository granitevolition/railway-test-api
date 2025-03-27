# Andikar Admin Backend

A simple admin backend for managing the Andikar AI system. This API provides registration functionality and administrative features for managing user registrations.

## Features

- **Authentication:** Secure admin login with JWT-based authentication
- **User Management:** Create, read, update, and delete users
- **Registrations:** Handle user registrations and store details in PostgreSQL
- **Admin Dashboard:** View and manage registration data

## API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login

### Public Endpoints

- `POST /api/register` - Register a new user (public endpoint)

### Admin Endpoints (Protected)

#### User Management
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

#### Registration Management
- `GET /api/admin/registrations` - Get all registrations
- `GET /api/admin/registrations/:id` - Get registration by ID
- `PUT /api/admin/registrations/:id` - Update a registration
- `DELETE /api/admin/registrations/:id` - Delete a registration

#### Analytics
- `GET /api/analytics/usage` - Get usage statistics
- `GET /api/analytics/transactions` - Get transaction statistics
- `GET /api/analytics/health` - Get system health information

#### Dashboard
- `GET /api/dashboard` - Get dashboard summary data

## Database Schema

### Users Table
```
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(40) PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Registrations Table
```
CREATE TABLE IF NOT EXISTS registrations (
  id VARCHAR(40) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

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
   PG_HOST=your_postgres_host
   PG_PORT=5432
   PG_DATABASE=andikar
   PG_USER=postgres
   PG_PASSWORD=your_db_password
   PG_SSL=false
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
| PG_HOST | PostgreSQL host | localhost |
| PG_PORT | PostgreSQL port | 5432 |
| PG_DATABASE | PostgreSQL database name | andikar |
| PG_USER | PostgreSQL username | postgres |
| PG_PASSWORD | PostgreSQL password | password |
| PG_SSL | Enable/disable SSL for PostgreSQL | false |

## Integration with Andikar Frontend

This admin backend is designed to work with the Andikar frontend application. The frontend can use the `/api/register` endpoint for user registration, and administrators can use the protected endpoints to manage registrations.

## Deployment

This project is configured for deployment on Railway.com. The `package.json` includes the necessary configuration for Railway deployment. The PostgreSQL database is automatically configured when deploying on Railway.

## Security Considerations

- Change the default admin credentials in production
- Set a strong JWT secret in production
- Enable HTTPS in production
- Implement rate limiting for production use
