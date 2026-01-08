import React, { useContext, useEffect } from "react";
import { DeletePost } from "../utils/post.utils";
import { NavLink } from "react-router";
import PostContext from "../context/PostContext";

function List() {
  const { posts, fetchPosts } = useContext(PostContext);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (id) => {
    await DeletePost(id);
    fetchPosts(); // Refetch posts after deleting
  };

  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>written by {post.author.username}</p>
          <div className="flex justify-between ">
            <>
              <button
                className="rounded-md text-xs"
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </button>
              <NavLink to={`/update/${post._id}`}>
                {" "}
                <button className="rounded-md">Edit</button>
              </NavLink>
            </>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default List;
