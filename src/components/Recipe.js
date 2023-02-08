import React from "react";
import { Link } from "react-router-dom";

function Recipe({ image, title, id }) {
  return (
    <div className="box">
      <div>
        <img alt="food" src={image} />
      </div>
      <div className="down">
        <Link className="" to={`/recipes/${id}`}>
          <h4>{title}</h4>
        </Link>
      </div>
    </div>
  );
}

export default Recipe;
