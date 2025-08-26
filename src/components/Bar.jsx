// Bar.jsx
import React, { useEffect, useState } from "react";
import { useDisplay } from "../services/DisplayProvider";

function Bar() {
  const [apps, setApps] = useState({});
  const { handleAppToggle } = useDisplay();

  useEffect(() => {
    fetch('/apps.json')
      .then(res => res.json())
      .then(data => setApps(data))
      .catch(err => console.error('Erro ao carregar apps:', err));
  }, []);

  return (
    <div className="Bar-div">
      {Object.entries(apps).map(([key, app]) => (
        <button
          key={key}
          className="App-button"
          onClick={() => handleAppToggle(key)}
        >
          <img src={app.icon} alt={app.name} />
        </button>
      ))}
    </div>
  );
}

export default Bar;
