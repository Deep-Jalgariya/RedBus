const Bus = require('../models/Bus');

exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchBuses = async (req, res) => {
  try {
    const { departure, arrival, date } = req.query;
    let query = {};
    
    if (departure) query.departure = new RegExp(departure, 'i');
    if (arrival) query.arrival = new RegExp(arrival, 'i');
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.departureTime = { $gte: startDate, $lt: endDate };
    }

    const buses = await Bus.find(query).sort({ departureTime: 1 });
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};