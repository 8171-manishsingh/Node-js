const express = require('express');
const router = express.Router();
const { getAllTweets, addTweet, updateTweet, deleteTweet } = require('../services/tweetService');
const validateTweet = require('../middleware/validateTweet');

router.get('/', (req, res) => {
  const tweets = getAllTweets();
  res.json(tweets);
});

router.post('/', validateTweet, (req, res) => {
  const { username, tweet } = req.body;
  if (!username || username.trim() === '') {
    return res.status(400).json({ error: "Username is required" });
  }
  const newTweet = addTweet(username.trim(), tweet);
  res.status(201).json(newTweet);
});

router.put('/:id', validateTweet, (req, res) => {
  const { id } = req.params;
  const { tweet } = req.body;
  const updated = updateTweet(id, tweet);
  if (!updated) {
    return res.status(404).json({ error: "Tweet not found" });
  }
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleted = deleteTweet(id);
  if (!deleted) {
    return res.status(404).json({ error: "Tweet not found" });
  }
  res.json({ message: "Tweet deleted", deleted });
});

module.exports = router;