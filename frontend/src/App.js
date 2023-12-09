import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import RoomsPage from './components/RoomsPage'; // The new component for showing rooms
import RoomPage from './components/RoomPage';

const App = () => {
  return (

      <Router>
      <Routes>
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/" element={<FirstPage />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </Router>

     
  );
};

export default App;
