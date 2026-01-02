import React from "react";
import "./imagecarousel.css";

const images = [
  {
    id: 1,
    src: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
    title: "Lake and Island",
  },
  {
    id: 2,
    src: "https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753_1280.jpg",
    title: "Lonely Tree",
  },
  {
    id: 3,
    src: "https://cdn.pixabay.com/photo/2016/11/08/05/26/woman-1807533_1280.jpg",
    title: "Portrait",
  },
];

const Imagecarousel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const prev = (e, index) => {
    e.preventDefault();
    if (index > 0) {
      setCurrentIndex(index - 1);
    } else {
      setCurrentIndex(images.length - 1);
    }
  };
  const next = (e, index) => {
    e.preventDefault();
    if (index < images.length - 1) {
      setCurrentIndex(index + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="container">
      <div className="left-btn" onClick={(e) => prev(e, currentIndex)}>
        {"<"}
      </div>
      <img src={images[currentIndex].src} alt="nature" width="400" />
      <div className="right-btn" onClick={(e) => next(e, currentIndex)}>
        {">"}
      </div>
    </div>
  );
};

export default Imagecarousel;
