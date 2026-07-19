import React from "react";

function StateSelector({
  states,
  selectedState,
  setSelectedState,
}) {
  return (
    <div>
      <label className="stateLabel">Select State</label>

      <select
        className="selectStateDrp"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="">-- Select State --</option>

        {states.map((state, index) => (
          <option key={index} value={state.name}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StateSelector;