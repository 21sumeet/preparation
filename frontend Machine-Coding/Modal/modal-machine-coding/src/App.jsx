import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  const [isOpen, setOpen] = useState(false);
  function handlemodalview() {
    isOpen ? setOpen(false) : setOpen(true);
  }

  return (
    <>
      <div className="app">
        <h1>Modal Machine Coding</h1>

        <button onClick={handlemodalview}>Open Modal</button>
        {isOpen && (
          <div className="backdrop" onClick={handlemodalview}>
            <div className="modal">
              <h2>This is model preview</h2>
              <button onClick={handlemodalview}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
