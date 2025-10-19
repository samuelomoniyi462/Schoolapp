import React, { useEffect, useState } from "react";

const Header = ({ activeTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // ✅ Clear storage and redirect to login
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6l9-5m-9 5l-9-5m9 5v-6" />
          </svg>
        </div>
        <h1 className="text-lg md:text-xl font-bold">Teacher Portal</h1>
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

        {user && (
          <div className="hidden md:flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
              {user.firstname[0]}{user.lastname ? user.lastname[0] : ""}
            </div>
            <span>Hi, {user.firstname}</span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="bg-blue-700 hover:bg-blue-800 px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
