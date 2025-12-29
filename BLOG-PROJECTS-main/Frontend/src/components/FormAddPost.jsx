import React, { useState, useContext } from "react";
import PostContext from "../context/PostContext";
import { createPost } from "../utils/post.utils";

function FormAddPost() {
  const [title, setTitle] = useState("");
  const [content, setBody] = useState("");
  const { fetchPosts } = useContext(PostContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content || !title) return;
    await createPost({ title, content });
    fetchPosts(); 
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={content}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
}

export default FormAddPost;
