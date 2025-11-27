import { useState, useRef, useEffect } from "react";
import "./App.css";
const inputlength = 5;

function App() {
  const refArr = useRef([]); // To hold references to all input boxes
  const [otpinput, setOtpinput] = useState([
    ...new Array(inputlength).fill(""), // Creating an array of length 'inputlength' filled with empty strings
  ]);
  useEffect(() => {
    refArr.current[0]?.focus(); // Focus on the first input box when the component mounts
  }, []);

  const handleOnChange = (value, index) => {
    if (isNaN(value) || value === "") return; // To ensure only numeric input is accepted

    const newarr = [...otpinput]; //making new arr from otpinput bcause we cannot directly modify state
    newarr[index] = value.slice(-1); // To ensure only one character is stored per input box
    setOtpinput(newarr);
    refArr.current[index + 1]?.focus(); // Move focus to the next input box
  };
  const handlekeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newarr = [...otpinput];
      // If the box has a value, clear it
      if (otpinput[index] !== "") {
        newarr[index] = "";
        setOtpinput(newarr);
        return; // stop here so it doesn't jump backward immediately
      }
      // If empty, move focus to previous box
      if (index > 0) {
        refArr.current[index - 1].focus();
      }
    }
  };

  return (
    <>
      <div className="app">
        <h4>Otp system </h4>
        <div className="otp-input-row">
          {otpinput.map((item, index) => {
            return (
              <input
                className="otp-input-box"
                key={index}
                value={otpinput[index]}
                ref={(item) => (refArr.current[index] = item)} // Assigning ref to each input box
                onChange={(e) => handleOnChange(e.target.value, index)}
                onKeyDown={(e) => handlekeyDown(e, index)}
                type="text"
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
