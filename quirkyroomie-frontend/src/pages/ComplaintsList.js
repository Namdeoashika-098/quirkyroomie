import React, { useEffect, useState } from 'react';
import API from '../api';

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state

  useEffect(() => {
    // API se complaints fetch karna
    API.get('/complaints')
      .then((res) => {
        setComplaints(res.data);  // Data set karna
        setLoading(false);        // Loading false karna
      })
      .catch((err) => {
        console.error("Error fetching complaints:", err);
        setError('Failed to fetch complaints. Please try again later.');
        setLoading(false); // Loading false even if error
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Complaints List</h2>

      {/* Loading State */}
      {loading && <p className="text-center text-blue-500">Loading complaints...</p>}

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Complaints List */}
      {!loading && !error && (
        complaints.length === 0 ? (
          <p className="text-center text-gray-500">No complaints found.</p>
        ) : (
          <ul className="space-y-4">
            {complaints.map((comp) => (
              <li key={comp._id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold">{comp.title}</h3>
                <p className="text-gray-600 mt-2">{comp.description}</p>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default ComplaintsList;
