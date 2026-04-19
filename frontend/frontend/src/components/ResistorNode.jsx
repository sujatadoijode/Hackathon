import { Handle } from "reactflow";

function ResistorNode({ data }) {
  return (
    <div style={{
      width: "100px",
      height: "40px",
      border: "2px solid black",
      background: "linear-gradient(to right, #ffffff 40%, #2bff00 40%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "black",
      fontWeight: "bold",
      fontFamily: "monospace"
    }}>
        <div>{data.label}</div>
      <Handle type="source" position="right" style={{ background: "blue" }} />
      <Handle type="target" position="left" style={{ background: "blue" }} />
    </div>
  );
}

export default ResistorNode;
