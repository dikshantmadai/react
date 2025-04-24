import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PatientList from './components/PatientList';
import PatientDetail from './components/PatientDetail';
import CreatePatient from './components/CreatePatient';
import Register from './components/signup';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patient/:id" element={<PatientDetail />} />
          <Route path="/create-patient" element={<CreatePatient />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
