import React, { useState } from "react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New assignment in Math", time: "10 min ago", read: false },
    { id: 2, message: "Science test scheduled", time: "30 min ago", read: false },
    { id: 3, message: "Your grade has been updated", time: "1 hour ago", read: true },
  ]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sample data for student
  const studentInfo = {
    name: "Emily Johnson",
    grade: "10th Grade",
    studentId: "STU-2023-0452",
    attendance: "96%",
    upcomingClasses: [
      { subject: "Mathematics", time: "9:00 AM", room: "Room 302" },
      { subject: "Science", time: "10:30 AM", room: "Lab 105" },
      { subject: "History", time: "1:00 PM", room: "Room 207" },
    ],
    assignments: [
      { subject: "Math", title: "Algebra Homework", dueDate: "Tomorrow", status: "pending" },
      { subject: "Science", title: "Lab Report", dueDate: "In 3 days", status: "in-progress" },
      { subject: "English", title: "Essay Draft", dueDate: "Next week", status: "completed" },
    ],
    grades: [
      { subject: "Mathematics", score: "A-", percentage: "92%" },
      { subject: "Science", score: "B+", percentage: "88%" },
      { subject: "History", score: "A", percentage: "95%" },
      { subject: "English", score: "B", percentage: "85%" },
    ],
    materials: [
      { 
        type: "textbook", 
        title: "Mathematics Textbook", 
        subject: "Mathematics", 
        status: "Required", 
        downloadUrl: "#",
        description: "Advanced Algebra and Calculus"
      },
      { 
        type: "textbook", 
        title: "Science Handbook", 
        subject: "Science", 
        status: "Required", 
        downloadUrl: "#",
        description: "Physics and Chemistry Principles"
      },
      { 
        type: "workbook", 
        title: "History Workbook", 
        subject: "History", 
        status: "Optional", 
        downloadUrl: "#",
        description: "World History Exercises"
      },
      { 
        type: "uniform", 
        title: "School Uniform", 
        subject: "General", 
        status: "Required", 
        description: "Navy blazer with school emblem, white shirt, and gray trousers/skirt"
      },
      { 
        type: "equipment", 
        title: "Scientific Calculator", 
        subject: "Mathematics", 
        status: "Required", 
        description: "TI-84 or equivalent graphing calculator"
      },
      { 
        type: "software", 
        title: "Office Suite", 
        subject: "Computer Science", 
        status: "Required", 
        downloadUrl: "#",
        description: "Microsoft Office or Google Workspace"
      }
    ]
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? {...notif, read: true} : notif
    ));
  };

  const getMaterialIcon = (type) => {
    switch(type) {
      case "textbook":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case "uniform":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case "equipment":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case "software":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case "workbook":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-white-100 to-indigo-80 text-black px-4 py-3 md:px-6 md:py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <button 
            className="md:hidden mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="bg-white p-1 md:p-2 rounded-lg mr-2 md:mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6l9-5m-9 5l-9-5m9 5v-6" />
            </svg>
          </div>
          <h1 className="text-lg md:text-xl font-bold">Student Portal</h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative">
            <button className="relative p-1 rounded-full hover:bg-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
              {studentInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span>Hi, {studentInfo.name.split(' ')[0]}</span>
          </div>
          <button className="bg-blue-700 hover:bg-blue-800 px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-2 px-4">
          <div className="flex items-center py-3 border-b">
            <div className="h-8 w-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-semibold mr-2">
              {studentInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span>{studentInfo.name}</span>
          </div>
          <div className="py-2">
            <button 
              className={`w-full text-left py-2 px-2 rounded flex items-center ${activeTab === "overview" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}`}
              onClick={() => setActiveTab("overview")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Overview
            </button>
            <button 
              className={`w-full text-left py-2 px-2 rounded flex items-center ${activeTab === "schedule" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}`}
              onClick={() => setActiveTab("schedule")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule
            </button>
            <button 
              className={`w-full text-left py-2 px-2 rounded flex items-center ${activeTab === "assignments" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}`}
              onClick={() => setActiveTab("assignments")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Assignments
            </button>
            <button 
              className={`w-full text-left py-2 px-2 rounded flex items-center ${activeTab === "grades" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}`}
              onClick={() => setActiveTab("grades")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 11.955 0 0112 2.944a11.955 11.955 11.955 0 01-8.618 3.04A12.02 12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Grades
            </button>
            <button 
              className={`w-full text-left py-2 px-2 rounded flex items-center ${activeTab === "materials" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}`}
              onClick={() => setActiveTab("materials")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Materials
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
            {activeTab === "overview" && "Student Dashboard"}
            {activeTab === "schedule" && "My Schedule"}
            {activeTab === "assignments" && "My Assignments"}
            {activeTab === "grades" && "My Grades"}
            {activeTab === "materials" && "Study Materials"}
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-1 flex overflow-x-auto">
            <button 
              className={`px-3 py-2 text-xs md:px-4 md:py-2 md:text-sm font-medium whitespace-nowrap ${activeTab === "overview" ? "bg-blue-100 text-blue-700" : "text-gray-600"}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button 
              className={`px-3 py-2 text-xs md:px-4 md:py-2 md:text-sm font-medium whitespace-nowrap ${activeTab === "schedule" ? "bg-blue-100 text-blue-700" : "text-gray-600"}`}
              onClick={() => setActiveTab("schedule")}
            >
              Schedule
            </button>
            <button 
              className={`px-3 py-2 text-xs md:px-4 md:py-2 md:text-sm font-medium whitespace-nowrap ${activeTab === "assignments" ? "bg-blue-100 text-blue-700" : "text-gray-600"}`}
              onClick={() => setActiveTab("assignments")}
            >
              Assignments
            </button>
            <button 
              className={`px-3 py-2 text-xs md:px-4 md:py-2 md:text-sm font-medium whitespace-nowrap ${activeTab === "grades" ? "bg-blue-100 text-blue-700" : "text-gray-600"}`}
              onClick={() => setActiveTab("grades")}
            >
              Grades
            </button>
            <button 
              className={`px-3 py-2 text-xs md:px-4 md:py-2 md:text-sm font-medium whitespace-nowrap ${activeTab === "materials" ? "bg-blue-100 text-blue-700" : "text-gray-600"}`}
              onClick={() => setActiveTab("materials")}
            >
              Materials
            </button>
          </div>
        </div>

        {/* Overview Tab Content */}
        {activeTab === "overview" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
              <div className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">Attendance</h3>
                    <p className="text-xl md:text-2xl font-bold mt-1">{studentInfo.attendance}</p>
                    <span className="text-green-600 text-xs flex items-center mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      +2% from last month
                    </span>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">Assignments Due</h3>
                    <p className="text-xl md:text-2xl font-bold mt-1">2</p>
                    <span className="text-red-600 text-xs flex items-center mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      </svg>
                      Math & Science
                    </span>
                  </div>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-4 border-l-4 border-purple-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">Average Grade</h3>
                    <p className="text-xl md:text-2xl font-bold mt-1">B+</p>
                    <span className="text-green-600 text-xs flex items-center mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      +5% from last term
                    </span>
                  </div>
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 11.955 0 0112 2.944a11.955 11.955 11.955 0 01-8.618 3.04A12.02 12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-4 border-l-4 border-yellow-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">Next Class</h3>
                    <p className="text-xl md:text-2xl font-bold mt-1">Math</p>
                    <span className="text-gray-500 text-xs flex items-center mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      In 30 minutes
                    </span>
                  </div>
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Activities & Upcoming Classes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Recent Activities */}
              <div className="bg-white shadow rounded-lg p-4 md:p-6 lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md md:text-lg font-semibold text-gray-800">Recent Activities</h3>
                  <button className="text-blue-600 text-sm font-medium">View All</button>
                </div>
                <ul className="space-y-3 md:space-y-4">
                  {notifications.map((notif) => (
                    <li key={notif.id} className={`p-3 rounded-lg ${!notif.read ? "bg-blue-50" : ""}`}>
                      <div className="flex justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{notif.message}</p>
                            <p className="text-gray-500 text-sm">{notif.time}</p>
                          </div>
                        </div>
                        {!notif.read && (
                          <button 
                            onClick={() => markAsRead(notif.id)}
                            className="text-blue-600 text-sm font-medium ml-2"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Upcoming Classes */}
              <div className="bg-white shadow rounded-lg p-4 md:p-6">
                <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-4">Upcoming Classes</h3>
                <div className="space-y-3">
                  {studentInfo.upcomingClasses.map((classItem, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{classItem.subject}</h4>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{classItem.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{classItem.room}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-center text-blue-600 text-sm font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50">
                  View Full Schedule
                </button>
              </div>
            </div>
          </>
        )}

        {/* Schedule Tab Content */}
        {activeTab === "schedule" && (
          <div className="bg-white shadow rounded-lg p-4 md:p-6">
            <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-4">Weekly Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Monday</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Tuesday</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Wednesday</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Thursday</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Friday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 text-sm font-medium">8:00 - 9:00</td>
                    <td className="p-3 bg-blue-50 border-l-4 border-blue-500">
                      <p className="text-sm font-medium">Mathematics</p>
                      <p className="text-xs text-gray-500">Room 302</p>
                    </td>
                    <td className="p-3"></td>
                    <td className="p-3 bg-blue-50 border-l-4 border-blue-500">
                      <p className="text-sm font-medium">Mathematics</p>
                      <p className="text-xs text-gray-500">Room 302</p>
                    </td>
                    <td className="p-3"></td>
                    <td className="p-3 bg-blue-50 border-l-4 border-blue-500">
                      <p className="text-sm font-medium">Mathematics</p>
                      <p className="text-xs text-gray-500">Room 302</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-sm font-medium">9:00 - 10:00</td>
                    <td className="p-3"></td>
                    <td className="p-3 bg-green-50 border-l-4 border-green-500">
                      <p className="text-sm font-medium">Science</p>
                      <p className="text-xs text-gray-500">Lab 105</p>
                    </td>
                    <td className="p-3"></td>
                    <td className="p-3 bg-green-50 border-l-4 border-green-500">
                      <p className="text-sm font-medium">Science</p>
                      <p className="text-xs text-gray-500">Lab 105</p>
                    </td>
                    <td className="p-3"></td>
                  </tr>
                  <tr>
                    <td className="p-3 text-sm font-medium">10:00 - 11:00</td>
                    <td className="p-3 bg-purple-50 border-l-4 border-purple-500">
                      <p className="text-sm font-medium">History</p>
                      <p className="text-xs text-gray-500">Room 207</p>
                    </td>
                    <td className="p-3"></td>
                    <td className="p-3 bg-purple-50 border-l-4 border-purple-500">
                      <p className="text-sm font-medium">History</p>
                      <p className="text-xs text-gray-500">Room 207</p>
                    </td>
                    <td className="p-3"></td>
                    <td className="p-3 bg-purple-50 border-l-4 border-purple-500">
                      <p className="text-sm font-medium">History</p>
                      <p className="text-xs text-gray-500">Room 207</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-sm font-medium">11:00 - 12:00</td>
                    <td className="p-3"></td>
                    <td className="p-3 bg-yellow-50 border-l-4 border-yellow-500">
                      <p className="text-sm font-medium">English</p>
                      <p className="text-xs text-gray-500">Room 115</p>
                    </td>
                    <td className="p-3"></td>
                    <td className="p-3 bg-yellow-50 border-l-4 border-yellow-500">
                      <p className="text-sm font-medium">English</p>
                      <p className="text-xs text-gray-500">Room 115</p>
                    </td>
                    <td className="p-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Assignments Tab Content */}
        {activeTab === "assignments" && (
          <div className="bg-white shadow rounded-lg p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md md:text-lg font-semibold text-gray-800">My Assignments</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">All</button>
                <button className="px-3 py-1 text-gray-600 rounded-lg text-sm font-medium">Pending</button>
                <button className="px-3 py-1 text-gray-600 rounded-lg text-sm font-medium">Completed</button>
              </div>
            </div>
            <div className="space-y-4">
              {studentInfo.assignments.map((assignment, index) => (
                <div key={index} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <div className="flex items-center">
                      <span className={`h-3 w-3 rounded-full mr-2 ${
                        assignment.status === "pending" ? "bg-red-500" : 
                        assignment.status === "in-progress" ? "bg-yellow-500" : "bg-green-500"
                      }`}></span>
                      <h4 className="font-medium">{assignment.title}</h4>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{assignment.subject} • Due {assignment.dueDate}</p>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                    {assignment.status === "completed" ? "View" : "Submit"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grades Tab Content */}
        {activeTab === "grades" && (
          <div className="bg-white shadow rounded-lg p-4 md:p-6">
            <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-4">My Grades</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {studentInfo.grades.map((grade, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{grade.subject}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      grade.score === "A" || grade.score === "A-" ? "bg-green-100 text-green-800" :
                      grade.score === "B+" || grade.score === "B" ? "bg-blue-100 text-blue-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {grade.score}
                    </span>
                  </div>
                  <div className="mt-2 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        grade.score === "A" || grade.score === "A-" ? "bg-green-500" :
                        grade.score === "B+" || grade.score === "B" ? "bg-blue-500" :
                        "bg-yellow-500"
                      }`} 
                      style={{ width: grade.percentage }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{grade.percentage} average</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Overall Performance</h4>
              <p className="text-sm text-gray-600">Your overall average is 90% (A-). Keep up the good work!</p>
            </div>
          </div>
        )}

        {/* Materials Tab Content */}
        {activeTab === "materials" && (
          <div className="bg-white shadow rounded-lg p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-md md:text-lg font-semibold text-gray-800">Study Materials</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">All</button>
                <button className="px-3 py-1 text-gray-600 rounded-lg text-sm font-medium">Textbooks</button>
                <button className="px-3 py-1 text-gray-600 rounded-lg text-sm font-medium">Uniform</button>
                <button className="px-3 py-1 text-gray-600 rounded-lg text-sm font-medium">Equipment</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentInfo.materials.map((material, index) => (
                <div key={index} className="border rounded-lg p-4 flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      {getMaterialIcon(material.type)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-800">{material.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        material.status === "Required" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                      }`}>
                        {material.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{material.subject}</p>
                    <p className="text-sm text-gray-500 mt-2">{material.description}</p>
                    {material.downloadUrl && (
                      <button className="mt-3 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Materials Information</h4>
              <p className="text-sm text-blue-600">
                All required materials must be obtained before the start of the semester. 
                Optional materials are recommended but not mandatory for course completion.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}