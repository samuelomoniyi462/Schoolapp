import React, { useState } from "react";
import axios from "axios";

const AddTeacher = ({ getTeachers }) => {
  
  const generateUserID = () => "TEACHER" + Math.floor(1000 + Math.random() * 9000);

  const [newTeacher, setNewTeacher] = useState({
    userID: generateUserID(),
    lastname: "",
    firstname: "",
    othername: "",
    class: "",
    email: "",
    status: "teacher",
  });

  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (teacher) => {
    const errors = {};
    if (!teacher.lastname.trim()) errors.lastname = "Last name is required";
    if (!teacher.firstname.trim()) errors.firstname = "First name is required";
    if (!teacher.class.trim()) errors.class = "Class is required";
    if (!teacher.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(teacher.email)) errors.email = "Email is invalid";
    return errors;
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    const errors = validateForm(newTeacher);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post("http://localhost:5100/teacher/addTeacher", newTeacher);

      if (res.data.success) {
        console.log("Teacher added:", res.data.teacher);

        // // ✅ update parent list if callback provided
        // if (onAddTeacher) {
        //   onAddTeacher(res.data.teacher || newTeacher);
        // }

        // Reset form
        setNewTeacher({
          userID: generateUserID(),
          lastname: "",
          firstname: "",
          othername: "",
          class: "",
          email: "",
          status: "teacher",
        });
        setFormErrors({});
        setApiError("");
        getTeachers()
      } else {
        setApiError(res.data.message || "Failed to add teacher.");
      }
    } catch (err) {
      console.error("Error adding teacher:", err);
      setApiError("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setNewTeacher({ ...newTeacher, [field]: value });
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
    // Clear API error when user makes changes
    if (apiError) {
      setApiError("");
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
      {/* Header Section - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Manage Teachers</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Add new teachers to the system</p>
        </div>
        <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
          Auto ID: {newTeacher.userID}
        </div>
      </div>

      <form onSubmit={handleAddTeacher} className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6 transition-all duration-300">
        {/* Form Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-green-900">Add New Teacher</h3>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse self-start sm:self-auto"></div>
        </div>

        {/* API Error Alert */}
        {apiError && (
          <div className="mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-700 text-xs sm:text-sm flex-1">{apiError}</p>
          </div>
        )}

        {/* Form Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {/* Last Name */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              value={newTeacher.lastname}
              onChange={(e) => handleFieldChange("lastname", e.target.value)}
              className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-sm sm:text-base ${
                formErrors.lastname ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Enter last name"
            />
            {formErrors.lastname && (
              <p className="text-red-600 text-xs mt-2 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {formErrors.lastname}
              </p>
            )}
          </div>

          {/* First Name */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              value={newTeacher.firstname}
              onChange={(e) => handleFieldChange("firstname", e.target.value)}
              className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-sm sm:text-base ${
                formErrors.firstname ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Enter first name"
            />
            {formErrors.firstname && (
              <p className="text-red-600 text-xs mt-2 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {formErrors.firstname}
              </p>
            )}
          </div>

          {/* Other Name */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Name <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <input
              type="text"
              value={newTeacher.othername}
              onChange={(e) => handleFieldChange("othername", e.target.value)}
              className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-sm sm:text-base"
              placeholder="Enter other name"
            />
          </div>

          {/* Class */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class *
            </label>
            <select
              value={newTeacher.class}
              onChange={(e) => handleFieldChange("class", e.target.value)}
              className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-sm sm:text-base ${
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
              <p className="text-red-600 text-xs mt-2 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {formErrors.class}
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
              value={newTeacher.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-sm sm:text-base ${
                formErrors.email ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Enter email address"
            />
            {formErrors.email && (
              <p className="text-red-600 text-xs mt-2 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {formErrors.email}
              </p>
            )}
          </div>
        </div>

        {/* Form Footer - Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-green-200">
          <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            Fields marked with * are required
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center disabled:cursor-not-allowed w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-sm sm:text-base">Adding Teacher...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-sm sm:text-base">Add Teacher</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeacher;