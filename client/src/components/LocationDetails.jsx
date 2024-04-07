import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const LocationDetails = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    axios.get(`/api/locations/${id}`)
      .then(res => setLocation(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const removeDevice = async (deviceId) => {
    try {
      await axios.delete(`/api/locations/${id}/devices/${deviceId}`);
      setLocation(prevLocation => ({
        ...prevLocation,
        devices: prevLocation.devices.filter(device => device._id !== deviceId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (!location) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">{location.name}</h2>
      <p className="mb-2"><span className="font-semibold">Address:</span> {location.address}</p>
      <p className="mb-2"><span className="font-semibold">Phone:</span> {location.phone}</p>
      <h3 className="text-xl font-semibold mb-2">Devices</h3>
      <ul>
        {location.devices && location.devices.map(device => (
          <li key={device._id} className="mb-4">
            <div className="relative rounded-lg overflow-hidden bg-gray-200">
              <img src={device.image} alt={device.serialNumber} className="h-64 w-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-between bg-black bg-opacity-50 p-4">
                <div>
                  <p className="text-sm text-gray-300">{device.type}</p>
                  <p className="text-sm text-red-500">{device.status}</p>
                  <p className="text-lg font-bold text-white mt-2">{device.serialNumber}</p>
                </div>
                <button onClick={() => removeDevice(device._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Remove Device</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Link to={`/locations/${location._id}/devices/new`} className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">Add New Device</Link>

    </div>
  );
};

export default LocationDetails;
