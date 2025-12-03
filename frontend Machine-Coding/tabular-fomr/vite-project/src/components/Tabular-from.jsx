import React, { useState } from "react";
import Profile from "./profile";
import Setting from "./setting";
import Hobbies from "./hobbies";
import "../App.css";
import Summary from "./summary";

const Tabularfrom = () => {
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
    hobbies: [],
    settings: { theme: "light", notifications: true },
  });
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Profile", component: Profile },
    { name: "Hobbies", component: Hobbies },
    { name: "Setting", component: Setting },
    { name: "Summary", component: Summary },
  ];

  const ActiveComponent = tabs[activeTab].component;

  return (
    <>
      <div className="container">
        <div>Tabular Form</div>
        <div className="tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`${activeTab === index ? "active" : ""} tab-button`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="tab-content">
          <ActiveComponent
            data={data}
            setdata={setdata}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </>
  );
};

export default Tabularfrom;
