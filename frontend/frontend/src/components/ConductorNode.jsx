import { Handle } from "reactflow";

function ConductorNode({ data }) {
  return (
    <div style={{
      width: "120px",
      height: "20px",
      background: "blue",
      color: "white",
      border: "2px solid black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <span>{data.label}</span>
      <Handle type="source" position="right" style={{ background: "blue" }} />
      <Handle type="target" position="left" style={{ background: "blue" }} />
    </div>
  );
}

export default ConductorNode;
