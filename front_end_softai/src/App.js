import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeModule from './Module/Employe';
import ClientModule from './Module/Client';
function App() {

 
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='employe' element={<EmployeModule/>} />
          <Route path="client" element={<ClientModule />} />
         
        </Routes>
      </Router>
    </>
  );
}

export default App;
