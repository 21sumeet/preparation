import React, { useState } from "react";

const PhoneOtpForm = () => {
  const [phone, setphone] = useState();
  const [showotpinput, setshowotpinput] = useState(false);

  const handlePhoneNumber = (e) => {
    setphone(e.target.value);
    console.log("Phone number submitted:", phone);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    // Validate phone number
    const regex = /[^0-9]/g;
    if (phone.length < 10 || regex.test(phone)) {
      alert("Invalid Phone Number");
      return;
    }
    setshowotpinput(true);
  };

  return (
    <div>
      {!showotpinput ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={handlePhoneNumber}
            placeholder="Enter phone number"
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <div>
          <p>Enter OTP sent to {phone}</p>
          {/* <OtpInput length={4} onOtpSubmit={onOtpSubmit} /> */}
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;
