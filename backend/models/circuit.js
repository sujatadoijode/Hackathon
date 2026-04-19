// Physics model for a simple circuit
function simulateCircuit(voltage, resistance) {
  const current = voltage / resistance;
  const power = voltage * current;

  return {
    battery: { voltage },
    conductor: { current },
    resistor: { resistance, power }
  };
}

module.exports = { simulateCircuit };
