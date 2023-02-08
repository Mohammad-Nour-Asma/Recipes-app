import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Recipes from "../components/Recipes";
import Error from "../components/Error";

function Home({ popular, vegetarian, error }) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (error.state) {
    return <Error message={error.message} icon={error.icon} />;
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Recipes
        items={vegetarian}
        pagesNum={width < 767 ? 1 : 3}
        heading="Our Vegetarian Picks"
      />
      <Recipes
        items={popular}
        pagesNum={width < 767 ? 1 : 4}
        heading="Popular Picks"
      />
    </motion.div>
  );
}

export default Home;
