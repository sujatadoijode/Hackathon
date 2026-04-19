import "../styles/home.css";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "black",
        color: "#ffffff",
        textAlign: "center",
        padding: "40px"
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
        Welcome to Virtual Lab
      </h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "600px", marginBottom: "30px" }}>
        An interactive platform to simulate experiments, explore circuit behavior,
        and learn scientific concepts in real time. Built with MERN stack for rapid
        prototyping and hackathon demos.
      </p>
      <button
        style={{
          backgroundColor: "#00d0ff",
          color: "#000000",
          border: "none",
          padding: "12px 24px",
          fontSize: "1rem",
          fontWeight: "bold",
          borderRadius: "6px",
          cursor: "pointer",
          boxShadow: "2px 2px 6px green",
          transition: "0.3s"
        }}
        onClick={() => (window.location.href = "/simulation")}
      >
        🚀 Get Started
      </button>
    </div>
  );
}




export default Home;
