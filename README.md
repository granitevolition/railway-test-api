# Railway Test API

A simple Express API designed for testing Railway.com deployment.

## Quick Start

```bash
# Install dependencies
npm install

# Run in development
npm start
```

## API Endpoints

- `GET /` - Basic welcome message
- `GET /api/test` - Test endpoint with environment information
- `POST /api/echo` - Echo back any JSON sent in request body

## Deploying to Railway

1. Push this repository to GitHub
2. Connect to Railway.com
3. Create a new project from this GitHub repo
4. Railway will automatically detect the Node.js app and deploy it

## Environment Variables

None required for basic functionality, but you can customize as needed.
