import Simulation from "./components/Simulation";
import Chatbot from "./components/Chatbox";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Virtual Lab Demo</h1>
      <Simulation />
      <Chatbot />
    </div>
  );
}

export default App;
