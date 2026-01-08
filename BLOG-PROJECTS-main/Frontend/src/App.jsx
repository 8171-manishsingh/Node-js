import React, { useState } from "react";
import PostContext from "./context/PostContext";
import AllRoutes from "./Routes/AllRoutes";
import { getPost } from "./utils/post.utils";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  const fetchPosts = async () => {
    const data = await getPost();
    setPosts(data || []);
  };

  const onClearPosts = () => {
    setPosts([]);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <PostContext.Provider
        value={{
          posts: filteredPosts,
          setPosts,
          fetchPosts,
          searchQuery,
          setSearchQuery,
          onClearPosts,
          user,
          setUser,
        }}
      >
        <AllRoutes />
      </PostContext.Provider>
    </div>
  );
}
