<a hreh="https://drive.google.com/file/d/1U0nPHt4635CUsYBEZbCZw4s1ypmPWPoy/view?usp=drive_link">

Book Store API
Node.js Express.js MongoDB Mongoose Morgan

A RESTful API for managing a book store, built with Node.js, Express.js, and MongoDB. This backend application provides full CRUD operations for books, including logging and environment-based configuration. It supports JSON request/response formats and uses middleware for request logging and JSON parsing.

Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (with Mongoose ODM)
Logging: Morgan
Environment Management: dotenv
Prerequisites
Node.js (version 18.x or higher)
MongoDB (local installation or cloud service like MongoDB Atlas)
npm or yarn package manager
Features
Add new books to the store
Retrieve all books or a specific book by ID
Update book details
Delete books from the store
Request logging middleware for monitoring
Environment variable support for configuration
Modular architecture with separate controllers, models, and routes
JSON-based request and response handling
Database connectivity with MongoDB using Mongoose
Installation
Clone the repository:

git clone <repository-url>
cd book-store
Install dependencies:

npm install
Start the development server:

npm run dev
The server will start on the specified port (default: 3000).

Usage
Once the server is running, you can interact with the API using tools like Postman, curl, or any HTTP client. The API base URL is http://localhost:<PORT>.

API Endpoints
Method	Endpoint	Description
POST	/	Add a new book
GET	/	Get all books
GET	/:id	Get a book by ID
PATCH	/:id	Update a book by ID
DELETE	/:id	Delete a book by ID
Example Request
Project Structure
book-store/
├── config/
│   └── db.js              # Database connection
├── controllers/           # Route handlers
│   ├── Book.controller.js
│ js
├── logs/
│   └── access.log         # Access logs
├── middleware/
│   └── logger.js          # Logging middleware
├── models/
│   └── book.model.js      # Book schema
├── routes/
│   └── routes.js          # API routes
├── app.js                 # Express app setup
├── server.js              # Server entry point
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation