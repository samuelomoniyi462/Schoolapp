import React, { useEffect, useState } from "react";
import axios from "axios";

const LinkStudentsTab = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingLinked, setLoadingLinked] = useState(false); // 👈 added
  const [message, setMessage] = useState("");

  // Fetch all teachers and students
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachersRes = await axios.get("http://localhost:5100/teacher/getTeachers");
        const studentsRes = await axios.get("http://localhost:5100/student/getStudents");

        setTeachers(teachersRes.data.success ? teachersRes.data.teachers : teachersRes.data);
        setStudents(studentsRes.data.success ? studentsRes.data.students : studentsRes.data);
      } catch (err) {
        console.error("Error fetching teachers/students:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ Fetch already linked students when teacher changes
  useEffect(() => {
    const fetchLinked = async () => {
      if (!selectedTeacher) {
        setSelectedStudents([]);
        return;
      }

      setLoadingLinked(true); // 👈 show loading state for linked students
      setMessage(""); // clear message

      try {
        const res = await axios.get(
          `http://localhost:5100/admin/linkedStudents/${selectedTeacher}`
        ); 

        console.log("Linked response:", res.data); // 👈 debug log

        if (res.data.success) {
          const linkedIds = (res.data.students || []).map((s) => s.id);
          setSelectedStudents(linkedIds);
        } else {
          setSelectedStudents([]);
        }
      } catch (err) {
        console.error("Error fetching linked students:", err);
        setMessage("❌ Failed to load linked students.");
      } finally {
        setLoadingLinked(false);
      }
    };

    fetchLinked();
  }, [selectedTeacher]);

  // Handle linking students
  const handleLink = async () => {
    if (!selectedTeacher || selectedStudents.length === 0) {
      setMessage("⚠ Please select a teacher and at least one student.");
      return;
    }

    setLoading(true);
    try {

     const response = await axios.post("http://localhost:5100/admin/linkStudents", {
        teacherId: selectedTeacher,
        studentIds: selectedStudents,
      });
      if (response.status === 201){
      setMessage("✅ Students linked successfully!");}
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to link students.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle a student checkbox
  const toggleStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const getSelectedTeacherName = () => {
    const teacher = teachers.find((t) => t.id === selectedTeacher);
    return teacher ? `${teacher.firstname} ${teacher.lastname}` : "";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Link Students to Teacher
        </h2>
        <p className="text-gray-600">Assign students to teachers for classroom management</p>
      </div>

      {/* Teacher dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Teacher *
        </label>
        <select
          value={selectedTeacher ?? ""}
          onChange={(e) => {
            setSelectedTeacher(Number(e.target.value));
            setMessage("");
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Choose a Teacher --</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.userID} • {teacher.firstname} {teacher.lastname}
            </option>
          ))}
        </select>
      </div>

      {/* Student checkboxes */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">Select Students *</label>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {selectedStudents.length} selected
          </span>
        </div>

        <div className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto bg-gray-50/50">
          {loadingLinked ? (
            <p className="text-gray-500 italic">Loading linked students...</p>
          ) : students.length === 0 ? (
            <p className="text-gray-500 italic">No students available.</p>
          ) : (
            students.map((student) => (
              <label
                key={student.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => toggleStudent(student.id)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-gray-900 block">
                    {student.firstname} {student.lastname}
                  </span>
                  <span className="text-sm text-gray-500 block">
                    ID: {student.userID} • Grade: {student.grade}
                  </span>
                </div>
              </label>
            ))
          )}
        </div>
      </div>

      {/* Summary */}
      {selectedTeacher && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
          Linking {selectedStudents.length} student(s) to {getSelectedTeacherName()}
        </div>
      )}

      {/* Action */}
      <div className="flex items-center justify-between">
        {message && (
          <p
            className={`text-sm ${
              message.includes("✅")
                ? "text-green-600"
                : message.includes("❌")
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={handleLink}
          disabled={loading || !selectedTeacher}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium flex items-center shadow-sm"
        >
          {loading ? "Linking..." : "Link Students"}
        </button>
      </div>
    </div>
  );
};

export default LinkStudentsTab;
