import { Routes, Route, useLocation } from "react-router-dom";
import RecipeDetails from "./pages/RecipeDetails";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useGlobalContext } from "./context";
import SearchForm from "./components/SearchForm";
import Categories from "./components/Categories";
import Cuisine from "./pages/Cuisine";
import SearchedItems from "./pages/SearchedItems";
import { AnimatePresence } from "framer-motion";
import Footer from "./components/Footer";
import { FcSearch } from "react-icons/fc";
import Error from "./components/Error";

//YOU HAVE To Write On THe Notebook Tommorrow What We Install Today
// npm install framer-motion react-icons , npm react-splide

function App() {
  const { popular, vegetarian, error } = useGlobalContext();
  const location = useLocation();
  return (
    <>
      <Header />
      <SearchForm />
      <Categories />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            exact
            path="/"
            element={
              <Home popular={popular} error={error} vegetarian={vegetarian} />
            }
          />
          <Route exact path="/cuisine/:name" element={<Cuisine />} />

          <Route exact path="/recipes/:id" element={<RecipeDetails />} />
          <Route exact path="/search/:term" element={<SearchedItems />} />
          <Route
            exact
            path="/*"
            element={<Error message="No Results Found" icon={<FcSearch />} />}
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
