import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import RoomsPage from './components/RoomsPage'; // The new component for showing rooms

const App = () => {
  return (

      <Router>
      <Routes>
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/" element={<FirstPage />} />
      </Routes>
    </Router>

    
  );
};

export default App;
