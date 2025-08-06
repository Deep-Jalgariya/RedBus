const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  type: { type: String, enum: ['AC', 'Non-AC', 'Sleeper'], required: true },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  amenities: [String],
  availableSeats: { type: Number, required: true }
});

module.exports = mongoose.model('Bus', BusSchema);