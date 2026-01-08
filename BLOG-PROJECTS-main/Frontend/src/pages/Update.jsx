import React, { useState, useContext } from "react";
import { UpdatePost } from "../utils/post.utils";
import { NavLink, useParams, useNavigate } from "react-router";
import PostContext from "../context/PostContext";

export default function Update() {
  const [form, setForm] = useState({ title: "", content: "" });
  const { id } = useParams();
  const { fetchPosts } = useContext(PostContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { message, post } = await UpdatePost(id, form);
      console.log(message);
      fetchPosts(); // Refetch posts after updating
      navigate("/Home"); // Navigate back to home
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md p-lg-2">
        <h2 className="text-2xl font-bold mb-6 text-center bg-white text-gray-800">
          ⭐ Update ⭐
        </h2>
        <form className="flex flex-col gap-4 bg-white">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="...Update your Title"
              onChange={handleChange}
              name="title"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Content
            </label>
            <input
              type="text"
              placeholder="...Update your Content"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              onChange={handleChange}
              name="content"
            />
          </div>
          <button
            onClick={handleUpdate}
            type="submit"
            className="mt-4  hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Update
          </button>
          <NavLink to={"/Home"}>Home⬅️</NavLink>
        </form>
      </div>
    </div>
  );
}
