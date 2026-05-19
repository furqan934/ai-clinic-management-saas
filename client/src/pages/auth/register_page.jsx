import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import { AuthContext } from "../../context/auth_context";

const RegisterPage = () => {
  const navigate = useNavigate();

  const { set_user } = useContext(AuthContext);

  const [form_data, set_form_data] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
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
        "/auth/register",
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
      } else if (role === "doctor") {
        navigate("/doctor");
      } else if (role === "patient") {
        navigate("/patient");
      } else if (
        role === "receptionist"
      ) {
        navigate("/receptionist");
      }
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handle_submit}
        className="bg-white p-8 rounded-2xl shadow-xl w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form_data.name}
          onChange={handle_change}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none focus:border-teal-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form_data.email}
          onChange={handle_change}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none focus:border-teal-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form_data.password}
          onChange={handle_change}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none focus:border-teal-500"
          required
        />

        <select
          name="role"
          value={form_data.role}
          onChange={handle_change}
          className="w-full border border-gray-300 p-3 rounded-lg mb-6 outline-none focus:border-teal-500"
        >
          <option value="patient">
            Patient
          </option>

          <option value="doctor">
            Doctor
          </option>

          <option value="receptionist">
            Receptionist
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 transition-all text-white py-3 rounded-lg font-semibold"
        >
          Register
        </button>

        <p className="text-center mt-5 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-teal-600 cursor-pointer font-medium"
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;