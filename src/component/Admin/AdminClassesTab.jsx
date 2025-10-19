import React from "react";

const ClassesTab = ({ classes }) => {
  // Color variants for different classes
  const getClassColor = (index) => {
    const colors = [
      { border: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', hover: 'hover:bg-blue-100' },
      { border: 'border-green-500', bg: 'bg-green-50', text: 'text-green-700', hover: 'hover:bg-green-100' },
      { border: 'border-purple-500', bg: 'bg-purple-50', text: 'text-purple-700', hover: 'hover:bg-purple-100' },
      { border: 'border-orange-500', bg: 'bg-orange-50', text: 'text-orange-700', hover: 'hover:bg-orange-100' },
      { border: 'border-indigo-500', bg: 'bg-indigo-50', text: 'text-indigo-700', hover: 'hover:bg-indigo-100' },
      { border: 'border-pink-500', bg: 'bg-pink-50', text: 'text-pink-700', hover: 'hover:bg-pink-100' },
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Manage Classes</h2>
          <p className="text-sm text-gray-500 mt-1">{classes.length} class{classes.length !== 1 ? 'es' : ''} available</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>Interactive Classes</span>
        </div>
      </div>

      {classes.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l-9 5m9-5v6" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No classes available</h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            Classes will appear here once they are created. Get started by adding your first class.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem, index) => {
            const color = getClassColor(index);
            return (
              <div 
                key={classItem.id} 
                className={`bg-white p-6 rounded-xl shadow-sm border-t-4 ${color.border} transition-all duration-300 hover:shadow-md hover:translate-y-1 group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {classItem.name}
                  </h3>
                  <div className={`w-3 h-3 rounded-full ${color.border.replace('border-', 'bg-')}`}></div>
                </div>

                {/* Class Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className={`p-1.5 rounded-lg ${color.bg} mr-3`}>
                      <svg className={`w-4 h-4 ${color.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">{classItem.studentCount}</span>
                      <span className="text-gray-500 ml-1">Students enrolled</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <div className={`p-1.5 rounded-lg ${color.bg} mr-3`}>
                      <svg className={`w-4 h-4 ${color.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Schedule</span>
                      <span className="text-gray-500 ml-1">{classItem.schedule}</span>
                    </div>
                  </div>

                  {/* Additional Info - Teacher/Subject if available */}
                  {classItem.teacher && (
                    <div className="flex items-center text-sm text-gray-600">
                      <div className={`p-1.5 rounded-lg ${color.bg} mr-3`}>
                        <svg className={`w-4 h-4 ${color.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Teacher</span>
                        <span className="text-gray-500 ml-1">{classItem.teacher}</span>
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  className={`w-full ${color.bg} ${color.text} ${color.hover} py-2.5 px-4 rounded-lg transition-all duration-200 font-medium flex items-center justify-center group`}
                >
                  <span>View Class</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClassesTab;