import React, { useEffect, useState } from "react";
import axios from "axios";

const MaterialsList = () => {
  const [materials, setMaterials] = useState([]);

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

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Uploaded Materials</h2>
      {materials.length === 0 ? (
        <p>No materials uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {materials.map((mat) => (
            <li key={mat.id} className="p-4 border rounded shadow">
              <h3 className="text-lg font-semibold">{mat.title}</h3>
              <p className="text-sm text-gray-600">{mat.description}</p>
              <p className="text-sm">
                <span className="font-medium">Class:</span> {mat.className}
              </p>
              <p className="text-sm">
                <span className="font-medium">Status:</span> {mat.status}
              </p>
              {mat.fileUrl && (
                <a
                  href={`http://localhost:5100${mat.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 underline"
                >
                  Download File
                </a>
              )}
              {mat.teacher && (
                <p className="text-sm mt-1">
                  <span className="font-medium">Uploaded by:</span>{" "}
                  {mat.teacher.firstname} {mat.teacher.lastname}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MaterialsList;
