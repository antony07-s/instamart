import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

import Productdetails from "./pages/Productdetails";
import { Toaster, toast } from "react-hot-toast";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

const App = () => {
  const [product, setproduct] = useState([]);
  const [loading, setloading] = useState(true);
  const [search, setsearch] = useState("");

  const [category, setcategory] = useState("all");
  const [error, seterror] = useState("");
  const [sortOption, setSortOption] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");

        const data = await response.json();
        setproduct(data);
      } catch (error) {
        console.log(error);
        seterror("Failed to fetch products");
      } finally {
        setloading(false);
      }
    };
    fetchproduct();
  }, []);

  const filteredProducts = product.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "all" || item.category === category;

    return matchesSearch && matchesCategory;
  });
  const sortedProducts = [...filteredProducts];
  if (sortOption === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOption === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (sortOption === "aToZ") {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  }
  const lastProductIndex = currentPage * productsPerPage;

  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = sortedProducts.slice(
    firstProductIndex,
    lastProductIndex,
  );
  return (
    <div>
      <Toaster />
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route
  path="/"
  element={
    isLoggedIn ? (
      <Home
        currentProducts={currentProducts}
        search={search}
        setsearch={setsearch}
        category={category}
        setcategory={setcategory}
        loading={loading}
        error={error}
        sortOption={sortOption}
        setSortOption={setSortOption}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    ) : (
      <Login setIsLoggedIn={setIsLoggedIn} />
    )
  }
/>

        <Route
          path="/cart"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route
          path="/product/:id"
          element={<Productdetails product={product} />}
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </div>
  );
};

export default App;
