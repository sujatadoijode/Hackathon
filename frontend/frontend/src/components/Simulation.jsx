import { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import "../styles/style.css";
import BatteryNode from "./BatteryNode";
import ConductorNode from "./ConductorNode";
import ResistorNode from "./ResistorNode";

const nodeTypes = {
  batteryNode: BatteryNode,
  conductorNode: ConductorNode,
  resistorNode: ResistorNode
};


function Simulation() {
  const [voltage, setVoltage] = useState(5);
  const [resistance, setResistance] = useState(10);
  const [nodes, setNodes] = useState([
    { id: "battery", position: { x: 0, y: 100 }, data: { label: "Battery (5V)" } },
    { id: "conductor", position: { x: 200, y: 100 }, data: { label: "Conductor" } },
    { id: "resistor", position: { x: 400, y: 100 }, data: { label: "Resistor (10Ω)" } },
  ]);
  const [edges, setEdges] = useState([
    { id: "e1", source: "battery", target: "conductor", animated: true, style: { stroke: "blue", strokeWidth: 2 } },
    { id: "e2", source: "conductor", target: "resistor", animated: true, style: { stroke: "blue", strokeWidth: 2 } },
  ]);

  const runSimulation = async () => {
    const res = await fetch("http://localhost:5000/api/circuit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voltage, resistance })
    });
    const data = await res.json();

    // Update nodes with live values
    setNodes([

  { id: "battery", type: "batteryNode", position: { x: 0, y: 100 }, data: { label: `${data.battery.voltage}V` } },
  { id: "conductor", type: "conductorNode", position: { x: 200, y: 100 }, data: { label: `${data.conductor.current.toFixed(2)}A` } },
  { id: "resistor", type: "resistorNode", position: { x: 400, y: 100 }, data: { label: `${data.resistor.resistance}Ω, ${data.resistor.power.toFixed(2)}W` } },


]);


    // Change edge color based on current magnitude
    const current = data.conductor.current;
    const color = current < 1 ? "green" : current < 3 ? "orange" : "red";
    setEdges([
     { 
  id: "e1", 
  source: "battery", 
  target: "conductor", 
  animated: true, 
  style: { stroke: "blue", strokeWidth: 3, strokeDasharray: "0" } // solid line
},
{ 
  id: "e2", 
  source: "conductor", 
  target: "resistor", 
  animated: true, 
  style: { stroke: "blue", strokeWidth: 3, strokeDasharray: "0" } // solid line
},

    ]);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Battery–Conductor–Resistor Simulation</h2>
      <label>Voltage: {voltage} V</label><br></br>
      <input type="range" min="1" max="20" value={voltage} onChange={e => setVoltage(+e.target.value)} className="slider" />
      <br />
      <label>Resistance: {resistance} Ω</label><br></br>
      <input type="range" min="1" max="50" value={resistance} onChange={e => setResistance(+e.target.value)} className="slider" />
      <br />
      <button 
  onClick={runSimulation} 
  style={{
    backgroundColor: "purple",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  Run Simulation
</button>


      <div style={{ height: 300, border: "1px solid #ccc", marginTop: "20px" }}>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <Background />
        <Controls />
        </ReactFlow>

      </div>
    </div>
  );
}

export default Simulation;
