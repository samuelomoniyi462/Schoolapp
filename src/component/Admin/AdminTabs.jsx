import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { 
      id: "dashboard", 
      label: "Dashboard", 
      mobileLabel: "Dashboard",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      id: "students", 
      label: "Students", 
      mobileLabel: "Students",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    { 
      id: "classes", 
      label: "Classes", 
      mobileLabel: "Classes",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    { 
      id: "reports", 
      label: "Reports", 
      mobileLabel: "Reports",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      id: "teacher", 
      label: "Teachers", 
      mobileLabel: "Teachers",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      id: "link-students", 
      label: "Link Students", 
      mobileLabel: "Link",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M13 7h-1V3a1 1 0 10-2 0v4H9a4 4 0 000 8h1v4a1 1 0 102 0v-4h1a4 4 0 000-8z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-3">
      <div className="flex overflow-x-auto scrollbar-hide gap-1 sm:gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`capitalize px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium flex items-center transition-all duration-200 relative group flex-shrink-0 ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
            }`}
          >
            {activeTab === tab.id && (
              <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full hidden sm:block"></div>
            )}
            
            <span className={`transition-all duration-200 ${
              activeTab === tab.id 
                ? 'text-white scale-110' 
                : 'text-gray-500 group-hover:text-gray-700 group-hover:scale-110'
            }`}>
              {tab.icon}
            </span>
            
            <span className="font-medium ml-2 hidden sm:inline text-sm sm:text-base">
              {tab.label}
            </span>
            
            {activeTab === tab.id && (
              <div className="sm:hidden absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
            )}
            
            <div className={`absolute inset-0 rounded-lg transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-blue-600' 
                : 'bg-gray-100 opacity-0 group-hover:opacity-100'
            }`} style={{ zIndex: -1 }}></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
