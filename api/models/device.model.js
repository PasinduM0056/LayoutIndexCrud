import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    serialNumber: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ['pos', 'kiosk', 'signage'] },
    image: { type: String, required: true },
    status: { type: String, required: true, enum: ['active', 'inactive'] },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  });

  const Device = mongoose.model('Device', deviceSchema);

  export default Device;