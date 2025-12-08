# 🚀 Student Portal Backend

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-File%20Upload-blue?style=flat)
![Dotenv](https://img.shields.io/badge/Dotenv-Environment%20Variables-green?style=flat)

A powerful, scalable RESTful API crafted with Node.js and Express to revolutionize student data management! 🎓✨ This backend powerhouse enables seamless CRUD operations on student records, complete with advanced file upload capabilities for profile images. Dive into a world where data flows effortlessly, security is paramount, and performance is king. Whether you're building a cutting-edge student portal or integrating robust backend services, this API is your ultimate companion for efficient, reliable data handling.

## ✨ Features

- 🔄 **CRUD Operations**: Full Create, Read, Update, Delete functionality for student records
- 📤 **File Upload**: Support for uploading student profile images with ease
- 🗄️ **MongoDB Integration**: Seamless database operations using Mongoose ODM
- 🌐 **RESTful API**: Well-structured endpoints following REST principles
- 🔐 **Environment Configuration**: Secure handling of sensitive data using dotenv
- 📁 **Static File Serving**: Efficiently serves uploaded images via a dedicated route

## 🛠️ Tech Stack

- ⚡ **Runtime**: Node.js
- 🚀 **Framework**: Express.js
- 📊 **Database**: MongoDB with Mongoose ODM
- 📎 **File Upload**: Multer
- 🔧 **Environment**: dotenv

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd student-portal-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=<PORT NUMBER>
   MONGODB_URI=<MONGODB CLUSTER URI>
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on the specified PORT (default: 3000).

## Usage

The API provides the following endpoints:

### Base URL
```
http://localhost:PORT
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Add a new student (with optional profile image) |
| GET | `/` | Get all students |
| GET | `/:id` | Get a specific student by ID |
| PUT | `/:id` | Update a student by ID (with optional profile image) |
| DELETE | `/:id` | Delete a student by ID |

### Request/Response Examples

#### Add Student
```bash
POST /
Content-Type: multipart/form-data

{
  
}
```stdId: 101
stdName: Ahmed Khan
email: ahmed@gmail.com
phone: 9876543210
profileImage: <uploaded_file.png>

#### Get All Students
```bash
GET /
```

Response:
```bash
[
  {
   "_id": "64fabc1234567890abcdef01",
  "stdId": "101",
  "stdName": "Ahmed Khan",
  "email": "ahmed@gmail.com",
  "phone": 9876543210,
  "profileImage": "/uploads/ahmed_1700000000.png",
  "createdAt": "2025-12-04T10:00:00.000Z",
  "updatedAt": "2025-12-04T10:00:00.000Z",
  "__v": 0
  }
]
```

## Project Structure

```bash
student-portal-backend/
├── config/
│   └── db.js                 # Database connection configuration
├── controllers/
│   └── students.controller.js # Student CRUD operations
├── middleware/
│   └── upload.js             # Multer configuration for file uploads
├── models/
│   └── student.model.js      # Student data model
├── router/
│   └── routes.js             # API route definitions
├── uploads/                  # Directory for uploaded files
├── .env                      # Environment variables (create this file)
├── .gitignore                # Git ignore rules
├── index.js                  # Express app setup
├── package.json              # Project dependencies and scripts
├── README.md                 # Project documentation
└── server.js                 # Server startup file
```