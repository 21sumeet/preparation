import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  const [search, setsearch] = useState("");
  const items = [
    "JavaScript",
    "Java",
    "Python",
    "React",
    "Ruby",
    "TypeScript",
    "C++",
  ];
  const filteritems = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="app">
        <h1>Search bar</h1>
        <input
          type="text"
          placeholder="serach here"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />

        <ul>
          {filteritems.length > 0 ? (
            filteritems.map((item, key) => <li key={key}>{item}</li>)
          ) : (
            <li>No results found</li>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
