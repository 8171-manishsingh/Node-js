project/
│
├─ data/
│ └─ tweets.json
│
├─ middleware/
│ └─ logger.js
│
├─ routes/
│ └─ tweetRoutes.js
│
├─ utils/
│ └─ tweets.js
│
├─ server.js
└─ README.md


---

## ▶ Running the Server

### 1️⃣ Install dependencies
```bash
npm install

2️⃣ Start the server
node server.js


Server will run at:

http://localhost:5000

🌐 API Endpoints
Method	Endpoint	Description
GET	/api/tweets	Get all tweets
POST	/api/tweets	Create a new tweet
PUT	/api/tweets/:id	Update a tweet
DELETE	/api/tweets/:id	Delete a tweet
📝 Example Request Body (POST / PUT)
{
  "username": "johndoe",
  "tweet": "This is my tweet!"
}

🧱 Middleware

logger.js runs on every request and logs information such as:

HTTP method

Request URL

Timestamp
