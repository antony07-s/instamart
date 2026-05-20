import React from "react";
import Productcard from "../components/Productcard";
import { CartContext } from "../CartContext";
const Home = ({
  currentProducts,
  search,
  setsearch,
  handlecartitem,
  category,
  setcategory,
  loading,
  error,
  sortOption,
setSortOption,
currentPage,
setCurrentPage,
}) => {
    if (error) {
  return (
    <h1 className="text-red-500 text-3xl text-center mt-10">
      {error}
    </h1>
  );
}
  return (
    <>
      <div className="p-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          className="border p-3 rounded-lg w-full"
        />
        <select
          value={category}
          onChange={(e) => setcategory(e.target.value)}
          className="border p-3 rounded-lg mt-4"
        >
          <option value="all">All</option>

          <option value="electronics">Electronics</option>

          <option value="jewelery">Jewelery</option>

          <option value="men's clothing">Men's Clothing</option>

          <option value="women's clothing">Women's Clothing</option>
        </select>

        <select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    className="border p-3 rounded-lg mt-4 ml-4"
  >
    <option value="">Sort By</option>

    <option value="lowToHigh">
      Price: Low to High
    </option>

    <option value="highToLow">
      Price: High to Low
    </option>

    <option value="aToZ">
      Name: A to Z
    </option>
  </select>
      </div>
      
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

  {loading ? (

    Array(10)
      .fill(0)
      .map((_, index) => (

        <div
          key={index}
          className="border rounded-xl p-4 shadow-md animate-pulse"
        >

          <div className="h-40 bg-gray-300 rounded"></div>

          <div className="h-6 bg-gray-300 rounded mt-4"></div>

          <div className="h-6 bg-gray-300 rounded mt-2 w-1/2"></div>

          <div className="h-10 bg-gray-300 rounded mt-4"></div>

        </div>

      ))

  ) : (

    currentProducts.map((item) => (

      <Productcard
        key={item.id}
        id={item.id}
        title={item.title}
        price={item.price}
        image={item.image}
        // addtocart={() => handlecartitem(item)}
      />
      

    ))
    

  )}

</div>
<div className="flex justify-center gap-4 mt-8">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="bg-gray-200 px-4 py-2 rounded"
  >
    Previous
  </button>

  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    Next
  </button>

</div>
    </>
  );
};

export default Home;
