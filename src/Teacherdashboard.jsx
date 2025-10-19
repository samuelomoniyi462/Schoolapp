import React, { useState } from "react";
import Header from "./component/teacher/Header";
import Tabs from "./component/teacher/Tabs";
import OverviewTab from "./component/teacher/OverviewTab";
import ClassesTab from "./component/teacher/ClassesTab";
import AssignmentsTab from "./component/teacher/AssignmentsTab";
import GradesTab from "./component/teacher/GradesTab";
import MaterialsTab from "./component/teacher/MaterialsTab";
import StudentTab from "./component/teacher/StudentTab";

// ================== Sample teacher data ==================
const initialTeacherData = {
  name: "Dr. James Wilson",
  subject: "Mathematics",
  teacherId: "TCH-2021-0789",
  classes: ["10th Grade Algebra", "11th Grade Calculus", "12th Grade Statistics"],
  upcomingClasses: [
    { subject: "10th Grade Algebra", time: "9:00 AM", room: "Room 302" },
    { subject: "11th Grade Calculus", time: "10:30 AM", room: "Room 305" },
    { subject: "12th Grade Statistics", time: "1:00 PM", room: "Room 207" },
  ],
  assignments: [
    {
      id: 1,
      class: "10th Algebra",
      title: "Quadratic Equations Homework",
      dueDate: "Tomorrow",
      submissions: 15,
      totalStudents: 24
    },
    {
      id: 2,
      class: "11th Calculus",
      title: "Derivatives Quiz",
      dueDate: "In 3 days",
      submissions: 8,
      totalStudents: 20
    },
    {
      id: 3,
      class: "12th Statistics",
      title: "Probability Project",
      dueDate: "Next week",
      submissions: 5,
      totalStudents: 18
    },
  ],
  studentPerformance: [
    { class: "10th Algebra", average: "82%", improvement: "+5% from last month" },
    { class: "11th Calculus", average: "78%", improvement: "+3% from last month" },
    { class: "12th Statistics", average: "85%", improvement: "+7% from last month" },
  ],
  teachingMaterials: [
    {
      id: 1,
      type: "lesson",
      title: "Introduction to Calculus",
      class: "11th Calculus",
      status: "Published",
      downloadUrl: "#",
      description: "Slides and exercises for first calculus lesson"
    },
    {
      id: 2,
      type: "worksheet",
      title: "Algebra Practice Problems",
      class: "10th Algebra",
      status: "Draft",
      downloadUrl: "#",
      description: "Set of 20 practice problems with solutions"
    },
    {
      id: 3,
      type: "exam",
      title: "Midterm Exam",
      class: "12th Statistics",
      status: "Scheduled",
      description: "Covers probability distributions and hypothesis testing"
    },
    {
      id: 4,
      type: "resource",
      title: "Math Reference Guide",
      class: "All Classes",
      status: "Published",
      downloadUrl: "#",
      description: "Formula sheet and concept overview"
    }
  ],
  // ✅ Students linked to this teacher
  students: [
    { id: "STU-1001", name: "Emily Carter", grade: "10th Grade Algebra", email: "emily@example.com" },
    { id: "STU-1002", name: "Daniel Lee", grade: "11th Grade Calculus", email: "daniel@example.com" },
    { id: "STU-1003", name: "Sophia Johnson", grade: "12th Grade Statistics", email: "sophia@example.com" },
  ]
};

// ================== Sample notifications ==================
const initialNotifications = [
  { id: 1, message: "New assignment submission from Emily", time: "10 min ago", read: false },
  { id: 2, message: "Department meeting scheduled", time: "30 min ago", read: false },
  { id: 3, message: "Grade submission deadline reminder", time: "1 hour ago", read: true },
];

export default function TeacherDashboard() {
  // State management
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [teacherData] = useState(initialTeacherData);

  // Notification handlers
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
      time: "Just now",
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  // ================== Tab content renderer ==================
  const renderActiveTab = () => {
    const tabProps = {
      teacherData,
      onAddNotification: addNotification
    };

    const tabComponents = {
      overview: <OverviewTab {...tabProps} notifications={notifications} onMarkAsRead={markAsRead} onMarkAllAsRead={markAllAsRead} />,
      classes: <ClassesTab {...tabProps} />,
      assignments: <AssignmentsTab {...tabProps} />,
      grades: <GradesTab {...tabProps} />,
      materials: <MaterialsTab {...tabProps} />,
      students: <StudentTab {...tabProps} />   // ✅ New Students tab
    };

    return tabComponents[activeTab] || tabComponents.overview;
  };

  // Mobile menu handler
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        teacherData={teacherData}
        notifications={notifications}
        activeTab={activeTab}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={handleMobileMenuToggle}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
      />

      <Tabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isMobileMenuOpen={isMobileMenuOpen}
        teacherData={teacherData}
      />

      <main className="p-4 md:p-6">
        {renderActiveTab()}
      </main>
    </div>
  );
}

// Export teacherData for use in other components if needed
export { initialTeacherData as teacherData };
