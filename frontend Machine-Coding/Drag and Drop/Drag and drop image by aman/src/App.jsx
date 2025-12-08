import { useState } from "react";
import "./App.css";
import DragandDrop from "./components/DragandDrop";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <DragandDrop />
    </>
  );
}

export default App;
