const express = require("express");
const cors = require("cors");
const { simulateCircuit } = require("./models/circuit.js");
const Groq = require("groq-sdk");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Simulation route

// Circuit simulation API
app.post("/api/circuit", (req, res) => {
  const { voltage, resistance } = req.body;
  const result = simulateCircuit(voltage, resistance);
  res.json(result);
});

// AI-powered chatbot API
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable AI assistant specializing in electrical circuits and physics. Help users understand concepts like voltage, current, resistance, and Ohm's Law. Explain things in simple, clear terms with practical examples. Be helpful and encouraging for learning purposes."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 150,
      temperature: 0.7
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Groq API error:", error);
    res.status(500).json({
      reply: "Sorry, I'm having trouble connecting to my knowledge base right now. Please try again later."
    });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));