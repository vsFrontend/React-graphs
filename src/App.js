import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ProgressOfLabour, HeartRate, Contractions, DescentOfHead  } from "./components";
import { AddUserData  } from "./containers";
import "./App.css";


const ChartsRecord = () => {
  return(
    <div>
      <div style={{width: '80%', paddingTop: '20px',  margin: 'auto', display: 'flex', justifyContent: 'flex-end'}}>
       
      <Link style={{fontSize: '18px', color: 'white', background: 'blue', padding: '7px', paddingLeft: '15px', paddingRight: '15px', borderRadius: '7px'}} title="Add Record" to="/add-data" >Add Data</Link>
      
      </div>
    {/* <HeartRate /> */}
    <ProgressOfLabour />
    {/* <Contractions /> */}
    {/* <DescentOfHead /> */}
    </div>
  )
}

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
