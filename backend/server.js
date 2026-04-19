const express = require("express");
const cors = require("cors");
const { simulateCircuit } = require("./models/circuit.js");

const app = express();
app.use(cors());
app.use(express.json());

// Simulation route

// Circuit simulation API
app.post("/api/circuit", (req, res) => {
  const { voltage, resistance } = req.body;
  const result = simulateCircuit(voltage, resistance);
  res.json(result);
});

// Simple chatbot API
app.post("/api/chat", (req, res) => {
  const { message } = req.body;
  let reply = "This is a simple circuit: Battery → Conductor → Resistor.";
  if (message.toLowerCase().includes("voltage")) reply = "Voltage is the push from the battery.";
  if (message.toLowerCase().includes("resistance")) reply = "Resistance opposes current flow, measured in ohms.";
  if (message.toLowerCase().includes("current")) reply = "Current is the flow of charge, measured in amperes.";
  if (message.toLowerCase().includes("practical")) reply = "The Ohm's Law experiment is designed to verify the relationship between voltage (V), current (I), and resistance (R) in an electrical circuit."
  if (message.toLowerCase().includes("experiment")) reply = "The Ohm's Law experiment is designed to verify the relationship between voltage (V), current (I), and resistance (R) in an electrical circuit."
  if (message.toLowerCase().includes("explain me the experiment")) {
    reply = "Sure! In this experiment, you adjust the voltage and resistance to observe how the current changes. It demonstrates Ohm's Law: I = V / R.";
  }
  res.json({ reply });
});

app.listen(5000, () => console.log("Backend running on port 5000"));