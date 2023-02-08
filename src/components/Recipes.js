import React from "react";
import RecipesSlider from "./RecipesSlider";

function Recipes({ items, heading, pagesNum }) {
  return <RecipesSlider items={items} pagesNum={pagesNum} heading={heading} />;
}

export default Recipes;
