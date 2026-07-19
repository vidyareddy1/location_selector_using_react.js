import React from "react";

function CitySelector({
  cities,
  selectedCity,
  setSelectedCity,
}) {
  return (
    <div>
      <label className="stateLabel">Select City</label>

      <select
        className="selectStateDrp"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="">-- Select City --</option>

        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CitySelector;