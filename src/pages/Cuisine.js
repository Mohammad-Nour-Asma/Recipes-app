import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { categories } from "../components/categoies";
import { useGlobalContext } from "../context";
import Boxes from "../components/Boxes";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import Error from "../components/Error";

function Cuisine() {
  const { setCategoryName, itemsInCategory, error } = useGlobalContext();
  const { name } = useParams();

  const isFromTheList = categories.includes(name);

  useEffect(() => {
    setCategoryName(name);
  }, [name, setCategoryName]);

  if (error.state) {
    return <Error message={error.message} icon={error.icon} />;
  }

  if (!isFromTheList) {
    return <Error message="No Results Found" icon={<FaSearch />} />;
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Boxes items={itemsInCategory} />
    </motion.div>
  );
}

export default Cuisine;
