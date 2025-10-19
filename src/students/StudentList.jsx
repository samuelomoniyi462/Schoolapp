import React, { useState, useEffect } from "react";
import axios from "axios";
import AddStudent from "./AddStudent";

const StudentList = ({ students, getStudents }) => {
  const [editingStudent, setEditingStudent] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  // =======================
  // 📌 VALIDATE FORM
  // =======================
  const validateForm = (student) => {
    const errors = {};
    if (!student.lastname?.trim()) errors.lastname = "Last Name is required";
    if (!student.firstname?.trim()) errors.firstname = "First Name is required";
    if (!student.grade?.trim()) errors.grade = "Grade is required";
    if (!student.email?.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(student.email)) errors.email = "Email is invalid";
    return errors;
  };

  // =======================
  // 📌 EDIT STUDENT
  // =======================
  const handleEditStudent = (student) => {
    setEditingStudent({ ...student });
    setFormErrors({});
  };

  const handleEditField = (field, value) => {
    setEditingStudent((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setFormErrors({});
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    const errors = validateForm(editingStudent);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5100/student/updateStudent/${editingStudent.id}`,
        editingStudent
      );

      if (response.data.success) {
        await getStudents();
        setEditingStudent(null);
        setFormErrors({});
      } else {
        alert("Failed to update student");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Something went wrong while updating student");
    }
  };

  // =======================
  // 📌 DELETE STUDENT
  // =======================
  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const response = await axios.delete(
        `http://localhost:5100/student/deleteStudent/${id}`
      );

      if (response.data.success) {
        await getStudents();
      } else {
        alert("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Something went wrong while deleting student");
    }
  };

  // =======================
  // 📌 SEARCH FILTER
  // =======================
  const handleSearch = (e) => setSearchQuery(e.target.value);

  const filteredStudents = students.filter((student) =>
    student.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.userID.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.othername?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Students List</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 sm:py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Edit Student Form */}
      {editingStudent && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-6 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-blue-900">Edit Student</h3>
            <button
              onClick={handleCancelEdit}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSaveEdit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* First Name */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={editingStudent?.firstname || ""}
                  onChange={(e) => handleEditField("firstname", e.target.value)}
                  className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base ${formErrors.firstname ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                  placeholder="Enter first name"
                />
                {formErrors.firstname && (
                  <p className="text-red-600 text-xs mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formErrors.firstname}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={editingStudent?.lastname || ""}
                  onChange={(e) => handleEditField("lastname", e.target.value)}
                  className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base ${formErrors.lastname ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                  placeholder="Enter last name"
                />
                {formErrors.lastname && (
                  <p className="text-red-600 text-xs mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formErrors.lastname}
                  </p>
                )}
              </div>

              {/* Grade */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade *
                </label>
                <select
                  value={editingStudent?.grade || ""}
                  onChange={(e) => handleEditField("grade", e.target.value)}
                  className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base ${formErrors.grade ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                >
                  <option value="">Select Grade</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
                {formErrors.grade && (
                  <p className="text-red-600 text-xs mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formErrors.grade}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={editingStudent?.email || ""}
                  onChange={(e) => handleEditField("email", e.target.value)}
                  className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base ${formErrors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                  placeholder="Enter email address"
                />
                {formErrors.email && (
                  <p className="text-red-600 text-xs mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:space-x-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center sm:justify-start"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 sm:px-5 py-2.5 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Students Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                ID
              </th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Name
              </th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Grade
              </th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Email
              </th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                  <p className="text-gray-500 mt-2 text-sm">Loading students...</p>
                </td>
              </tr>
            ) : filteredStudents.map((student) => (
              <tr
                key={student.id || student.userID}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <span className="hidden sm:inline">{student.userID}</span>
                  <span className="sm:hidden text-xs">{student.userID}</span>
                </td>
                <td className="px-3 sm:px-4 py-4 text-sm text-gray-900">
                  <div>
                    <span className="font-medium text-sm sm:text-base">{student.lastname}, {student.firstname}</span>
                    {student.othername && (
                      <span className="text-gray-600 text-xs sm:text-sm"> {student.othername}</span>
                    )}
                  </div>
                </td>
                <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Grade {student.grade}
                  </span>
                </td>
                <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                  <a href={`mailto:${student.email}`} className="hover:underline text-xs sm:text-sm truncate block max-w-[120px] sm:max-w-none">
                    {student.email}
                  </a>
                </td>
                <td className="px-3 sm:px-4 py-4 whitespace-nowrap text-sm text-center">
                  <div className="flex justify-center space-x-1 sm:space-x-2">
                    <button
                      onClick={() => handleEditStudent(student)}
                      className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                      title="Edit student"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id || student.userID)}
                      className="text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50 transition-colors duration-200"
                      title="Delete student"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {!isLoading && filteredStudents.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5zm0 0l-9 5m9-5v6" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No students</h3>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 max-w-xs mx-auto">
            {searchQuery ? "No students match your search." : "Get started by adding your first student."}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentList;