import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams
import { searchProducts } from "../modules/algolia/search"; // Adjust path as needed
import ProductCardGroup from "../components/ProductCardGroup";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get the search query from URL params
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query'); // Extract the "query" param from the URL

  useEffect(() => {
    const products = searchProducts(query)

    console.log(products)
  }, [query]);

  return (
    <div>
      <h1>Results for: "{query || 'No query'}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductCardGroup products={products} />
      )}
    </div>
  );
};

export default SearchPage;
