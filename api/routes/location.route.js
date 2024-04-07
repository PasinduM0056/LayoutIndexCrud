import express from 'express';
import { getAllLocations, getLocationById, createLocation, updateLocation } from '../controllers/location.controller.js';

const router = express.Router();

router.get('/', getAllLocations);
router.get('/:id', getLocationById);
router.post('/', createLocation);
router.put('/:id', updateLocation);

export default router;
