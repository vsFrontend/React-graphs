import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ProgressOfLabour, HeartRate, Contractions, PulseRate, Protien } from './components';
import { AddUserData } from './containers';
import './App.css';
import LabourProgress from './components/LabourProgress';

const ChartsRecord = () => {
  const cleaerData = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div style={{ paddingBottom: '10px' }}>
      <div style={{ width: '80%', paddingTop: '20px', margin: 'auto', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={cleaerData}
          style={{
            fontSize: '18px',
            color: 'white',
            background: 'blue',
            padding: '7px',
            paddingLeft: '15px',
            paddingRight: '15px',
            borderRadius: '7px',
            outline: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Clear Data
        </button>
        <Link
          style={{ fontSize: '18px', color: 'white', background: 'blue', padding: '7px', paddingLeft: '15px', paddingRight: '15px', borderRadius: '7px' }}
          title="Add Record"
          to="/add-data"
        >
          Add Data
        </Link>
      </div>
      <LabourProgress />
      <PulseRate />
      <Contractions />
      <Protien />

      <HeartRate />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChartsRecord />} />
        <Route path="/add-data" element={<AddUserData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
