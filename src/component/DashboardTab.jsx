import React from "react";

const DashboardTab = ({ students, activities }) => {
  // Explicitly use React to satisfy the linter
  React; // This line makes TypeScript happy
  
  return (
    <div className="px-3 sm:px-4 lg:px-0">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Total Students Card */}
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md border-l-4 border-blue-500 transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 text-xs sm:text-sm font-medium">Total Students</h3>
            <div className="bg-blue-100 p-1.5 sm:p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold mt-2 sm:mt-3">{students.length}</p>
          <p className="text-xs text-green-600 mt-1">+5% from last month</p>
        </div>
        
        {/* Classes Card */}
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md border-l-4 border-green-500 transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 text-xs sm:text-sm font-medium">Classes</h3>
            <div className="bg-green-100 p-1.5 sm:p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold mt-2 sm:mt-3">12</p>
          <p className="text-xs text-green-600 mt-1">+2 new this semester</p>
        </div>
        
        {/* Teachers Card */}
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md border-l-4 border-yellow-500 transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 text-xs sm:text-sm font-medium">Teachers</h3>
            <div className="bg-yellow-100 p-1.5 sm:p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold mt-2 sm:mt-3">24</p>
          <p className="text-xs text-green-600 mt-1">+3 new hires</p>
        </div>
        
        {/* Attendance Card */}
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md border-l-4 border-purple-500 transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-500 text-xs sm:text-sm font-medium">Attendance</h3>
            <div className="bg-purple-100 p-1.5 sm:p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold mt-2 sm:mt-3">94%</p>
          <p className="text-xs text-green-600 mt-1">+2% from last week</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 sm:mt-8 bg-white p-4 sm:p-5 rounded-lg shadow-md">
        <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-gray-800">Recent Activity</h3>
        {activities.length === 0 ? (
          <p className="text-gray-500 text-sm sm:text-base">No recent activities yet.</p>
        ) : (
          <ul className="space-y-2 sm:space-y-3">
            {activities.map((activity) => (
              <li key={activity.id} className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 flex-shrink-0">
                  <span className="text-sm sm:text-lg">{activity.action.split(" ")[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base truncate">{activity.action}</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{activity.description}</p>
                </div>
                <span className="ml-2 sm:ml-auto text-xs sm:text-sm text-gray-500 flex-shrink-0 whitespace-nowrap">
                  {activity.time}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardTab;