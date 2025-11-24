📌 Twitter API (Node + Express)

यह एक simple REST API है जिसमें Tweet को Create, Read, Update और Delete (CRUD) किया जा सकता है।
डेटा JSON फ़ाइल में स्टोर होता है और API CORS सपोर्टेड है।

🚀 Tech Stack

Node.js

Express.js

File-based JSON Storage

Middleware + Routing

📂 Folder Structure
project/
│ server.js
│ package.json
│
├─ routes/
│   └─ tweetRoutes.js
│
├─ middleware/
│   └─ logger.js
│
└─ data/
    └─ tweets.json

🛠 Installation & Setup

1️⃣ प्रोजेक्ट को क्लोन या डाउनलोड करें
2️⃣ टर्मिनल खोलें और चलाएँ:

npm install


3️⃣ फिर सर्वर शुरू करें:

node server.js

🌐 Base URL
http://localhost:5000

🔗 API Endpoints
Method	Endpoint	Description
GET	/api/tweets	सभी ट्वीट्स प्राप्त करें
GET	/api/tweets/:id	ID से एक ट्वीट प्राप्त करें
POST	/api/tweets	नया ट्वीट जोड़ें
PATCH	/api/tweets/:id	ट्वीट अपडेट करें
DELETE	/api/tweets/:id	ट्वीट हटाएँ
📌 Example POST Body
{
  "username": "John",
  "tweet": "This is a tweet"
}

🧰 Middleware
Name	Purpose
logger.js	हर incoming request को लॉग करता है
🎉 Output

Server start होने पर:

Server running on http://localhost:5000


