import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Complaints from './pages/Complaints';
import NewComplaint from './pages/NewComplaint'; // ✅ Corrected import
import ComplaintsList from './pages/ComplaintsList'; // ✅ Corrected import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/complaints/new" element={<NewComplaint />} /> {/* ✅ Corrected */}
        <Route path="/complaints/list" element={<ComplaintsList />} /> {/* ✅ Corrected */}
      </Routes>
    </Router>
  );
}

export default App;
