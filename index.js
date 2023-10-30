const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect(
  "mongodb+srv://Arun:123@cluster0.ynhdskj.mongodb.net/hospital?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/appointments");

app.use("/", authRoutes);
app.use("/", appointmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
