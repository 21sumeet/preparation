import React, { useState } from "react";
import "../App.css";

const Accordion = () => {
  const accordionData = [
    { question: "What is React?", answer: "React is a UI library." },
    { question: "What is a component?", answer: "Reusable UI block." },
    { question: "What is state?", answer: "State stores changing data." },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  function handleClick(index) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="accordion-container">
      {accordionData.map((data, index) => (
        <div className="accordion-item" key={index}>
          <div
            className="accordion-question"
            onClick={() => handleClick(index)}
          >
            {data.question}
          </div>

          {/* {openIndex === index && (
            <div className="accordion-answer">{data.answer}</div>
          )} */}
          {openIndex === index && (
            <div className={`accordion-answer open`}>{data.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
