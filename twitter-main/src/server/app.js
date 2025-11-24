const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Path to JSON file
const dbPath = path.join(__dirname, "data/tweets.json");

// Helper functions
const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Default route
app.get("/", (req, res) => {
  res.send("Simple Twitter CRUD API is running 🚀");
});

// GET all tweets
app.get("/api/tweets", (req, res) => {
  const tweets = readDB();
  res.json(tweets);
});

// GET a tweet by ID
app.get("/api/tweets/:id", (req, res) => {
  const tweets = readDB();
  const tweet = tweets.find(t => t.id == req.params.id);

  if (!tweet) {
    return res.status(404).json({ error: "Tweet not found" });
  }

  res.json(tweet);
});

// POST a new tweet
app.post("/api/tweets", (req, res) => {
  const { username, tweet } = req.body;

  if (!username || !tweet) {
    return res.status(400).json({ error: "Username and tweet are required" });
  }

  const tweets = readDB();
  const newTweet = {
    id: Date.now(),
    username,
    tweet
  };

  tweets.push(newTweet);
  writeDB(tweets);

  res.status(201).json(newTweet);
});

// UPDATE (PATCH) a tweet
app.patch("/api/tweets/:id", (req, res) => {
  const { username, tweet } = req.body;

  const tweets = readDB();
  const index = tweets.findIndex(t => t.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Tweet not found" });
  }

  if (username) tweets[index].username = username;
  if (tweet) tweets[index].tweet = tweet;

  writeDB(tweets);
  res.json(tweets[index]);
});

// DELETE a tweet
app.delete("/api/tweets/:id", (req, res) => {
  const tweets = readDB();
  const exists = tweets.some(t => t.id == req.params.id);

  if (!exists) {
    return res.status(404).json({ error: "Tweet not found" });
  }

  const updatedTweets = tweets.filter(t => t.id != req.params.id);
  writeDB(updatedTweets);

  res.json({ message: "Tweet deleted successfully" });
});

// Export app for server.js (if needed)
module.exports = app;
