# Movie Management System

A full-stack web application for managing a movie collection with add, edit, search, and delete functionalities.

## Features

- **Add Movies**: Add new movies with details like title, year, duration, rating, genres, cast, and poster
- **View Movies**: Browse all movies in a grid layout with key information
- **Search Movies**: Search movies by title
- **Edit Movies**: Update movie details
- **Delete Movies**: Remove movies from the collection
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- Multer for file uploads
- CORS for cross-origin requests

### Frontend
- React with React Router
- Vite for fast development
- Tailwind CSS for styling
- Axios for API calls

## Project Structure

```
movie-management-system/
├── backend/
│   ├── configs/
│   │   └── db.js
│   ├── controllers/
│   │   └── controllers.js
│   ├── middleware/
│   │   └── upload.js
│   ├── models/
│   │   └── movie.model.js
│   ├── router/
│   │   └── routes.js
│   ├── utils/
│   │   └── toArray.js
│   ├── uploads/
│   ├── app.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── MovieForm.jsx
    │   ├── pages/
    │   │   ├── AddMoviePage.jsx
    │   │   ├── EditMoviePage.jsx
    │   │   ├── MovieDetailsPage.jsx
    │   │   └── MovieList.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## API Endpoints

- `POST /movies` - Add a new movie
- `GET /movies` - Get all movies
- `GET /movies/search?title=keyword` - Search movies by title
- `GET /movies/:id` - Get a specific movie
- `PUT /movies/:id` - Update a movie
- `DELETE /movies/:id` - Delete a movie

## Movie Data Model

```javascript
{
  mId: String (unique),
  movieName: String,
  movieDescription: String,
  movieGenre: [String],
  movieYear: Number,
  durationMinutes: Number,
  rating: Number,
  languages: [String],
  cast: [String],
  moviePoster: String (file path),
  isPublished: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## License

ISC
## DEMO VIDEO
(https://drive.google.com/file/d/1Ehf12tlX8k2a_zps7Iw2KfOuoGkwHqD9/view?usp=drive_link)

## DEMO IMAGE 
<img width="1891" height="895" alt="Screenshot 2025-12-08 210113" src="https://github.com/user-attachments/assets/1f7f4147-95ae-4016-9b17-ba76bfd1fb1e" />
