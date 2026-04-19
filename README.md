# Virtual Lab - Electrical Circuit Simulator

An interactive web application for learning about electrical circuits and Ohm's Law through simulation and AI-powered assistance.

## Features

- Interactive circuit simulation
- Real-time voltage, current, and resistance calculations
- AI-powered chatbot for learning assistance
- Visual circuit components (battery, conductor, resistor)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Get a Groq API key:
   - Visit [Groq Console](https://console.groq.com/)
   - Create an account or sign in
   - Navigate to API Keys section
   - Create a new API key (free tier available)

4. Create a `.env` file in the backend directory and add your API key:
   ```
   GROQ_API_KEY=your_actual_groq_api_key_here
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- Open your browser and navigate to the frontend URL (usually http://localhost:5173)
- Use the simulation interface to adjust voltage and resistance values
- Ask the AI chatbot questions about electrical circuits, Ohm's Law, and physics concepts
- The chatbot will provide helpful explanations and guidance

## API Endpoints

- `POST /api/circuit` - Run circuit simulations
- `POST /api/chat` - Interact with the AI chatbot