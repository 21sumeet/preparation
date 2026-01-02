import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Imagecarousel from "./components/Image-carousel";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Imagecarousel />
    </>
  );
}

export default App;
