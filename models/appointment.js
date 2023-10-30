const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  slots: { type: Number, required: true },
  fee: { type: Number, required: true },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
