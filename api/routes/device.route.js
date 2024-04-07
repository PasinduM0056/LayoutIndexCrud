import express from 'express';
import { addDeviceToLocation, deleteDeviceFromLocation } from '../controllers/device.controller.js';

const router = express.Router();

router.post('/:id/devices', addDeviceToLocation);
router.delete('/:id/devices/:deviceId', deleteDeviceFromLocation);

export default router;
