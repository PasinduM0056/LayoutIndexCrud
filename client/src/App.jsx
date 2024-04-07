
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LocationList from './components/LocationList';
import LocationDetails from './components/LocationDetails';
import NewLocation from './components/NewLocation';
import NewDevice from './components/NewDevice';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
          <Route path="/locations/:id/devices/new" element={< NewDevice />} />
          <Route path="/locations/new" element={<NewLocation/>} />
          <Route path="/locations/:id" element={<LocationDetails />} />
          <Route path="/" element={<LocationList/>} />
        
      </Routes>
    </BrowserRouter>
  );
}
