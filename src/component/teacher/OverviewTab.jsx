import React, { useState, useEffect } from "react";
import axios from "axios";

const OverviewTab = ({ teacherData, onAddNotification }) => {
  const [stats, setStats] = useState({
    pendingSubmissions: 0,
    averagePerformance: 0,
    totalClasses: 0,
    nextClass: null
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch overview data
  useEffect(() => {
    const fetchOverviewData = async () => {
      if (!teacherData?.id) return;

      try {
        setLoading(true);
        
        // Fetch multiple data points in parallel
        const [statsRes, activitiesRes, classesRes] = await Promise.all([
          axios.get(`/api/teachers/${teacherData.id}/overview-stats`),
          axios.get(`/api/teachers/${teacherData.id}/recent-activities`),
          axios.get(`/api/teachers/${teacherData.id}/upcoming-classes`)
        ]);

        setStats(statsRes.data);
        setRecentActivities(activitiesRes.data.activities || []);
        setUpcomingClasses(classesRes.data.classes || []);
        
      } catch (error) {
        console.error("Error fetching overview data:", error);
        onAddNotification("Failed to load dashboard data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, [teacherData?.id, onAddNotification]);

  // Stats cards configuration
  const statCards = [
    { 
      title: "Pending Submissions", 
      value: stats.pendingSubmissions, 
      subtitle: "Needs grading", 
      color: "blue",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    { 
      title: "Average Performance", 
      value: `${stats.averagePerformance}%`, 
      subtitle: "Class average", 
      color: "green",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 11.955 0 0112 2.944a11.955 11.955 11.955 0 01-8.618 3.04A12.02 12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    { 
      title: "Active Classes", 
      value: stats.totalClasses, 
      subtitle: "This semester", 
      color: "purple",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      title: "Next Class", 
      value: stats.nextClass?.subject || "None", 
      subtitle: stats.nextClass ? `Starts ${stats.nextClass.time}` : "No classes today", 
      color: "yellow",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  // Format time for display
  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Get time until next class
  const getTimeUntilClass = (classTime) => {
    const now = new Date();
    const classDate = new Date(classTime);
    const diffMs = classDate - now;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `In ${diffMins} minutes`;
    const diffHours = Math.floor(diffMins / 60);
    return `In ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton for stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white shadow rounded-lg p-4 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Loading skeleton for content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white shadow rounded-lg p-6 lg:col-span-2 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-3 rounded-lg bg-gray-100">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="p-3 border rounded-lg">
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white shadow rounded-lg p-4 border-l-4"
            style={{ borderLeftColor: `var(--${stat.color}-500)` }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                <p className="text-xl md:text-2xl font-bold mt-1">{stat.value}</p>
                <span className={`text-${stat.color === 'yellow' ? 'gray' : stat.color}-600 text-xs flex items-center mt-2`}>
                  {stat.subtitle}
                </span>
              </div>
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `var(--${stat.color}-100)` }}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activities & Upcoming Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Recent Activities */}
        <div className="bg-white shadow rounded-lg p-4 md:p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md md:text-lg font-semibold text-gray-800">Recent Activities</h3>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              View All
            </button>
          </div>
          
          {recentActivities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>No recent activities</p>
            </div>
          ) : (
            <ul className="space-y-3 md:space-y-4">
              {recentActivities.slice(0, 5).map((activity) => (
                <li key={activity.id} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `var(--${activity.type === 'submission' ? 'blue' : 'green'}-100)` }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" 
                           style={{ color: `var(--${activity.type === 'submission' ? 'blue' : 'green'}-500)` }}
                           fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d={activity.type === 'submission' 
                                ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                                : "M13 10V3L4 14h7v7l9-11h-7z"} />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{activity.message}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-gray-500 text-sm">{activity.className}</p>
                        <p className="text-gray-400 text-xs">{activity.timestamp}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white shadow rounded-lg p-4 md:p-6">
          <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-4">Today's Classes</h3>
          
          {upcomingClasses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>No classes scheduled for today</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{classItem.subject}</h4>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {formatTime(classItem.startTime)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{classItem.room}</span>
                    <span className="text-blue-600 font-medium">
                      {getTimeUntilClass(classItem.startTime)}
                    </span>
                  </div>
                  {classItem.topic && (
                    <p className="text-xs text-gray-500 mt-2">Topic: {classItem.topic}</p>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <button className="w-full mt-4 text-center text-blue-600 text-sm font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            View Weekly Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;