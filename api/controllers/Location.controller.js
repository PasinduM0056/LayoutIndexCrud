import Location from '../models/location.model.js';
import { validationResult } from 'express-validator';

// GET all locations
export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find().populate('devices');
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single location
export const getLocationById = async (req, res) => {
  const { id } = req.params;

  try {
    const location = await Location.findById(id).populate('devices');
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE a new location
export const createLocation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, address, phone } = req.body;

  try {
    const newLocation = new Location({
      name,
      address,
      phone,
      devices: [],
    });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE a location
export const updateLocation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, address, phone } = req.body;

  try {
    res.location.name = name;
    res.location.address = address;
    res.location.phone = phone;
    const updatedLocation = await res.location.save();
    res.json(updatedLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
