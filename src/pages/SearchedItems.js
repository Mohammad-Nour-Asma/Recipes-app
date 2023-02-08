import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Boxes from "../components/Boxes";
import { useGlobalContext } from "../context";
import { motion } from "framer-motion";
import Error from "../components/Error";
import { FcSearch } from "react-icons/fc";

function SearchedItems() {
  const { term } = useParams();
  const { setSearchTerm, searchItems, error } = useGlobalContext();
  useEffect(() => {
    setSearchTerm(term);
  }, [term]);

  if (searchItems.length === 0) {
    return <Error message="No Results Found" icon={<FcSearch />} />;
  }
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
      <Boxes items={searchItems} />
    </motion.div>
  );
}

export default SearchedItems;
