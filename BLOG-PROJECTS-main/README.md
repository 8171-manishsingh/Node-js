# Blog Project

A full-stack blog application with user authentication and CRUD operations for blog posts.

## Features

- User registration and login
- JWT-based authentication
- Create, read, update, and delete blog posts
- Role-based access control (admin and user roles)
- Responsive frontend built with React
- RESTful API backend with Express.js and MongoDB

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin requests

### Frontend
- React
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Vite for build tooling

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the Backend directory with the following variables:
   ```
   DB_URL=your_mongodb_connection_string
   JWT_KEY=your_jwt_secret_key
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on http://localhost:8080

### Frontend Setup
1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will run on http://localhost:5173

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/logout` - User logout

### Blog Posts
- `GET /blog/` - Get all posts (authenticated users only)
- `POST /blog/` - Create a new post (authenticated users only)
- `PUT /blog/:id` - Update a post (post author or admin only)
- `DELETE /blog/:id` - Delete a post (post author or admin only)

## Project Structure

```
BLOG-PROJECTS-main/
├── Backend/
│   ├── config/
│   │   ├── DB.js
│   │   └── user.config.js
│   ├── controller/
│   │   ├── blog.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   └── middleWares.js
│   ├── model/
│   │   ├── blog.model.js
│   │   └── user.model.js
│   ├── router/
│   │   ├── auth.route.js
│   │   └── blog.route.js
│   ├── index.js
│   ├── package.json
│   └── .env (create this file)
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── Routes/
│   │   ├── Services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```
## Watch Output Video
(https://drive.google.com/file/d/1LoWXPGdenlGBL0a4x7PQvQTMLvNvOXuN/view?usp=sharing)


## Usage

1. Register a new account or login with existing credentials
2. After login, you'll be redirected to the home page
3. Create new blog posts using the form
4. View all posts in the list below
5. Edit or delete your own posts (admins can edit/delete any post)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.


