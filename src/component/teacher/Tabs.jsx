import React from "react";

const Tabs = ({ activeTab, onTabChange, isMobileMenuOpen, teacherData }) => {
  // Define navigation tabs with IDs, labels, and icons
  const navigationTabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "classes", label: "Classes", icon: "👨‍🎓" },
    { id: "students", label: "Student List", icon: "📋" }, 
    { id: "assignments", label: "Assignments", icon: "📝" },
    { id: "grades", label: "Grading", icon: "📈" },
    { id: "materials", label: "Materials", icon: "📚" }
  ];

  // Get the page title based on active tab
  const getPageTitle = (tabId) => {
    const pageTitles = {
      overview: "Teacher Dashboard",
      classes: "My Classes",
      students: "Student List", // Added title for Student List
      assignments: "Assignments",
      grades: "Grading Center",
      materials: "Teaching Materials"
    };
    return pageTitles[tabId] || "Teacher Dashboard";
  };

  // Get the page description based on active tab
  const getPageDescription = (tabId) => {
    const pageDescriptions = {
      overview: "Monitor your classroom performance and activities",
      classes: "Manage your classes and student groups",
      students: "View and manage all student profiles and information", // Added description for Student List
      assignments: "Create and track student assignments",
      grades: "Evaluate and manage student grades",
      materials: "Organize and share teaching resources"
    };
    return pageDescriptions[tabId] || "Manage your classroom activities";
  };

  // Generate initials from teacher's name for avatar
  const getTeacherInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('');
  };

  return (
    <>
      {/* MOBILE NAVIGATION MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg shadow-2xl border-b border-gray-200/60 fixed top-0 left-0 right-0 z-50 max-h-screen overflow-y-auto">
          
          {/* Teacher Profile Section */}
          <div className="flex items-center p-4 border-b border-gray-100/80 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80">
            
            {/* Teacher Avatar with Status Indicator */}
            <div className="relative">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 shadow-lg ring-2 ring-white/20">
                {getTeacherInitials(teacherData.name)}
              </div>
              {/* Online Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
            </div>

            {/* Teacher Information */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-sm truncate">
                {teacherData.name}
              </p>
              <p className="text-xs text-gray-600 truncate">
                Senior Educator
              </p>
            </div>

            {/* Online Status Badge */}
            <div className="text-xs text-gray-500 bg-white/60 px-2 py-1 rounded-full border border-gray-200/60">
              Online
            </div>
          </div>
          
          {/* Mobile Navigation Tabs */}
          <div className="py-3 px-3 space-y-1">
            {navigationTabs.map((tab) => (
              <MobileTabButton
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={() => onTabChange(tab.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* DESKTOP HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start lg:items-center gap-3 sm:gap-4 mb-6 lg:mb-8 px-4 sm:px-6">
        
        {/* Page Title and Description */}
        <div className="flex-1 min-w-0 order-2 sm:order-1">
          <div className="flex items-center gap-2 mb-1 sm:mb-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent leading-tight">
              {getPageTitle(activeTab)}
            </h2>
            {/* Status indicator can be added here if needed */}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 lg:text-gray-500 max-w-2xl leading-relaxed">
            {getPageDescription(activeTab)}
          </p>
        </div>
        
        {/* Desktop Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/60 p-1 sm:p-2 flex overflow-x-auto scrollbar-hide order-1 sm:order-2 w-full sm:w-auto">
          {navigationTabs.map((tab) => (
            <DesktopTabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
            />
          ))}
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => onTabChange(activeTab)} // This will close the menu via parent component
        />
      )}
    </>
  );
};

// Mobile Tab Button Component
const MobileTabButton = ({ tab, isActive, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`
        w-full text-left py-3 px-4 rounded-xl flex items-center 
        transition-all duration-300 group relative overflow-hidden
        ${isActive 
          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-[1.02] ring-2 ring-blue-100/30" 
          : "text-gray-700 hover:bg-gray-50/80 hover:text-gray-900 hover:shadow-md"
        }
      `}
    >
      {/* Active Tab Glow Effect */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 animate-pulse"></div>
      )}
      
      {/* Tab Icon */}
      <span className={`
        text-lg mr-3 transition-all duration-300 relative z-10
        ${isActive ? 'scale-110 filter drop-shadow-sm' : 'group-hover:scale-110 group-hover:filter group-hover:drop-shadow-sm'}
      `}>
        {tab.icon}
      </span>
      
      {/* Tab Label */}
      <span className="font-semibold text-sm flex-1 relative z-10">
        {tab.label}
      </span>
      
      {/* Active Tab Indicator Dot */}
      {isActive && (
        <div className="w-1.5 h-1.5 bg-white rounded-full ml-2 relative z-10 shadow-sm"></div>
      )}
      
      {/* Background Hover Effect */}
      <div className={`
        absolute inset-0 rounded-xl transition-opacity duration-300
        ${isActive 
          ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
          : 'bg-gradient-to-r from-gray-100 to-gray-50 opacity-0 group-hover:opacity-100'
        }
      `} style={{ zIndex: 0 }}></div>
    </button>
  );
};

// Desktop Tab Button Component - Made responsive
const DesktopTabButton = ({ tab, isActive, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`
        px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap rounded-lg sm:rounded-xl
        transition-all duration-300 flex items-center group relative overflow-hidden min-w-max
        ${isActive 
          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg ring-1 sm:ring-2 ring-blue-100/50" 
          : "text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-md"
        }
      `}
    >
      {/* Active Tab Glow Effect */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 animate-pulse"></div>
      )}
      
      {/* Active Tab Bottom Indicator - Hidden on mobile, shown on sm and up */}
      {isActive && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full shadow-lg hidden sm:block"></div>
      )}
      
      {/* Tab Icon */}
      <span className={`
        text-base sm:text-lg mr-2 sm:mr-3 transition-all duration-300 relative z-10
        ${isActive ? 'scale-110 filter drop-shadow-sm' : 'group-hover:scale-110 group-hover:filter group-hover:drop-shadow-sm'}
      `}>
        {tab.icon}
      </span>
      
      {/* Tab Label - Always visible */}
      <span className="relative z-10">
        {tab.label}
      </span>
      
      {/* Background Hover Effect */}
      <div className={`
        absolute inset-0 rounded-lg sm:rounded-xl transition-all duration-300
        ${isActive 
          ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
          : 'bg-gradient-to-r from-gray-100 to-gray-50 opacity-0 group-hover:opacity-100'
        }
      `} style={{ zIndex: 0 }}></div>
    </button>
  );
};

export default Tabs;