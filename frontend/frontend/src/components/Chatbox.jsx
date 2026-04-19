import { useState } from "react";
import "../styles/chatbox.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    if (input.toLowerCase().includes("clear")) {
    setMessages([]);   // reset messages
    setInput("");      // clear input field
    return;
  }
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setMessages([...messages, { user: input }, { bot: data.reply }]);
    setInput("");
  };

  return (
    <>
    
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
  <div style={{ maxWidth: "600px", width: "100%" }}>
    <div>
      <h3 style={{ textAlign: "center" }}>AI Chatbot Guide</h3>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
      Ask me about voltage, resistance, or how experiments work — I’ll explain step by step!
      </p>
      </div>
    <div
      className="chatbox"
      style={{
        border: "2px solid #000000",
        padding: "10px",
        height: "200px",
        overflowY: "auto",
        marginBottom: "10px"
      }}
    >
      {messages.map((m, i) => (
        <p key={i}>{m.user ? `You: ${m.user}` : `Bot: ${m.bot}`}</p>
      ))}
    </div>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "70%", padding: "5px" }}
        className="chatbox-input"
        placeholder="Ask about voltage, resistance..."
      />
      <button
        onClick={sendMessage}
        style={{ marginLeft: "10px", padding: "5px 10px" }}
        className="send-button"
      >
        Send
      </button>
    </div>
  </div>
</div>
</>

  );
}

export default Chatbot;
