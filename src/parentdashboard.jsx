import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
   const navigate = useNavigate(); // ⬅️ initialize navigate

  const handleLogout = () => {
    localStorage.removeItem("token");   // clear stored auth token
    localStorage.removeItem("user");    // clear user data (if any)
    navigate("/login"); 
     if (window.confirm("Are you sure you want to logout?")) {
      // In a real app, this would clear authentication tokens and redirect
      alert("Logged out successfully!");
    }
  };
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Math assignment due tomorrow", time: "2 hours ago", read: false },
    { id: 2, message: "Science test scheduled", time: "1 day ago", read: false },
    { id: 3, message: "Parent-teacher meeting confirmed", time: "2 days ago", read: true },
  ]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [children, setChildren] = useState([
    { id: 1, name: "Emily Johnson", grade: "Grade 5", attendance: "96%", upcomingAssignments: 3 },
    { id: 2, name: "Jacob Johnson", grade: "Grade 3", attendance: "92%", upcomingAssignments: 2 }
  ]);
  const [selectedChild, setSelectedChild] = useState(0);
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? {...notif, read: true} : notif
    ));
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
          <h1 className="text-lg md:text-xl font-bold">Parent Portal</h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative">
            <button className="relative p-1 rounded-full hover:bg-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
              PJ
            </div>
            <span>Parent</span>
          </div>
          <button
           onClick={handleLogout}
           className="bg-blue-700 hover:bg-blue-800 px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm flex items-center">
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
              PJ
            </div>
            <span>Parent</span>
          </div>
          <div className="py-2">
            <button className="w-full text-left py-2 px-2 rounded hover:bg-gray-100">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Dashboard
              </span>
            </button>
            <button className="w-full text-left py-2 px-2 rounded hover:bg-gray-100">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                My Children
              </span>
            </button>
            <button className="w-full text-left py-2 px-2 rounded hover:bg-gray-100">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Assignments
              </span>
            </button>
            <button className="w-full text-left py-2 px-2 rounded hover:bg-gray-100">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Attendance
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Parent Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-lg shadow-sm p-1 flex overflow-x-auto">
              <button 
                className={`px-3 py-2 text-xs md:px-4 md:py-2 md:text-sm font-medium whitespace-nowrap ${activeTab === "overview" ? "bg-blue-100 text-blue-700" : "text-gray-600"}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button 
                className={`px-3 py-2 text-xs md:px-4 md:py-2 md:text-sm font-medium whitespace-nowrap ${activeTab === "children" ? "bg-blue-100 text-blue-700" : "text-gray-600"}`}
                onClick={() => setActiveTab("children")}
              >
                My Children
              </button>
              <button 
                className={`px-3 py-2 text-xs md:px-4 md:py-2 md:text-sm font-medium whitespace-nowrap ${activeTab === "assignments" ? "bg-blue-100 text-blue-700" : "text-gray-600"}`}
                onClick={() => setActiveTab("assignments")}
              >
                Assignments
              </button>
            </div>
            {children.length > 1 && (
              <select 
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
                value={selectedChild}
                onChange={(e) => setSelectedChild(parseInt(e.target.value))}
              >
                {children.map((child, index) => (
                  <option key={child.id} value={index}>
                    {child.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Attendance</h3>
                <p className="text-xl md:text-2xl font-bold mt-1">{children[selectedChild].attendance}</p>
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
                <h3 className="text-gray-500 text-sm font-medium">Upcoming Assignments</h3>
                <p className="text-xl md:text-2xl font-bold mt-1">{children[selectedChild].upcomingAssignments}</p>
                <span className="text-red-600 text-xs flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                  1 due tomorrow
                </span>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-4 border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Recent Grades</h3>
                <p className="text-xl md:text-2xl font-bold mt-1">B+</p>
                <span className="text-green-600 text-xs flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  Improved from B-
                </span>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-4 border-l-4 border-yellow-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">School Events</h3>
                <p className="text-xl md:text-2xl font-bold mt-1">2</p>
                <span className="text-gray-500 text-xs flex items-center mt-2">This week</span>
              </div>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Activities & Quick Actions */}
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

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg p-4 md:p-6">
            <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-2 md:gap-3">
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium p-3 rounded-lg flex items-center justify-between transition-colors">
                <span className="text-sm md:text-base">View Grades</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button className="bg-green-50 hover:bg-green-100 text-green-700 font-medium p-3 rounded-lg flex items-center justify-between transition-colors">
                <span className="text-sm md:text-base">Message Teacher</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </button>
              <button className="bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium p-3 rounded-lg flex items-center justify-between transition-colors">
                <span className="text-sm md:text-base">View Schedule</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-medium p-3 rounded-lg flex items-center justify-between transition-colors">
                <span className="text-sm md:text-base">Pay Fees</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
