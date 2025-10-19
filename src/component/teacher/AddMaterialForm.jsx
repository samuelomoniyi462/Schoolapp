import React, { useState } from "react";
import axios from "axios";

const AddMaterialForm = ({ onMaterialAdded }) => {
  const [form, setForm] = useState({
    title: "",
    type: "lesson",
    description: "",
    className: "",
    status: "Draft",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      // ✅ get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found. Please login again.");
        setLoading(false);
        return;
      }

      // ✅ prepare FormData
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("type", form.type);
      formData.append("description", form.description);
      formData.append("className", form.className);
      formData.append("status", form.status);
      formData.append("teacherId", user.id);
      if (file) {
        formData.append("file", file);
      }

      // ✅ send request with Authorization header
      const res = await axios.post("http://localhost:5100/material/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        alert("✅ Material added successfully!");
        if (onMaterialAdded) onMaterialAdded(res.data.material);

        // reset form
        setForm({
          title: "",
          type: "lesson",
          description: "",
          className: "",
          status: "Draft",
        });
        setFile(null);
      }
    } catch (err) {
      console.error("Error adding material:", err);

      if (err.response?.status === 401) {
        alert("⚠️ Unauthorized. Please login again.");
      } else {
        alert("❌ Failed to upload material. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 shadow rounded-md"
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-bold">Add Material</h2>

      <input
        name="title"
        placeholder="Material Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full border rounded p-2"
      >
        <option value="lesson">Lesson</option>
        <option value="worksheet">Worksheet</option>
        <option value="exam">Exam</option>
        <option value="resource">Resource</option>
      </select>

      <input
        name="className"
        placeholder="Class (e.g. JSS1, SS2)"
        value={form.className}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border rounded p-2"
      >
        <option value="Draft">Draft</option>
        <option value="Published">Published</option>
      </select>

      {/* File upload */}
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
        className="w-full border rounded p-2"
        accept=".pdf,.doc,.docx,.jpg,.png"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Uploading..." : "Add Material"}
      </button>
    </form>
  );
};

export default AddMaterialForm;
