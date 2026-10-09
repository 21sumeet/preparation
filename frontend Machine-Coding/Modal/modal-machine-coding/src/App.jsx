import { useState, useEffect } from "react";
import Modal from "./Model";
import "./App.css";

function App() {
  const [isOpen, setOpen] = useState(false);
  function handlemodalview() {
    isOpen ? setOpen(false) : setOpen(true);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="app">
      <h1>Modal Machine Coding</h1>

      <button onClick={handlemodalview}>Open Modal</button>

      <Modal isOpen={isOpen} onClose={() => setOpen(false)} />
    </div>
  );
}

export default App;
