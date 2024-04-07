import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const NewDevice = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/locations/${id}/devices`, {
        serialNumber,
        type,
        image,
        status,
      });
      navigate(`/locations/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Device</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">Serial Number:</label>
          <input
            type="text"
            id="serialNumber"
            value={serialNumber}
            onChange={e => setSerialNumber(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type:</label>
          <select
            id="type"
            value={type}
            onChange={e => setType(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            required
          >
            <option value="">Select Type</option>
            <option value="pos">POS</option>
            <option value="kiosk">Kiosk</option>
            <option value="signage">Signage</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={e => setImage(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
          <select
            id="status"
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" className=" bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">Add Device</button>
      </form>
    </div>
  );
};

export default NewDevice;
