const express = require('express');
const router = express.Router();
const { getBuses, getBusById, searchBuses } = require('../controllers/busController');

// @route   GET /api/buses
// @desc    Get all buses
// @access  Public
router.get('/', getBuses);

// @route   GET /api/buses/search
// @desc    Search buses by departure, arrival, and date
// @access  Public
router.get('/search', searchBuses);

// @route   GET /api/buses/:id
// @desc    Get bus by ID
// @access  Public
router.get('/:id', getBusById);

module.exports = router;