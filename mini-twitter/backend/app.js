const express = require('express');
const cors = require('cors');
const tweetRoutes = require('./routes/tweetRoutes');
const logRequest = require('./middleware/logger');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Application-level middleware
app.use(logRequest);

app.use('/api/tweets', tweetRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});