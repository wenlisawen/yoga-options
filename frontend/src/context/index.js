import React, { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useFetch from "../hooks/useFetch";

import CONFIG from "../config";
const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage("yoga-options", []);

  // Store Filtration
  const [query, setQuery] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(-1);
  const [colorIndex, setColorIndex] = useState(-1);
  const [price, setPrice] = useState(30);

  // Store Grid
  const [sortByIndex, setSortByIndex] = useState(0);

  const { response: products, error } = useFetch(`${CONFIG.api_url_product}`);

  if (error) return "error....";

  const clearFilters = () => {
    setQuery("");
    setCategoryIndex(-1);
    setColorIndex(-1);
    setPrice(309999);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        setCart,
        query,
        setQuery,
        categoryIndex,
        setCategoryIndex,
        price,
        setPrice,
        colorIndex,
        setColorIndex,
        sortByIndex,
        setSortByIndex,
        products,
        error,
        clearFilters,
      }}
    >
      {products ? children : ""}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
