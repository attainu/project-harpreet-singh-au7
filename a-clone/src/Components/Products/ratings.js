import React, { useState } from "react";
import { render } from "react-dom";
import "./rating.css";

const Star = ({ selected = false, onClick = (f) => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick} />
);

export var ratings;

const StarRating = ({ totalStars = 5 }) => {
  var [starsSelected, selectStar] = useState(0);

  //   console.log(ratings);
  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={i < starsSelected}
          onClick={() => selectStar(i + 1)}
        />
      ))}
      <p className="para">
        {starsSelected} of {totalStars} stars
      </p>
      <div className="ratings_disp">
        {starsSelected > 0 ? (ratings = starsSelected) : 0}
      </div>
    </div>
  );
};

export default StarRating;
