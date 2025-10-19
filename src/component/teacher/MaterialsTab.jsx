import React, { useState, useEffect } from "react";
import axios from "axios";
import AddMaterialForm from "./AddMaterialForm";

const MaterialsTab = () => {
  const [materials, setMaterials] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get("http://localhost:5100/material/all");
        if (res.data.success) {
          setMaterials(res.data.materials);
        }
      } catch (err) {
        console.error("Error fetching materials:", err);
      }
    };
    fetchMaterials();
  }, []);

  const handleMaterialAdded = (newMaterial) => {
    setMaterials((prev) => [newMaterial, ...prev]);
    setShowForm(false);
  };

  // ✅ Delete function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this material?")) return;

    try {
      const res = await axios.delete(`http://localhost:5100/material/${id}`);
      if (res.data.success) {
        setMaterials((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error("Error deleting material:", err);
      alert("Failed to delete material.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Teaching Materials</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? "Cancel" : "Add Material"}
        </button>
      </div>

      {showForm && <AddMaterialForm onMaterialAdded={handleMaterialAdded} />}

      <div className="mt-6">
        {materials.length === 0 ? (
          <p>No materials yet.</p>
        ) : (
          materials.map((m) => (
            <div key={m.id} className="border p-3 rounded mb-2 flex justify-between items-start">
              <div>
                <strong>{m.title}</strong> ({m.type}) - {m.className}
                <p>{m.description}</p>
                <span className="text-xs text-gray-500 block">{m.status}</span>
                {m.fileUrl && (
                  <a
                    href={`http://localhost:5100${m.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm mt-1 inline-block"
                  >
                    Download File
                  </a>
                )}
              </div>

              {/* ✅ Delete button */}
              <button
                onClick={() => handleDelete(m.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm ml-4"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MaterialsTab;
