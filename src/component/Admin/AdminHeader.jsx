import React from "react";

const Header = ({ onLogout, user }) => {
  return (
    <header className="bg-gradient-to-r from-white via-indigo-25 to-indigo-50 text-gray-800 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center shadow-sm border-b border-gray-200/60 backdrop-blur-sm bg-white/80">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
          <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent leading-tight">
            School Admin Dashboard
          </h1>
          <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">
            {user ? `Welcome, ${user.name}` : "Manage students, teachers, and classes efficiently"}
          </p>
          <p className="text-xs text-gray-500 mt-0.5 sm:hidden">
            {user ? `Hi, ${user.name.split(' ')[0]}` : "Admin Dashboard"}
          </p>
        </div>
      </div>
      
      <button
        onClick={onLogout}
        className="group bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow active:scale-95 active:shadow-inner"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 sm:mr-2 text-gray-500 group-hover:text-gray-700 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span className="hidden sm:inline">Logout</span>
        <span className="sm:hidden text-xs">Exit</span>
      </button>
    </header>
  );
};

export default Header;