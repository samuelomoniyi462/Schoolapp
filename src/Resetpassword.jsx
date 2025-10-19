import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://127.0.0.1:5100/reset-password/${token}`, {
        newPassword,
      });
      if (res.data.success) {
        setMessage("Password reset successful. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        {message && <p className="text-center text-red-500 mb-3">{message}</p>}
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
