import React from "react";
import AddStudent from "./students/AddStudent";
import StudentList from "./students/StudentList";

const StudentsTab = ({
  students,
  newStudent,
  setNewStudent,
  editingStudent,
  formErrors,
  searchQuery,
  filteredStudents,
  onAddStudent,
  onEditStudent,
  onDeleteStudent,
  onSaveEdit,
  onCancelEdit,
  onEditField,
  onSearch
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Manage Students</h2>

      <AddStudent
        newStudent={newStudent}
        setNewStudent={setNewStudent}
        formErrors={formErrors}
        onAddStudent={onAddStudent}
      />

      <StudentList
        students={students}
        searchQuery={searchQuery}
        handleSearch={onSearch}
        filteredStudents={filteredStudents}
        handleEditStudent={onEditStudent}
        handleDeleteStudent={onDeleteStudent}
        editingStudent={editingStudent}
        formErrors={formErrors}
        handleSaveEdit={onSaveEdit}
        handleCancelEdit={onCancelEdit}
        handleEditField={onEditField}
      />
    </div>
  );
};

export default StudentsTab;