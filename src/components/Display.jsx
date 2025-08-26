// Display.jsx
import React from "react";

// Agora recebe e renderiza os filhos passados por props
function Display({ children }) {
  return (
    <div className="Display-main-div">
      {children}
    </div>
  );
}

export default Display;
