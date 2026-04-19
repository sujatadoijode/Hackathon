import { useState } from "react";

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
    <div style={{ maxWidth: "600px" }}>
      <h3>AI Chatbot Guide</h3>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "200px", overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((m, i) => (
          <p key={i}>{m.user ? `You: ${m.user}` : `Bot: ${m.bot}`}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "70%", padding: "5px" }}
        placeholder="Ask about voltage, resistance..."
      />
      <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "5px 10px" }}>
        Send
      </button>
    </div>
  );
}

export default Chatbot;
