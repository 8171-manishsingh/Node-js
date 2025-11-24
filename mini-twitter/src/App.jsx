import { useState, useEffect } from 'react';
import TweetForm from './components/TweetForm';
import TweetList from './components/TweetList';
import './index.css';

function App() {
  const [tweets, setTweets] = useState([]);

  const fetchTweets = async () => {
    const res = await fetch('/api/tweets');
    const data = await res.json();
    setTweets(data);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center my-6 text-blue-600">Mini Twitter</h1>
        <TweetForm onTweetAdded={fetchTweets} />
        <TweetList tweets={tweets} onTweetChange={fetchTweets} />
      </div>
    </div>
  );
}

export default App;