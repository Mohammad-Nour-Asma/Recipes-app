import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="form-controller">
        <input
          type="text"
          placeholder="chicken"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button className="button" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
