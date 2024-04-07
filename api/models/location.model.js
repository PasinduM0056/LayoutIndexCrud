import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String,
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }],
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
