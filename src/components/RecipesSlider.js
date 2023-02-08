import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Recipe from "../components/Recipe";

function RecipesSlider({ items, heading, pagesNum }) {
  return (
    <>
      <div className="wrapper container">
        <h3 className="heading">{heading}</h3>
        <Splide
          options={{
            drag: "free",
            arrows: false,
            gap: "3rem",
            perPage: pagesNum,
            pagination: false,
          }}
        >
          {items.map((item, index) => (
            <SplideSlide key={index}>
              <Recipe id={item.id} image={item.image} title={item.title} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
}

export default RecipesSlider;
