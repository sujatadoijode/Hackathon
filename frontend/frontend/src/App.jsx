import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Simulation from "./components/Simulation";
import Chatbot from "./components/Chatbox";
import About from "./components/About";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial", backgroundColor: "black", minHeight: "100vh" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
