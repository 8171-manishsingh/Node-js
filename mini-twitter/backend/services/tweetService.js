const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/tweets.json');

const readTweets = () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeTweets = (tweets) => {
  fs.writeFileSync(filePath, JSON.stringify(tweets, null, 2));
};

const getAllTweets = () => readTweets();

const addTweet = (username, tweet) => {
  const tweets = readTweets();
  const newTweet = {
    id: Date.now(),
    username,
    tweet,
    createdAt: new Date().toISOString(),
    updatedAt: null
  };
  tweets.unshift(newTweet);
  writeTweets(tweets);
  return newTweet;
};

const updateTweet = (id, newTweetText) => {
  const tweets = readTweets();
  const tweet = tweets.find(t => t.id === parseInt(id));
  if (!tweet) return null;
  tweet.tweet = newTweetText;
  tweet.updatedAt = new Date().toISOString();
  writeTweets(tweets);
  return tweet;
};

const deleteTweet = (id) => {
  const tweets = readTweets();
  const index = tweets.findIndex(t => t.id === parseInt(id));
  if (index === -1) return null;
  const [deleted] = tweets.splice(index, 1);
  writeTweets(tweets);
  return deleted;
};

module.exports = {
  getAllTweets,
  addTweet,
  updateTweet,
  deleteTweet
};