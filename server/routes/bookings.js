const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings } = require('../controllers/bookingController');

// Note: These routes would typically require authentication middleware
// const auth = require('../middleware/auth');

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private (requires authentication)
router.post('/', createBooking);

// @route   GET /api/bookings/user
// @desc    Get user's bookings
// @access  Private (requires authentication)
router.get('/user', getUserBookings);

module.exports = router;