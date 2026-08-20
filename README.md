# Library Book Management System

ITUE301 Advanced Web Development Frameworks practical examination, Set B.

## Project Structure

- `frontend/` React + React Router application
- `backend/` Express REST API and Mongoose models

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The Vite development server runs at `http://localhost:5173`.

## Backend Setup

```bash
cd backend
npm install
npm start
```

The API runs at `http://localhost:5000`.

## MongoDB Setup

Install MongoDB locally or create a MongoDB Atlas cluster. Copy `.env.example` to `.env` and set the connection string. The `.env` file is ignored by Git.

Required variables:

```env
MONGO_URI=mongodb://127.0.0.1:27017/library_management
PORT=5000
```

## API Endpoints

- `GET /api/v1/books`
- `GET /api/v1/borrowings`
- `POST /api/v1/borrowings`
- `POST /api/v1/borrowings/request` saves the Borrow page form in MongoDB
- `POST /api/v1/db/books` demonstrates MongoDB validation and persistence
