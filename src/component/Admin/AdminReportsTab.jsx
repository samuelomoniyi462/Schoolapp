import React from "react";

const ReportsTab = ({ reports, onGenerateReport }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Reports</h2>
          <p className="text-sm text-gray-500 mt-1">Generate and manage system reports</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>{reports.length} report{reports.length !== 1 ? 's' : ''} generated</span>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => onGenerateReport({ title: "Student Performance", type: "performance" })}
            className="group border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-white hover:border-blue-300 transition-all duration-300 cursor-pointer hover:shadow-sm"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-blue-100 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-blue-50 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h4 className="font-semibold mt-4 text-gray-900 group-hover:text-blue-700 transition-colors">Student Performance</h4>
            <p className="text-sm text-gray-500 mt-2">Generate academic performance reports</p>
            <div className="mt-3 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span>Click to generate</span>
              <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>

          <div
            onClick={() => onGenerateReport({ title: "Attendance", type: "attendance" })}
            className="group border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-white hover:border-green-300 transition-all duration-300 cursor-pointer hover:shadow-sm"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-green-100 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-green-50 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h4 className="font-semibold mt-4 text-gray-900 group-hover:text-green-700 transition-colors">Attendance Reports</h4>
            <p className="text-sm text-gray-500 mt-2">View and export attendance records</p>
            <div className="mt-3 text-xs text-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span>Click to generate</span>
              <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {reports.length} items
          </span>
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500">No reports generated yet</p>
            <p className="text-sm text-gray-400 mt-1">Generate your first report above</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {reports.map(report => (
                <li key={report.id} className="group hover:bg-gray-50 transition-colors duration-200">
                  <div className="py-4 px-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2.5 rounded-lg ${
                        report.type === 'performance' ? 'bg-blue-50' :
                        report.type === 'attendance' ? 'bg-green-50' : 'bg-purple-50'
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${
                          report.type === 'performance' ? 'text-blue-600' :
                          report.type === 'attendance' ? 'text-green-600' : 'text-purple-600'
                        }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{report.title}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Generated on {report.date}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onGenerateReport(report)}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors duration-200 group-hover:bg-blue-50"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsTab;