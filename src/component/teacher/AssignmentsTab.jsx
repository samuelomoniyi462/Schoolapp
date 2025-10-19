import React from "react";
import { teacherData } from "../../Teacherdashboard";

const AssignmentsTab = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">Assignments</h3>
          <p className="text-sm text-gray-500 mt-1">Manage and track student assignments</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center sm:justify-start shadow-sm hover:shadow-md active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Assignment
        </button>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {teacherData.assignments.map((assignment, index) => {
          const submissionRate = Math.round((assignment.submissions / assignment.totalStudents) * 100);
          const getProgressColor = (rate) => {
            if (rate >= 80) return "bg-green-500";
            if (rate >= 60) return "bg-blue-500";
            if (rate >= 40) return "bg-yellow-500";
            return "bg-red-500";
          };

          return (
            <div 
              key={index} 
              className="p-4 md:p-5 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 bg-white group"
            >
              {/* Assignment Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                    {assignment.title}
                  </h4>
                  <div className="flex items-center text-sm text-gray-500 flex-wrap gap-2">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      {assignment.class}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Due {assignment.dueDate}
                    </span>
                  </div>
                </div>
                <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-200 whitespace-nowrap">
                  {assignment.submissions}/{assignment.totalStudents} Submitted
                </span>
              </div>

              {/* Progress Section */}
              <div className="mb-5">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-600 font-medium">Submission Progress</span>
                  <span className={`font-semibold ${
                    submissionRate >= 80 ? 'text-green-600' :
                    submissionRate >= 60 ? 'text-blue-600' :
                    submissionRate >= 40 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {submissionRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full transition-all duration-500 ${getProgressColor(submissionRate)}`}
                    style={{ width: `${submissionRate}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md active:scale-95">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Grade Submissions
                </button>
                <button className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 group/menu">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover/menu:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State (if no assignments) */}
      {teacherData.assignments.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No assignments yet</h4>
          <p className="text-gray-500 mb-4">Create your first assignment to get started</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-lg text-sm font-medium transition-colors duration-200">
            Create Assignment
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignmentsTab;