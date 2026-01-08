# OTP Authentication API

A secure Node.js authentication system with OTP (One-Time Password) verification, built using Express.js, MongoDB, and JWT tokens.

## Features

- **User Registration**: Sign up with email verification via OTP
- **OTP Verification**: Secure email-based OTP verification (expires in 10 minutes)
- **JWT Authentication**: Access and refresh token-based authentication
- **Password Hashing**: Secure password storage using bcrypt
- **Protected Routes**: JWT middleware for route protection
- **Email Integration**: Automated OTP delivery via Nodemailer
- **CORS Support**: Configurable cross-origin resource sharing
- **Security Headers**: Helmet.js for enhanced security

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **Email Service**: Nodemailer
- **Security**: Helmet, CORS, Cookie Parser

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Email service credentials (Gmail, Outlook, etc.)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd otp-auth
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/otp_auth
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# JWT Configuration
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

4. Start the development server:
```bash
npm run dev
```

For production:
```bash
npm start
```

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register a new user | No |
| POST | `/verify-otp` | Verify user email with OTP | No |
| POST | `/login` | User login | No |
| POST | `/logout` | User logout | Yes |
| GET | `/home` | Protected home page | Yes |

### Request/Response Examples

#### Sign Up
```bash
POST /signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "statusCode": 201,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "isVerified": false
  },
  "success": true,
  "errors": [],
  "message": "User created successfully. Please check your email for OTP verification."
}
```

#### Verify OTP
```bash
POST /verify-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}
```

#### Login
```bash
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "isVerified": true
    },
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  },
  "success": true,
  "errors": [],
  "message": "Login done successfully"
}
```

#### Protected Route (Home)
```bash
GET /home
Authorization: Bearer <access-token>
```

## Project Structure

```
otp-auth/
├── src/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/
│   │   └── user.controller.js # User authentication logic
│   ├── middleware/
│   │   └── verifyJWT.js       # JWT verification middleware
│   ├── models/
│   │   └── user.model.js      # User schema
│   ├── routes/
│   │   └── routes.js          # API routes
│   ├── services/
│   │   └── sendMail.js        # Email service
│   └── utils/
│       └── token.js           # JWT token utilities
├── index.js                   # Express app setup
├── server.js                  # Server entry point
├── package.json
└── README.md
```

## Security Features

- **Password Hashing**: Uses bcrypt with salt rounds of 12
- **JWT Tokens**: Separate access and refresh tokens
- **OTP Expiration**: OTP expires after 10 minutes
- **HTTP-Only Cookies**: Secure cookie storage for tokens
- **CORS Configuration**: Configurable origin settings
- **Helmet Security**: Security headers middleware

## Error Handling

The API uses consistent error response format:
```json
{
  "statusCode": 400,
  "data": null,
  "success": false,
  "errors": [],
  "message": "Error description"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Manish Das**

---

For any questions or support, please open an issue in the repository.
