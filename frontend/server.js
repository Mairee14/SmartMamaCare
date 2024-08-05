const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

// dotenv config
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// Use routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/appointments", appointmentRoutes);

// routes
app.get("/", (req, res) => {
    res.status(200).send({
        message: "server running",
    });
});

// port
const port = process.env.PORT || 8080;

// listen port
app.listen(port, () => {
  console.log(`Server Running on port ${port}`.bgCyan.white);
});