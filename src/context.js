import React, { useContext, useState, useEffect } from "react";
import { BiError } from "react-icons/bi";
import { MdSignalWifiConnectedNoInternet3 } from "react-icons/md";

const AppContext = React.createContext();

function AppProvider({ children }) {
  const [popular, setPopular] = useState([]);
  const [vegetarian, setVegetarian] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [itemsInCategory, setItemsInCategory] = useState([]);

  const [serachTerm, setSearchTerm] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [error, setError] = useState({});

  const popularUrl = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_RAPID_API_KEY}&number=20`;
  const vegetarianUrl = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_RAPID_API_KEY}&number=20&tags=vegetarian`;
  const ItemsInCategoryUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_RAPID_API_KEY}&cuisine=${categoryName}`;
  const SearchItemsUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_RAPID_API_KEY}&number=10&query=${serachTerm}`;

  const gettingMainData = async (url, setData, name) => {
    const check = localStorage.getItem(name);
    if (check) {
      setData(JSON.parse(check));
      setError({
        state: false,
      });
    } else {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setError({
            state: true,
            message: "Faild To Fetch",
            icon: <BiError />,
          });
          return;
        }
        const data = await response.json();
        localStorage.setItem(name, JSON.stringify(data.recipes));
        setData(data.recipes);
        setError({
          state: false,
        });
      } catch (error) {
        setError({
          state: true,
          message: "Something Went Wrong",
          icon: <MdSignalWifiConnectedNoInternet3 />,
        });
      }
    }
  };

  const gettingCategoryData = async (url, setData, name) => {
    const check = localStorage.getItem(name);
    if (check) {
      setData(JSON.parse(check));
      setError({
        state: false,
      });
    } else {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setError({
            state: true,
            message: "Faild To Fetch",
            icon: <BiError />,
          });
          return;
        }
        const data = await response.json();
        localStorage.setItem(name, JSON.stringify(data.results));
        setData(data.results);
        setError({
          state: false,
        });
      } catch (error) {
        setError({
          state: true,
          message: "Something Went Wrong",
          icon: <MdSignalWifiConnectedNoInternet3 />,
        });
      }
    }
  };

  useEffect(() => {
    gettingMainData(popularUrl, setPopular, "popular");
    gettingMainData(vegetarianUrl, setVegetarian, "vegetarian");
  }, []);

  useEffect(() => {
    gettingCategoryData(ItemsInCategoryUrl, setItemsInCategory, categoryName);
  }, [categoryName, ItemsInCategoryUrl]);

  useEffect(() => {
    if (serachTerm.trim().length > 0) {
      const gettingSearchedItems = async () => {
        try {
          const response = await fetch(SearchItemsUrl);
          if (!response.ok) {
            setError({
              state: true,
              message: "Faild To Fetch",
              icon: <BiError />,
            });
            return;
          }
          const data = await response.json();
          setSearchItems(data.results);
          setError({
            state: false,
          });
        } catch (err) {
          setError({
            state: true,
            message: "Something Went Wrong",
            icon: <MdSignalWifiConnectedNoInternet3 />,
          });
        }
      };

      gettingSearchedItems();
    }
  }, [SearchItemsUrl, serachTerm]);

  return (
    <AppContext.Provider
      value={{
        popular: popular,
        vegetarian,
        itemsInCategory,
        setCategoryName,
        searchItems,
        setSearchTerm,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
