# Railway Test API

A simple Express API designed for testing Railway.com deployment.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/granitevolition/railway-test-api.git
cd railway-test-api

# Install dependencies
npm install

# Run in development
npm start
```

## API Endpoints

- `GET /` - Basic welcome message with timestamp
- `GET /api/test` - Test endpoint with environment information and Railway data
- `POST /api/echo` - Echo back any JSON sent in request body

## Deploying to Railway

1. Fork or clone this repository to your GitHub account
2. Go to [Railway.com](https://railway.app/) and sign in
3. Click "New Project" and select "Deploy from GitHub repo"
4. Select this repository from the list
5. Railway will automatically detect the Node.js app and deploy it
6. Once deployed, you can access your API at the URL provided by Railway

Railway will automatically:
- Install dependencies based on package.json
- Start the server using the start script
- Assign a random port and make it available as PORT environment variable
- Provide a public URL for your API

## Environment Variables

Railway automatically provides these environment variables:
- `PORT`: The port your app should listen on
- `RAILWAY_PROJECT_ID`: Your Railway project ID
- `RAILWAY_SERVICE_ID`: Your service ID

## Local Development

```bash
# Install nodemon for development (auto-restart)
npm install -g nodemon

# Run with auto-restart on file changes
npm run dev
```

## Testing the API

You can test the API endpoints using curl or a tool like Postman:

```bash
# Test root endpoint
curl https://your-railway-url.railway.app/

# Test API endpoint
curl https://your-railway-url.railway.app/api/test

# Test echo endpoint
curl -X POST -H "Content-Type: application/json" -d '{"message":"Hello Railway"}' https://your-railway-url.railway.app/api/echo
```

## Project Structure

```
railway-test-api/
├── index.js          # Main application file
├── package.json      # Dependencies and scripts
├── .gitignore        # Git ignore file
└── README.md         # Project documentation
```
