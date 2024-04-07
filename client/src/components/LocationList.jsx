import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LocationList = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get('/api/locations')
      .then(res => setLocations(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold mb-4">LOCATIONS</h2>
      <Link to="/locations/new" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4">Add New Location</Link>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map(location => (
          <li key={location._id} className="relative rounded-lg overflow-hidden bg-gray-200">
            <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a" alt="University of Southern California" className="h-64 w-full object-cover" />
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 py-6">
              <h3 className="text-2xl font-bold mb-2">
                <Link to={`/locations/${location._id}`}>{location.name}</Link>
              </h3>
              <p className="text-sm">{location.address}</p>
              <p className="text-sm">{location.phone}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
