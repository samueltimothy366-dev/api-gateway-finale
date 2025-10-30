# 3D Tracking API Dashboard

A full-stack application that provides a web interface for interacting with the 3D Tracking API endpoints. The application features an Express.js backend API gateway and a React frontend dashboard.

## Features

- **Authentication**: Secure JWT-based authentication system
- **Vehicle Management**: View and search all vehicles
- **Driver Management**: Access complete driver listings
- **Vehicle-Driver Assignments**: See which drivers are assigned to vehicles
- **Vehicle Details**: Search for specific vehicle information by UID
- **Modern UI**: Clean, responsive interface with real-time data updates

## Architecture

### Backend (Express.js)
- JWT authentication with token-based security
- Rate limiting for API protection
- Redis caching for improved performance
- Proxy endpoints to 3D Tracking API
- CORS enabled for frontend integration

### Frontend (React + Vite)
- Single-page application with modern React
- Clean, responsive design
- Real-time data fetching
- Token-based authentication flow
- Multiple dashboard views for different data types

## Prerequisites

- Node.js 14+
- Redis server
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Environment variables are already configured in `.env`:
   - Backend API runs on port 8000
   - Frontend dev server runs on port 5173
   - Redis connection configured
   - 3D Tracking API endpoints set

## Usage

### Running the Backend

Start the Express API server:
```bash
npm start
```

Or with auto-reload during development:
```bash
npm run dev
```

The backend API will be available at `http://localhost:8000`

### Running the Frontend

In a separate terminal, start the Vite development server:
```bash
npm run frontend
```

The frontend will be available at `http://localhost:5173`

### Building for Production

Build the frontend assets:
```bash
npm run build
```

Built files will be in the `dist/` directory.

### Using Docker

Start the entire stack with Docker Compose:
```bash
docker-compose up
```

## API Endpoints

The backend provides the following endpoints:

### Authentication
- `POST /authenticate` - Get JWT token
  - Body: `{ "username": "...", "password": "..." }`
  - Returns: `{ "success": true, "data": { "token": "..." } }`

### Protected Endpoints (Require Bearer Token)
- `GET /Vehicle/List` - Get all vehicles
- `GET /Driver/List` - Get all drivers
- `GET /Driver/Vehicle` - Get all vehicle-driver assignments
- `GET /Driver/Vehicle/:Uid` - Get specific vehicle details by UID

## Test Credentials

The application comes pre-configured with test credentials:
- **Username**: `accounts.api@virmatics.com`
- **Password**: `Accounts@221025`

These credentials are automatically filled in the login form for easy testing.

## Dashboard Features

### 1. Vehicles Tab
- Displays complete list of all vehicles
- Shows Vehicle UID and Name
- Real-time data refresh capability
- Total vehicle count statistics

### 2. Drivers Tab
- Complete driver directory
- Shows Driver ID and Display Name
- Refresh functionality
- Driver count statistics

### 3. Vehicles & Drivers Tab
- Shows vehicle-driver assignments
- Displays vehicle name, assigned driver, and last reported time
- Assignment count tracking

### 4. Vehicle Details Tab
- Search for specific vehicles by UID
- Enter UID (e.g., "FFEE68") to get detailed information
- Shows vehicle, driver, and timestamp data
- Record count for search results

## Security Features

- JWT token-based authentication
- Token stored securely in localStorage
- Rate limiting (100 requests per minute)
- CORS protection
- Secure password handling
- Token expiration (1 hour)

## Project Structure

```
project/
├── src/
│   ├── api.js              # Express server & routes
│   ├── auth.js             # JWT authentication middleware
│   ├── cache.js            # Redis caching logic
│   ├── config.js           # Configuration management
│   ├── fetcher.js          # API client functions
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main React component
│   ├── index.css           # Global styles
│   └── components/
│       ├── AuthForm.jsx    # Login component
│       ├── Dashboard.jsx   # Main dashboard
│       ├── VehicleList.jsx # Vehicle listing
│       ├── DriverList.jsx  # Driver listing
│       ├── VehicleDriverList.jsx # Assignments
│       └── VehicleDetails.jsx    # Vehicle search
├── index.html              # HTML entry
├── vite.config.js          # Vite configuration
├── docker-compose.yml      # Docker orchestration
├── Dockerfile              # Container definition
└── package.json            # Dependencies
```

## Technology Stack

**Backend:**
- Express.js - Web framework
- JWT - Authentication
- Redis - Caching
- Axios - HTTP client
- express-rate-limit - Rate limiting

**Frontend:**
- React 19 - UI framework
- Vite - Build tool
- Modern CSS - Styling

## API Integration

The application integrates with the 3D Tracking API:
- **Partner API**: `https://partnerapi.3dtracking.net/api/v1.0/`
- **Client API**: `https://api.3dtracking.net/api/v1.0/`
- **Gateway**: `https://apigw.virmatics.com/`

## Development

The frontend uses Vite's proxy configuration to route API calls from `/api/*` to the backend Express server, avoiding CORS issues during development.

## Support

For issues or questions, please refer to the 3D Tracking API documentation or contact the development team.
