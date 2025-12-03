import React from "react";
import "./components.css";

const Hobbies = ({ data, setdata, activeTab, setActiveTab }) => {
  //need to handle data properly yet
  function handleclick(e, value) {
    const checked = e.target.checked;

    setdata((prev) => {
      if (checked) {
        return {
          ...prev,
          hobbies: [...prev.hobbies, value],
        };
      } else {
        return {
          ...prev,
          hobbies: prev.hobbies.filter((hobby) => hobby !== value),
        };
      }
    });
    console.log(data);
  }
  return (
    <div>
      <h3 className="main-label">Hobbies</h3>

      <div className="profile-container">
        <div className="profile-field">
          <label>
            <input
              className="hobbies-input"
              type="checkbox"
              name="coding"
              onChange={(e) => handleclick(e, "coding")}
            />
            Coding
          </label>

          <label>
            <input
              className="hobbies-input"
              type="checkbox"
              name="gaming"
              onChange={(e) => handleclick(e, "gameing")}
            />
            Gaming
          </label>

          <label>
            <input
              className="hobbies-input"
              type="checkbox"
              name="music"
              onChange={(e) => handleclick(e, "music")}
            />
            Music
          </label>
          <label>
            <input
              className="hobbies-input"
              type="checkbox"
              name="coding"
              onClick={(e) => handleclick(e, "coding")}
            />
            Coding
          </label>

          <label>
            <input
              className="hobbies-input"
              type="checkbox"
              name="gaming"
              onClick={(e) => handleclick(e, "gaming")}
            />
            Gaming
          </label>

          <label>
            <input
              className="hobbies-input"
              type="checkbox"
              name="music"
              onClick={(e) => handleclick(e, "music")}
            />
            Music
          </label>

          <button
            className="next-button"
            onClick={() => setActiveTab(activeTab - 1)}
          >
            prev
          </button>
          <button
            className="next-button"
            onClick={() => setActiveTab(activeTab + 1)}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hobbies;
