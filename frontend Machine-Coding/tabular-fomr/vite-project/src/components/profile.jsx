import React from "react";
import "./components.css";

const Profile = ({ data, setdata, activeTab, setActiveTab }) => {
  return (
    <div>
      <h3 className="main-label">User Profile</h3>

      <div className="profile-container">
        <div className="profile-field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your name"
            value={data.username}
            onChange={(e) => setdata({ ...data, username: e.target.value })}
          />
        </div>

        <div className="profile-field">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => setdata({ ...data, email: e.target.value })}
          />
        </div>

        <div className="profile-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={data.password}
            onChange={(e) => setdata({ ...data, password: e.target.value })}
          />
        </div>
        <button
          className="next-button"
          onClick={() => setActiveTab(activeTab + 1)}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Profile;
