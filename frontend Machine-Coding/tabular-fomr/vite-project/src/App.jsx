import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Tabularfrom from "./components/Tabular-from";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Tabularfrom />
    </>
  );
}

export default App;
