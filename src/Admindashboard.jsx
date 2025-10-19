import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import components with correct paths
import AddTeacher from "./teachers/AddTeacher";
import TeacherList from "./teachers/TeacherList";
import AddStudent from "./students/AddStudent";
import StudentList from "./students/StudentList";
import Header from "./component/Admin/Header";
import Tabs from "./component/Admin/Tabs";
import DashboardTab from "./component/DashboardTab";
import ClassesTab from "./component/Admin/ClassesTab";
import ReportsTab from "./component/Admin/ReportsTab";
import LinkStudentsTab from "./component/Admin/LinkStudentsTab";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [reports, setReports] = useState([]);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getStudents();
    getTeachers();
    initializeData();
  }, []);

  const getStudents = async () => {
    const response = await axios.get('http://localhost:5100/student/getStudents');
    if (response.data.success) {
      setStudents(response.data.students);
    }
  };
  const getTeachers = async () => {
    const response = await axios.get('http://localhost:5100/teacher/getTeachers');
    if (response.data.success) {
      setTeachers(response.data.teachers);
    }
  };

 
  const initializeData = () => {
    setClasses([
      { id: 1, name: "Mathematics 9", studentCount: 24, schedule: "Mon, Wed, Fri • 9:00 AM" },
      { id: 2, name: "Science 10", studentCount: 22, schedule: "Tue, Thu • 10:30 AM" },
      { id: 3, name: "English 9", studentCount: 20, schedule: "Mon, Wed, Fri • 11:00 AM" },
      { id: 4, name: "History 11", studentCount: 18, schedule: "Tue, Thu • 1:00 PM" },
      { id: 5, name: "Physics 12", studentCount: 16, schedule: "Mon, Wed, Fri • 2:00 PM" },
      { id: 6, name: "Art 10", studentCount: 15, schedule: "Tue, Thu • 3:30 PM" },
    ]);

    setReports([
      { id: 1, title: "Grade 10 Semester Report", type: "performance", date: "May 15, 2023" },
      { id: 2, title: "April Attendance Summary", type: "attendance", date: "May 2, 2023" },
      { id: 3, title: "Science Fair Results", type: "event", date: "April 20, 2023" },
    ]);
  };

  // Helper functions
  const addActivity = (action, description) => {
    const newActivity = {
      id: Date.now(),
      action,
      description,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setActivities((prev) => [newActivity, ...prev].slice(0, 10));
  };


  const generateReport = (report) => {
    console.log("Generating report:", report);
    alert(`Report generated: ${report.title}`);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      alert("Logged out successfully!");
    }
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onLogout={handleLogout} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="p-6">
        {activeTab === "dashboard" && (
          <DashboardTab students={students} activities={activities} />
        )}

        {activeTab === "students" && (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Manage Students</h2>
            <AddStudent
              getStudents={getStudents}
            />
            <StudentList
              students={students}
              getStudents={getStudents}
            />
          </div>
        )}

        {activeTab === "classes" && (
          <ClassesTab classes={classes} />
        )}

        {activeTab === "link-students" && <LinkStudentsTab />}

        {activeTab === "reports" && (
          <ReportsTab reports={reports} onGenerateReport={generateReport} />
        )}

        {activeTab === "teacher" && (
          <>
            <AddTeacher
            getTeachers={getTeachers}
             />
            <TeacherList
              teachers={teachers}
              getTeachers={getTeachers}
            />
          </>
        )}
      </main>
    </div>
  );
}