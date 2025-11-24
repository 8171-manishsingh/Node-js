📌 Twitter API (Node + Express)

यह एक simple REST API है जिसमें Tweet को
👉 Create
👉 Read
👉 Update
👉 Delete (CRUD)
किया जा सकता है। डेटा JSON फ़ाइल में सेव होता है और API CORS supported है।

🚀 Tech Stack

Node.js

Express.js

JSON File Storage

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

1️⃣ प्रोजेक्ट को डाउनलोड/क्लोन करें
2️⃣ Terminal में चलाएँ:

npm install


3️⃣ सर्वर स्टार्ट करें:

node server.js

🌐 Base URL
http://localhost:5000

🔗 API Endpoints
Method	Endpoint	Description
GET	/api/tweets	सभी ट्वीट्स प्राप्त करें
GET	/api/tweets/:id	ID से ट्वीट प्राप्त करें
POST	/api/tweets	नया ट्वीट जोड़ें
PATCH	/api/tweets/:id	ट्वीट अपडेट करें
DELETE	/api/tweets/:id	ट्वीट हटाएँ
📌 Example POST Body
{
  "username": "John",
  "tweet": "This is a tweet"
}

🧰 Middleware
File	Purpose
logger.js	हर incoming request को log करता है
🎉 Server Output

सर्वर चलने के बाद Terminal में:

Server running on http://localhost:5000


