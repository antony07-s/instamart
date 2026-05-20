import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../CartContext";

const Productdetails = ({ product }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const singleproduct = product.find(
    (item) => item.id === Number(id)
  );

  if (!singleproduct) {
    return <h1 className="text-3xl p-8">Product Not Found</h1>;
  }

  return (
    <div className="p-8">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 px-4 py-2 rounded mb-6"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto border rounded-xl p-8 shadow-lg">
        <img
          src={singleproduct.image}
          alt={singleproduct.title}
          className="h-72 w-full object-contain"
        />

        <h1 className="text-3xl font-bold mt-6">
          {singleproduct.title}
        </h1>

        <p className="text-green-600 text-2xl font-bold mt-4">
          ₹ {singleproduct.price}
        </p>

        <p className="text-gray-600 mt-4">
          {singleproduct.description}
        </p>

        <button
          onClick={() => addToCart(singleproduct)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg mt-6"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Productdetails;