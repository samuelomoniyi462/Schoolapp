import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./assets/context/Authcontext";

export default function Login() {
  const navigate = useNavigate();
  const {login} = useAuth()

  const [formData, setFormData] = useState({
    userID: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [forgotMode, setForgotMode] = useState(false); // toggle forgot password mode
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const validateForm = (data) => {
    const errors = {};
    if (!data.userID.trim()) errors.userID = "UserID is required";
    if (!data.password.trim()) errors.password = "Password is required";
    return errors;
  };

  
  // Handle form submit (Login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:5100/auth/login", formData);

      if (response.data.success) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        login(user)

        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "teacher") {
          navigate("/teacher");
        } else if (user.role === "student") {
          navigate("/student");
        } else {
          setErrors({ general: "Unknown role. Contact admin." });
        }
      } else {
        setErrors({ general: "Invalid credentials. Please try again." });
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Login failed. Please check your credentials." });
    }
  };

  // Handle Forgot Password request
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:5100/forgot-password", {
        email: resetEmail,
      });

      if (response.data.success) {
        setResetMessage("Password reset instructions sent to your email.");
      } else {
        setResetMessage("No account found with this email.");
      }
    } catch (err) {
      console.error(err);
      setResetMessage("Error sending reset request. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {forgotMode ? "Forgot Password" : "Login"}
        </h2>

        {/* Error or Reset Message */}
        {errors.general && !forgotMode && (
          <p className="text-red-500 text-center mb-4">{errors.general}</p>
        )}
        {resetMessage && forgotMode && (
          <p className="text-green-600 text-center mb-4">{resetMessage}</p>
        )}

        {!forgotMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* UserID Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                User ID
              </label>
              <input
                type="text"
                name="userID"
                value={formData.userID}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                placeholder="Enter your unique ID"
              />
               {errors.userID && (
              <p className="text-red-600 text-xs mt-2 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.userID}
              </p>
            )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                placeholder="Enter your password"
              />
              {errors.password && (
              <p className="text-red-600 text-xs mt-2 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.password}
              </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200"
              >
                Login
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            {/* Email for Reset */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter your email
              </label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Submit Reset Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        )}

        {/* Toggle Forgot/Login */}
        <div className="mt-4 text-center">
          {!forgotMode ? (
            <button
              onClick={() => setForgotMode(true)}
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot Password?
            </button>
          ) : (
            <button
              onClick={() => setForgotMode(false)}
              className="text-sm text-gray-600 hover:underline"
            >
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
