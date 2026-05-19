const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const auth_routes = require("./routes/auth_routes");
const patient_routes = require("./routes/patient_routes");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", auth_routes);
app.use("/api/patients", patient_routes);

app.get("/", (req, res) => {
  res.json({
    message: "AI Clinic Management API Running",
  });
});

module.exports = app;
