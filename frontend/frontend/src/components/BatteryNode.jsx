import { Handle } from "reactflow";

function BatteryNode({ data }) {
  return (
    <div 
    style={{
      border: "2px solid black",
      borderRadius: "5px",
      width: "80px",
      height: "120px",
      background: "linear-gradient(to bottom, #ff0000 50%, #969696 50%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontWeight: "bold"
    }}>
     
      <div>{data.label}</div>
      <Handle type="source" position="right" style={{ background: "blue" }} />
    </div>
  );
}

export default BatteryNode;
