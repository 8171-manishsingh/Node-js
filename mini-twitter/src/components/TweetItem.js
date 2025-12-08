// TweetItem.js
import { useState } from 'react';

export default function TweetItem({ tweet, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(tweet.tweet);

  const handleUpdate = async () => {
    await fetch(`/api/tweets/${tweet.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tweet: editText })
    });
    setIsEditing(false);
    onChange();
  };

  const handleDelete = async () => {
    await fetch(`/api/tweets/${tweet.id}`, { method: 'DELETE' });
    onChange();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow p-5 mb-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
            <div>
              <strong className="text-lg">{tweet.username}</strong>
              <span className="text-gray-500 text-sm ml-2">
                · {formatDate(tweet.createdAt)}
                {tweet.updatedAt && <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">Edited</span>}
              </span>
            </div>
          </div>

          {isEditing ? (
            <div className="mt-3">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-2 border rounded"
                rows="3"
              />
              <button onClick={handleUpdate} className="mt-2 bg-green-500 text-white px-4 py-2 rounded mr-2">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="mt-2 bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          ) : (
            <p className="mt-3 text-lg">{tweet.tweet}</p>
          )}
        </div>

        <div className="flex gap-2 ml-4">
          <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:underline text-sm">
            Edit
          </button>
          <button onClick={handleDelete} className="text-red-600 hover:underline text-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}