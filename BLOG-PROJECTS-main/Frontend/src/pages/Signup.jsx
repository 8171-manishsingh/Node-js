import React, { useState } from "react";
import { useNavigate } from "react-router";
import { signup } from "../utils/user.utils";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      if (res === "You have been registered") {
        navigate("/");
      }
    } catch (error) {
      alert(error.message || "An error occurred during signup");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md p-lg-2">
        <h2 className="text-2xl font-bold mb-6 text-center bg-white text-gray-800">
          Welcome to Blogs
        </h2>
        <h2 className="text-2xl font-bold mb-6 text-center bg-white text-gray-800">
           SignUp 
        </h2>
        <form className="flex flex-col gap-4 bg-white">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              username
            </label>
            <input
              type="username"
              placeholder="Enter your username"
              onChange={handleChange}
              name="username"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
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
            onClick={handleSignup}
            type="submit"
            className="mt-4  hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
