import React from "react";

const Summary = ({ data }) => {
  return (
    <div>
      <h2>Final Submitted Data</h2>

      <pre
        style={{
          background: "#f0f0f0",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default Summary;
