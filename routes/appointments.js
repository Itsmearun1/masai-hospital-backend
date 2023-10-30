const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment");
const verifyToken = require("../middleware/verifyToken");

router.post("/appointments", verifyToken, async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (err) {
    res.status(500).json({ error: "Failed." });
  }
});

router.get("/appointments", verifyToken, async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed." });
  }
});

router.get("/appointments/:id", verifyToken, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      res.status(404).json({ error: "Appointment not found." });
    } else {
      res.status(200).json(appointment);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed." });
  }
});

router.put("/appointments/:id", verifyToken, async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      res.status(404).json({ error: "Appointment not found." });
    } else {
      res.status(200).json(updatedAppointment);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed." });
  }
});

router.delete("/appointments/:id", verifyToken, async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAppointment) {
      res.status(404).json({ error: "Appointment not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed." });
  }
});

router.get(
  "/appointments/filter/:specialization",
  verifyToken,
  async (req, res) => {
    const { specialization } = req.params;
    try {
      const filteredAppointments = await Appointment.find({ specialization });
      res.status(200).json(filteredAppointments);
    } catch (err) {
      res.status(500).json({ error: "Failed." });
    }
  }
);

router.get("/appointments/sort/:order", verifyToken, async (req, res) => {
  const { order } = req.params;
  try {
    const sortDirection = order === "asc" ? 1 : -1;
    const sortedAppointments = await Appointment.find().sort({
      date: sortDirection,
    });
    res.status(200).json(sortedAppointments);
  } catch (err) {
    res.status(500).json({ error: "Failed." });
  }
});

router.get("/appointments/search/:name", verifyToken, async (req, res) => {
  const { name } = req.params;
  try {
    const searchResults = await Appointment.find({ name: name });
    res.status(200).json(searchResults);
  } catch (err) {
    res.status(500).json({ error: "Failed." });
  }
});

module.exports = router;
