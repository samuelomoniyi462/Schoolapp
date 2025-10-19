import React from "react";
import { teacherData } from "../../Teacherdashboard";

const GradesTab = () => {
  const handleSubmitGrades = () => {
    console.log("Submitting grades...");
    // Add your grade submission logic here
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6">
      <h3 className="text-md md:text-lg font-semibold text-gray-800 mb-6">Student Performance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {teacherData.studentPerformance.map((classPerf, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h4 className="font-medium text-lg mb-3">{classPerf.class}</h4>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">{classPerf.average}</p>
                <p className="text-sm text-gray-500 mt-1">Class Average</p>
              </div>
              <span className="text-green-600 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                {classPerf.improvement}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3">Grade Submission</h4>
        <p className="text-sm text-gray-600 mb-4">The grade submission deadline for this quarter is October 15th, 2023.</p>
        <button 
          onClick={handleSubmitGrades}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Submit Grades
        </button>
      </div>

      {/* Recent Grade Activities */}
      <div className="mt-8">
        <h4 className="font-medium text-gray-800 mb-4">Recent Grade Activities</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Calculus Quiz #3 graded</p>
              <p className="text-sm text-gray-500">22 students graded • 15 minutes ago</p>
            </div>
            <button className="text-blue-600 text-sm font-medium">View Details</button>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Algebra Homework #5 graded</p>
              <p className="text-sm text-gray-500">18 students graded • 2 hours ago</p>
            </div>
            <button className="text-blue-600 text-sm font-medium">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradesTab;