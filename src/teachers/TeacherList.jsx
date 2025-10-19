import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTeacher from "./AddTeacher";

const TeacherList = ({teachers, getTeachers}) => {
  // const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   getTeachers();
  // }, []);

  // =======================
  // 📌 FETCH TEACHERS
  // =======================
  // const getTeachers = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get("http://localhost:5100/teacher/getTeachers");
  //     if (response.data.success) {
  //       setTeachers(response.data.teachers);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching teachers:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // =======================
  // 📌 VALIDATE FORM
  // =======================
  const validateForm = (teacher) => {
    const errors = {};
    if (!teacher.lastname?.trim()) errors.lastname = "Last Name is required";
    if (!teacher.firstname?.trim()) errors.firstname = "First Name is required";
    if (!teacher.class?.trim()) errors.class = "Class is required";
    if (!teacher.email?.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(teacher.email)) errors.email = "Email is invalid";
    return errors;
  };

  // =======================
  // 📌 EDIT TEACHER
  // =======================
  const handleEditTeacher = (teacher) => {
    setEditingTeacher({ ...teacher });
    setFormErrors({});
  };

  const handleEditField = (field, value) => {
    setEditingTeacher((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleCancelEdit = () => {
    setEditingTeacher(null);
    setFormErrors({});
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    const errors = validateForm(editingTeacher);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5100/teacher/updateTeacher/${editingTeacher.id}`,
        editingTeacher
      );

      if (response.data.success) {
        await getTeachers();
        setEditingTeacher(null);
        setFormErrors({});
      } else {
        alert("Failed to update teacher");
      }
    } catch (error) {
      console.error("Error updating teacher:", error);
      alert("Something went wrong while updating teacher");
    }
  };

  // =======================
  // 📌 DELETE TEACHER
  // =======================
  const handleDeleteTeacher = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;

    try {
      const response = await axios.delete(
        `http://localhost:5100/teacher/deleteTeacher/${id}`
      );

      if (response.data.success) {
        await getTeachers();
      } else {
        alert("Failed to delete teacher");
      }
    } catch (error) {
      console.error("Error deleting teacher:", error);
      alert("Something went wrong while deleting teacher");
    }
  };

  // =======================
  // 📌 SEARCH FILTER
  // =======================
  const handleSearch = (e) => setSearchQuery(e.target.value);

 const filteredTeachers = teachers.filter((teacher) =>
    teacher.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.userID.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.othername?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Teachers List</h3>
          <p className="text-sm text-gray-500 mt-1">
            {filteredTeachers.length} teacher{filteredTeachers.length !== 1 ? 's' : ''} found
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
            placeholder="Search teachers..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
        </div>
      </div>

      {/* Edit Teacher Form */}
      {editingTeacher && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-900">Edit Teacher</h3>
            <button
              onClick={handleCancelEdit}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSaveEdit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={editingTeacher?.firstname || ""}
                  onChange={(e) => handleEditField("firstname", e.target.value)}
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    formErrors.firstname ? "border-red-300 bg-red-50" : "border-gray-300"
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={editingTeacher?.lastname || ""}
                  onChange={(e) => handleEditField("lastname", e.target.value)}
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    formErrors.lastname ? "border-red-300 bg-red-50" : "border-gray-300"
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

              {/*Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class *
                </label>
                <select
                  value={editingTeacher?.Class || ""}
                  onChange={(e) => handleEditField("class", e.target.value)}
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    formErrors.class ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Class</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                  <option value="K">Kindergarten</option>
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                </select>
                {formErrors.class && (
                  <p className="text-red-600 text-xs mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formErrors.class}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={editingTeacher?.email || ""}
                  onChange={(e) => handleEditField("email", e.target.value)}
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    formErrors.email ? "border-red-300 bg-red-50" : "border-gray-300"
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

            <div className="flex space-x-3">
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Teachers Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Class
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center">
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
                  <p className="text-gray-500 mt-2">Loading teachers...</p>
                </td>
              </tr>
            ) : filteredTeachers.map((teacher) => (
              <tr 
                key={teacher.id || teacher.userID} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {teacher.userID}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  <div>
                    <span className="font-medium">{teacher.lastname}, {teacher.firstname}</span>
                    {teacher.othername && (
                      <span className="text-gray-600"> {teacher.othername}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Class {teacher.class}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                  <a href={`mailto:${teacher.email}`} className="hover:underline">
                    {teacher.email}
                  </a>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEditTeacher(teacher)}
                      className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                      title="Edit teacher"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteTeacher(teacher.id || teacher.userID)}
                      className="text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50 transition-colors duration-200"
                      title="Delete teacher"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      {!isLoading && filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No teachers</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery ? "No teachers match your search." : "Get started by adding your first teacher."}
          </p>
        </div>
      )}
    </div>
  );
};

export default TeacherList;