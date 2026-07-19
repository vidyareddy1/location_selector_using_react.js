 import React from "react";

function BlockSelector({
  blocks,
  selectedBlock,
  setSelectedBlock,
}) {
  return (
    <div>
      <label className="stateLabel">Select Block</label>

      <select
        className="selectStateDrp"
        value={selectedBlock}
        onChange={(e) => setSelectedBlock(e.target.value)}
      >
        <option value="">-- Select Block --</option>

        {blocks.map((block, index) => (
          <option key={index} value={block}>
            {block}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BlockSelector;