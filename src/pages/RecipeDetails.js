import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Error from "../components/Error";
import { BiError } from "react-icons/bi";
import { MdSignalWifiConnectedNoInternet3 } from "react-icons/md";

function RecipeDetails() {
  const [isInstruction, setIsInstruction] = useState(true);
  const [item, setItem] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_RAPID_API_KEY}`;

  const getInformation = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        setError({ state: true, message: "Faild To Fetch", icon: <BiError /> });
        setLoading(false);
        return;
      }
      const data = await response.json();
      setItem(data);
    } catch (err) {
      setLoading(false);
      setError({
        state: true,
        message: "Something Went Wrong",
        icon: <MdSignalWifiConnectedNoInternet3 />,
      });
    }
    setLoading(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getInformation(url);
  }, [id, url]);

  if (error.state) {
    return <Error message={error.message} icon={error.icon} />;
  }

  if (loading) {
    return (
      <section className="container section">
        <div className="lds-hourglass"></div>
      </section>
    );
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <section className="container section">
        <div className="details">
          <div className="img-container">
            <h3>REcipei title</h3>
            <img src={item.image} alt="recipee" />
          </div>
          <div className="info">
            <div className="buttons details-buttons">
              <button
                className={`button ${isInstruction ? "active-button" : ""}`}
                onClick={() => {
                  setIsInstruction(true);
                }}
              >
                Instructions
              </button>
              <button
                className={`button ${isInstruction ? "" : "active-button"}`}
                onClick={() => {
                  setIsInstruction(false);
                }}
              >
                Ingredients
              </button>
            </div>
            <div className="info-text">
              {isInstruction && (
                <>
                  <p
                    style={{ marginTop: "2rem" }}
                    dangerouslySetInnerHTML={{ __html: item.summary }}
                  ></p>
                  <p
                    dangerouslySetInnerHTML={{ __html: item.instructions }}
                  ></p>
                </>
              )}

              {!isInstruction && (
                <ul className="ingredients">
                  {item.extendedIngredients.map((ingredient, index) => (
                    <li key={index}>- {ingredient.original}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <button onClick={() => navigate(-1)} className="button home" to={".."}>
          Go Back
        </button>
      </section>
    </motion.div>
  );
}

export default RecipeDetails;
