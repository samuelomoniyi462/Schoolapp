import React, { useState } from 'react';
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    'Alumni',
    'PTA',
    'StaffMail',
    'GMC',
    'Contact Us',
    'Blog',
    'IT Support',
    'Recruitment'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    setSearchQuery('');
  };

  return (
    <>
      <nav className="bg-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and mobile menu button */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/home">
                  <span className="text-xl text-orange-300 font-bold">School app  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-200"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Search bar */}
            <div className="flex items-center">
              <form onSubmit={handleSearch} className="hidden md:block">
                <div className="flex rounded-md overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 w-64 text-gray-50 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 px-4 py-2 transition duration-200"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none transition duration-200"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-800">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <form onSubmit={handleSearch}>
                  <div className="flex rounded-md overflow-hidden">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="px-4 py-2 w-full text-gray-800 focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-500 px-4 py-2 transition duration-200"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>

              {/* Mobile Navigation Items */}
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;