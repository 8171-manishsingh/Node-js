import React, { useContext, useState } from "react";
import { signin } from "../utils/user.utils";
import { NavLink, useNavigate } from "react-router";
import PostContext from "../context/PostContext";

export default function Login() {
  const { setUser } = useContext(PostContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { message, user } = await signin(form);
      if (message === "Login successful") {
        setUser(user);
        navigate("/Home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md p-lg-2">
        <h2 className="text-2xl font-bold mb-6 text-center bg-white text-gray-800">
          Welcome to Blogs
        </h2>
        <h2 className="text-2xl font-bold mb-6 text-center bg-white text-gray-800">
           Login
        </h2>
        <form className="flex flex-col gap-4 bg-white">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              name="email"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              onChange={handleChange}
              name="password"
            />
          </div>
          <button
            onClick={handleLogin}
            type="submit"
            className="mt-4  hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>

          <a href="/Signup">Want to SignUp?</a>
        </form>
      </div>
    </div>
  );
}
