import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/complaints', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setComplaints(response.data);
            } catch (error) {
                alert('Failed to fetch complaints');
            }
        };
        fetchComplaints();
    }, []);

    const handleResolve = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/complaints/${id}/resolve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Complaint Resolved!');
            setComplaints(complaints.map(c => c._id === id ? { ...c, resolved: true } : c));
        } catch (error) {
            alert('Failed to resolve complaint');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">Complaints List</h2>
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => navigate('/complaints/new')}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    File New Complaint
                </button>
            </div>
            {complaints.length === 0 ? (
                <p className="text-center text-gray-500">No complaints found.</p>
            ) : (
                <ul className="space-y-4">
                    {complaints.map((complaint) => (
                        <li key={complaint._id} className="p-4 border rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold">{complaint.title}</h3>
                                <p className={`text-sm ${complaint.resolved ? 'text-green-500' : 'text-red-500'}`}>
                                    {complaint.resolved ? 'Resolved' : 'Pending'}
                                </p>
                            </div>
                            {!complaint.resolved && (
                                <button
                                    onClick={() => handleResolve(complaint._id)}
                                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                >
                                    Resolve
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Complaints;
