import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import {
  AuthContext,
} from "../../context/auth_context";

const LoginPage = () => {
  const navigate = useNavigate();

  const { set_user } =
    useContext(AuthContext);

  const [form_data, set_form_data] =
    useState({
      email: "",
      password: "",
    });

  const handle_change = (e) => {
    set_form_data({
      ...form_data,
      [e.target.name]: e.target.value,
    });
  };

  const handle_submit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        form_data
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      set_user(response.data.user);

      const role =
        response.data.user.role;

      if (role === "admin") {
        navigate("/admin");
      }

      if (role === "doctor") {
        navigate("/doctor");
      }

      if (role === "patient") {
        navigate("/patient");
      }

      if (role === "receptionist") {
        navigate("/receptionist");
      }
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handle_submit}
        className="bg-white p-8 rounded-xl shadow-lg w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={handle_change}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          onChange={handle_change}
        />

        <button className="w-full bg-teal-600 text-white py-3 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;