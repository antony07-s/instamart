import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"
const Login = ({setIsLoggedIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const response = await axios.post(
      "http://localhost:5000/login",
      {
        email,
        password,
      }
    );

    alert(response.data.message);

    localStorage.setItem("isLoggedIn", true);

    setIsLoggedIn(true);

    navigate("/");

  } catch (error) {

    alert(error.response.data.message);

  }

};
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogin}
        className="border p-8 rounded-xl shadow-md w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 w-full rounded mb-4"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 w-full rounded mb-4"
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-3 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
