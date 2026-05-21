# Task Management System

A production-ready Full Stack Task Management System with Authentication, Role-Based Access Control (RBAC), and robust CRUD operations.

## Features

- **Authentication System**: Secure JWT-based login, registration with bcrypt password hashing.
- **Role-Based Access Control**: `admin` and `user` roles with distinct permissions.
- **Task Management**: Create, Read, Update, and Delete tasks.
- **Advanced Querying**: Pagination, filtering (status, priority), and search functionalities.
- **Responsive Frontend**: Clean, modern, mobile-responsive UI built with React.
- **Security**: Helmet, CORS, input validation, and environment variable configurations.
- **Clean Architecture**: Modular folder structure.

## Tech Stack

- **Frontend**: React (Vite), React Router DOM, Axios, Context API
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Security**: JWT, bcryptjs, Helmet, CORS, express-validator

## Installation Steps

1. **Clone the repository** (if applicable) or navigate to the project folder.

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   - Copy `.env.example` to `.env` and configure your MongoDB URI.
   ```bash
   cp .env.example .env
   ```
   - Start the backend server
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   - Start the Vite development server
   ```bash
   npm run dev
   ```

## Environment Variables

**Backend (`backend/.env`)**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task-management
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Authenticate user & get token
- `GET /api/v1/auth/me` - Get current logged-in user (Private)

### Tasks (Private)
- `GET /api/v1/tasks` - Get all tasks (supports pagination, filtering, search)
- `GET /api/v1/tasks/:id` - Get single task
- `POST /api/v1/tasks` - Create a task
- `PUT /api/v1/tasks/:id` - Update a task
- `DELETE /api/v1/tasks/:id` - Delete a task

## Folder Structure

```
Assignment/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Postman Collection

Import `Task_Management_API.postman_collection.json` into Postman to test the backend API easily.

## Future Improvements

- Add email verification and password reset functionality.
- Implement user profile image uploads.
- Add drag-and-drop task boards (Kanban).
