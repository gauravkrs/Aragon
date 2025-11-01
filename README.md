# Task Board Application

A full-stack task management application built with React (TypeScript) frontend and Node.js/Express backend with PostgreSQL database.

## Features

### Frontend
- ✅ Create, read, update, and delete boards and tasks
- ✅ Frontend form validations for boards and tasks
- ✅ State management using React hooks
- ✅ Hover states for all interactive elements
- ✅ Responsive layout for different screen sizes
- ✅ Built with custom React components (no external component library)
- ✅ Modern UI with Tailwind CSS

### Backend
- ✅ RESTful API using Node.js and Express
- ✅ PostgreSQL database with Prisma ORM
- ✅ Proper CRUD operations for boards and tasks
- ✅ Input validation and error handling
- ✅ Optimized database queries
- ✅ Logging and monitoring setup

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Custom React hooks for state management
- Fetch API for HTTP requests

### Backend
- Node.js with Express
- TypeScript
- Prisma ORM
- PostgreSQL database
- Helmet, CORS, Morgan middleware

## Project Structure

```
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service layer
│   │   └── types/         # TypeScript type definitions
├── backend/           # Node.js backend application
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   └── index.ts       # Express server setup
│   └── prisma/            # Database schema and migrations
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Database Setup
1. Install and start PostgreSQL
2. Create a new database for the application
3. Update the `DATABASE_URL` in `backend/.env` with your database credentials

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   # Copy and update the .env file with your database URL
   # DATABASE_URL="postgresql://username:password@localhost:5432/taskboard?schema=public"
   ```

4. Generate Prisma client and run migrations:
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The backend will be running on `http://localhost:5000`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be running on `http://localhost:3000`

## API Endpoints

### Boards
- `GET /api/boards` - Get all boards
- `GET /api/boards/:id` - Get a specific board
- `POST /api/boards` - Create a new board
- `PUT /api/boards/:id` - Update a board
- `DELETE /api/boards/:id` - Delete a board

### Tasks
- `GET /api/tasks` - Get all tasks (optional: ?boardId=xxx)
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Database Schema

### Board
- `id` - Unique identifier
- `title` - Board title (required)
- `description` - Board description (optional)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp
- `tasks` - Related tasks

### Task
- `id` - Unique identifier
- `title` - Task title (required)
- `description` - Task description (optional)
- `status` - Task status (TODO, IN_PROGRESS, DONE)
- `priority` - Task priority (LOW, MEDIUM, HIGH)
- `boardId` - Reference to parent board
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Usage

1. **Create a Board**: Click "New Board" to create your first task board
2. **Add Tasks**: Select a board and click "New Task" to add tasks
3. **Manage Tasks**: 
   - Edit tasks by clicking the edit icon
   - Change task status using the dropdown
   - Delete tasks using the delete icon
4. **Organize**: Tasks are automatically organized into columns by status (To Do, In Progress, Done)

## Development

### Available Scripts

#### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

#### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
