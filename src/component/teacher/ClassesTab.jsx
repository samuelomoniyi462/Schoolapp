import React from "react";
import { teacherData } from "../../Teacherdashboard";

const ClassesTab = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6">
      <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-6">My Classes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teacherData.classes.map((classItem, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-lg">{classItem}</h4>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                {index === 0 ? "24 Students" : index === 1 ? "20 Students" : "18 Students"}
              </span>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Average Grade</span>
                <span className="font-medium">
                  {index === 0 ? "82%" : index === 1 ? "78%" : "85%"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    index === 0 ? "bg-blue-500" : index === 1 ? "bg-green-500" : "bg-purple-500"
                  }`} 
                  style={{ width: index === 0 ? "82%" : index === 1 ? "78%" : "85%" }}
                ></div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700">
                View Class
              </button>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesTab;