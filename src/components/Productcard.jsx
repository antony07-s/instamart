import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";

const Productcard = ({ id, title, price, image }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border rounded-2xl p-4 shadow-md bg-white flex flex-col justify-between h-full hover:shadow-xl transition-all duration-300">

      <Link to={`/product/${id}`} className="flex flex-col flex-1">

        <div className="h-52 flex items-center justify-center">
          <img
            src={image}
            alt="product"
            className="h-40 object-contain"
          />
        </div>

        <h2 className="text-xl font-bold mt-4 line-clamp-2 min-h-[64px]">
          {title}
        </h2>

        <p className="text-green-600 font-bold text-xl mt-3">
          ₹ {price}
        </p>

      </Link>

      <button
        onClick={() => addToCart({ id, title, image, price })}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl mt-5 w-full transition-all duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Productcard;