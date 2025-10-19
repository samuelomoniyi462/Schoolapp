import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentTab = ({ teacherId }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false); // Start as false
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLinkedStudents = async () => {
      console.log("🔄 StudentTab: Fetching linked students for teacherId:", teacherId);
      
      if (!teacherId) {
        console.log("❌ StudentTab: No teacherId provided - clearing data");
        setStudents([]);
        setError("Please select a teacher first");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const res = await axios.get(
          `http://localhost:5100/admin/linkedStudents/${teacherId}`
        );

        console.log("✅ StudentTab: API Response:", res.data);

        if (res.data.success) {
          setStudents(res.data.students || []);
          console.log(`📊 StudentTab: Loaded ${res.data.students?.length || 0} students`);
        } else {
          setError(res.data.message || "Failed to fetch students.");
          console.log("❌ StudentTab: API returned success=false");
        }
      } catch (err) {
        console.log("❌ StudentTab: Error fetching linked students:", err);
        console.log("❌ StudentTab: Error response:", err.response?.data);
        setError("Could not load linked students.");
      } finally {
        setLoading(false);
      }
    };

    fetchLinkedStudents();
  }, [teacherId]);

  // Show message when no teacher is selected
  if (!teacherId) {
    return (
      <div className="p-4 text-gray-500 italic">
        Please select a teacher to view their students.
      </div>
    );
  }

  // 🔄 Loading State
  if (loading) {
    return <p className="text-gray-500 p-4">Loading students...</p>;
  }

  // ❌ Error State
  if (error) {
    return <p className="text-red-600 font-medium p-4">Error: {error}</p>;
  }

  // 📋 No students yet
  if (students.length === 0) {
    return (
      <div className="text-gray-600 italic p-4">
        No students have been linked to this teacher yet.
      </div>
    );
  }

  // ✅ Show student list
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3 text-blue-700">
        Linked Students ({students.length})
      </h2>
      <table className="min-w-full border border-gray-200 rounded-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-3 border-b">#</th>
            <th className="py-2 px-3 border-b">Student ID</th>
            <th className="py-2 px-3 border-b">Name</th>
            <th className="py-2 px-3 border-b">Email</th>
            <th className="py-2 px-3 border-b">Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu, i) => (
            <tr key={stu.userID || stu.id} className="hover:bg-gray-50">
              <td className="py-2 px-3 border-b">{i + 1}</td>
              <td className="py-2 px-3 border-b">{stu.userID}</td>
              <td className="py-2 px-3 border-b">
                {stu.firstname} {stu.lastname}
              </td>
              <td className="py-2 px-3 border-b">{stu.email}</td>
              <td className="py-2 px-3 border-b">{stu.grade || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTab;