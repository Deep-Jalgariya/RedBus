const Booking = require('../models/Booking');
const Bus = require('../models/Bus');
const User = require('../models/User');

exports.createBooking = async (req, res) => {
  try {
    const { busId, seats, totalAmount } = req.body;
    const userId = req.user.id;

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });

    if (bus.availableSeats < seats.length) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const booking = new Booking({
      user: userId,
      bus: busId,
      seats,
      totalAmount,
      departure: bus.departure,
      arrival: bus.arrival,
      departureTime: bus.departureTime,
      arrivalTime: bus.arrivalTime
    });

    await booking.save();

    // Update bus available seats
    bus.availableSeats -= seats.length;
    await bus.save();

    // Add booking to user
    await User.findByIdAndUpdate(userId, {
      $push: { bookings: booking._id }
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('bus', 'name number type')
      .sort('-createdAt');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};