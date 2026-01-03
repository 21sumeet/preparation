import React, { useState } from "react";
import "./starrating.css";

const StarRating = ({ STAR_COUNT = 5 }) => {
  const [active, setActive] = useState();
  const [hovervalue, sethovervalue] = useState();

  return (
    <div className="container">
      {new Array(STAR_COUNT).fill(0).map((_, index) => (
        <span
          key={index}
          className={index <= active || index <= hovervalue ? "active" : ""}
          onClick={() => {
            console.log("Clicked star:", index + 1);
            setActive(index);
          }}
          onMouseEnter={() => sethovervalue(index + 1)}
          onMouseLeave={() => sethovervalue(0)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
