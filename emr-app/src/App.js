import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PatientList from './components/PatientList';
import PatientDetail from './components/PatientDetail';
import CreatePatient from './components/CreatePatient';

function App()   return (
    <Router>
      <div className="App">
        <Navbar />
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<PatientList />} />
            <Route path="/patient/:id" element={<PatientDetail />} />
            <Route path="/create-patient" element={<CreatePatient />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;