import React from "react";

function PincodeSelector({ pincodes }) {
  return (
    <div>
      <h3 className="pincode-heading">Pincodes</h3>

      <ul className="pincodes">
        {pincodes.map((pincode, index) => (
          <li key={index}>{pincode}</li>
        ))}
      </ul>
    </div>
  );
}

export default PincodeSelector;