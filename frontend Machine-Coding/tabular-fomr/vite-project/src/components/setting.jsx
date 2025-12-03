import React from "react";

const Setting = ({ data, setdata, activeTab, setActiveTab }) => {
  // handle changes inside settings object
  function handleSettingChange(e) {
    const { name, value, type, checked } = e.target;

    setdata((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  }

  return (
    <div>
      <h3 className="main-label">Settings</h3>

      <div className="profile-container">
        <div className="profile-field">
          {/* Select Theme */}
          <label>
            Theme
            <select
              name="theme"
              value={data.settings.theme}
              onChange={handleSettingChange}
              className="input-box"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>

          {/* Notification Toggle */}
          <label className="checkbox-row">
            <input
              type="checkbox"
              name="notifications"
              checked={data.settings.notifications}
              onChange={handleSettingChange}
            />
            Enable Notifications
          </label>

          {/* Back Button */}
          <button
            className="next-button"
            onClick={() => setActiveTab(activeTab - 1)}
          >
            prev
          </button>

          {/* Submit Button */}
          <button
            className="next-button"
            onClick={() => setActiveTab(activeTab + 1)}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
