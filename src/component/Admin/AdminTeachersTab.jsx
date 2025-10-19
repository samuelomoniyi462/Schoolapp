import React from "react";
import AddTeacher from "../../teachers/AddTeacher";
import TeacherList from "../../teachers/TeacherList";

const TeacherTab = ({
 teachers,
  newTeacher,
  setNewTeacher,
  editingTeacher,
  formErrors,
  searchQuery,
  filteredTeachers,
  onAddTeacher,
  onEditTeacher,
  onDeleteTeacher,
  onSaveEdit,
  onCancelEdit,
  onEditField,
  onSearch
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Manage Teachers</h2>

      <AddTeacher
        newTeacher={newTeacher}
        setNewTeacher={setNewTeacher}
        formErrors={formErrors}
        onAddTeacher={onAddTeacher}
      />

      <TeacherList
        teachers={teachers}
        searchQuery={searchQuery}
        handleSearch={onSearch}
        filteredTeachers={filteredTeachers}
        handleEditTeacher={onEditTeacher}
        handleDeleteTeacher={onDeleteTeacher}
        editingTeacher={editingTeacher}
        formErrors={formErrors}
        handleSaveEdit={onSaveEdit}
        handleCancelEdit={onCancelEdit}
        handleEditField={onEditField}
      />
    </div>
  );
};

export default TeacherTab;