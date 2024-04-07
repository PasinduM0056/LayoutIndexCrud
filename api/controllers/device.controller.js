import Device from '../models/device.model.js';
import Location from '../models/location.model.js';
import { validationResult } from 'express-validator';

// ADD a new device to a location
export const addDeviceToLocation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { serialNumber, type, image, status } = req.body;
  const locationId = req.params.id;

  try {
    // Check if the location exists
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    // Create a new device
    const newDevice = new Device({
      serialNumber,
      type,
      image,
      status,
      location: locationId,
    });

    // Save the new device
    await newDevice.save();

    // Add the device to the location's devices array
    location.devices.push(newDevice._id);

    // Save the updated location
    await location.save();

    // Respond with the newly created device
    res.status(201).json(newDevice);
  } catch (err) {
    // Handle errors
    res.status(400).json({ message: err.message });
  }
};

// DELETE a device from a location
export const deleteDeviceFromLocation = async (req, res) => {
  const locationId = req.params.id;
  const deviceId = req.params.deviceId;

  try {
    // Find the location
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    // Find the device
    const device = await Device.findById(deviceId);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    // Check if the device belongs to the location
    if (device.location.toString() !== locationId) {
      return res.status(400).json({ message: 'Device does not belong to this location' });
    }

    // Remove the device from the location's devices array
    location.devices = location.devices.filter(devId => devId.toString() !== deviceId);

    // Save the updated location
    await location.save();

    // Delete the device
    await Device.findByIdAndRemove(deviceId);

    // Respond with success message
    res.json({ message: 'Device removed from location' });
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};
