import React from "react";
import { Link } from "react-router-dom";

function Boxes({ items }) {
  return (
    <div className="container boxes">
      {items.map((item, index) => {
        return (
          <div className="box" key={index}>
            <div>
              <img alt="food" src={item.image} />
            </div>
            <div className="down">
              <Link className="" to={`/recipes/${item.id}`}>
                <h4>{item.title}</h4>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Boxes;
