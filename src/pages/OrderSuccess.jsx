import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">

      <h1 className="text-5xl font-bold text-green-600">
        ✅ Order Placed
      </h1>

      <p className="text-gray-500 mt-4 text-lg">
        Thank you for shopping with Instamart
      </p>

      <Link to="/">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg mt-8">
          Continue Shopping
        </button>
      </Link>

    </div>
  );
};

export default OrderSuccess;