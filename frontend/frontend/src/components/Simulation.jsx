import { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import "../styles/style.css";
import "../styles/simulation.css";
import BatteryNode from "./BatteryNode";
import ConductorNode from "./ConductorNode";
import ResistorNode from "./ResistorNode";

const nodeTypes = {
  batteryNode: BatteryNode,
  conductorNode: ConductorNode,
  resistorNode: ResistorNode
};

const simulationOptions = [
  {
    id: "ohmsLaw",
    title: "Ohm's Law Simulation",
    description: "Demonstrate how voltage, current, and resistance relate with I = V / R."
  },
  {
    id: "batteryCircuit",
    title: "Battery Circuit Simulation",
    description: "Visualize voltage flow through a battery, conductor, and resistor."
  }
];

const defaultGraphs = {
  ohmsLaw: {
    nodes: [
      { id: "battery", type: "batteryNode", position: { x: 0, y: 100 }, data: { label: "Battery" } },
      { id: "resistor", type: "resistorNode", position: { x: 300, y: 100 }, data: { label: "Resistor" } }
    ],
    edges: [
      { id: "e1", source: "battery", target: "resistor", animated: true, style: { stroke: "blue", strokeWidth: 2 } }
    ]
  },
  batteryCircuit: {
    nodes: [
      { id: "battery", type: "batteryNode", position: { x: 0, y: 100 }, data: { label: "Battery" } },
      { id: "conductor", type: "conductorNode", position: { x: 200, y: 100 }, data: { label: "Conductor" } },
      { id: "resistor", type: "resistorNode", position: { x: 400, y: 100 }, data: { label: "Resistor" } }
    ],
    edges: [
      { id: "e1", source: "battery", target: "conductor", animated: true, style: { stroke: "blue", strokeWidth: 2 } },
      { id: "e2", source: "conductor", target: "resistor", animated: true, style: { stroke: "blue", strokeWidth: 2 } }
    ]
  }
};

function Simulation() {
  const [selectedSim, setSelectedSim] = useState(null);
  const [voltage, setVoltage] = useState(5);
  const [resistance, setResistance] = useState(10);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleSelectSimulation = (id) => {
    setSelectedSim(id);
    setNodes(defaultGraphs[id].nodes);
    setEdges(defaultGraphs[id].edges);
  };

  const runSimulation = async () => {
    if (!selectedSim) return;

    const res = await fetch("http://localhost:5000/api/circuit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voltage, resistance })
    });
    const data = await res.json();

    if (selectedSim === "ohmsLaw") {
      setNodes([
        { id: "battery", type: "batteryNode", position: { x: 0, y: 100 }, data: { label: `${data.battery.voltage}V` } },
        { id: "resistor", type: "resistorNode", position: { x: 300, y: 100 }, data: { label: `${data.resistor.resistance}Ω, ${data.resistor.power.toFixed(2)}W` } }
      ]);
      setEdges([
        { id: "e1", source: "battery", target: "resistor", animated: true, style: { stroke: "blue", strokeWidth: 3 } }
      ]);
    } else {
      setNodes([
        { id: "battery", type: "batteryNode", position: { x: 0, y: 100 }, data: { label: `${data.battery.voltage}V` } },
        { id: "conductor", type: "conductorNode", position: { x: 200, y: 100 }, data: { label: `${data.conductor.current.toFixed(2)}A` } },
        { id: "resistor", type: "resistorNode", position: { x: 400, y: 100 }, data: { label: `${data.resistor.resistance}Ω, ${data.resistor.power.toFixed(2)}W` } }
      ]);
      setEdges([
        { id: "e1", source: "battery", target: "conductor", animated: true, style: { stroke: "blue", strokeWidth: 3 } },
        { id: "e2", source: "conductor", target: "resistor", animated: true, style: { stroke: "blue", strokeWidth: 3 } }
      ]);
    }
  };

  const current = resistance > 0 ? voltage / resistance : 0;

  return (
    <div className="simulation-page">
      <h2>Choose a Simulation</h2>
      <div className="simulation-options">
        {simulationOptions.map((option) => (
          <button
            key={option.id}
            className={`simulation-option ${selectedSim === option.id ? "selected" : ""}`}
            onClick={() => handleSelectSimulation(option.id)}
          >
            <h3>{option.title}</h3>
            <p>{option.description}</p>
          </button>
        ))}
      </div>

      {!selectedSim ? (
        <div className="simulation-placeholder">
          Select a simulation option to view the interactive demo.
        </div>
      ) : (
        <div className="simulation-panel">
          <h2>{selectedSim === "ohmsLaw" ? "Ohm's Law Simulation" : "Battery Circuit Simulation"}</h2>
          <p className="simulation-description">
            {selectedSim === "ohmsLaw"
              ? "Adjust voltage and resistance to see current change according to Ohm's law."
              : "Adjust the same parameters to visualize the battery–conductor–resistor circuit."}
          </p>

          <label className="input-label">Voltage: {voltage} V</label>
          <input
            type="range"
            min="1"
            max="20"
            value={voltage}
            onChange={(e) => setVoltage(+e.target.value)}
            className="slider"
          />

          <label className="input-label">Resistance: {resistance} Ω</label>
          <input
            type="range"
            min="1"
            max="50"
            value={resistance}
            onChange={(e) => setResistance(+e.target.value)}
            className="slider"
          />

          <div className="simulation-stats">
            <span>Current: {current.toFixed(2)} A</span>
            <span>Power: {(voltage * current).toFixed(2)} W</span>
          </div>

          <button
            onClick={runSimulation}
            className="simulation-button"
          >
            Run Simulation
          </button>

          <div className="simulation-visualization">
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>
      )}
    </div>
  );
}

export default Simulation;
