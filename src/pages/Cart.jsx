import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import { Link, Navigate } from "react-router-dom";
const Cart = () => {
  const {
    cartcount,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    
  } = useContext(CartContext);
  

  if (cartcount.length === 0) {
  return (
    <div className="text-center p-10">
      <h1 className="text-2xl font-bold">🛒 Cart is Empty</h1>
      <p className="text-gray-500 mt-2">Start shopping now!</p>
    </div>
  );
}

 const totalItems = cartcount.reduce((acc, item) => acc + item.quantity, 0);

const totalPrice = cartcount.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

const gst = totalPrice * 0.05;
const finalPrice = totalPrice + gst;

  return (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-6">Cart Items</h1>

    {cartcount.map((item) => (
      <div
        key={item.id}
        className="border rounded-xl p-4 mb-4 flex justify-between items-center shadow-sm"
      >
        <div className="flex-1">
          <h2 className="font-semibold text-lg">{item.title}</h2>

          <p className="text-green-600 font-bold mt-1">
            ₹ {item.price}
          </p>

          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              -
            </button>

            <p className="font-semibold">{item.quantity}</p>

            <button
              onClick={() => increaseQuantity(item.id)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="mt-3 bg-red-500 text-white px-4 py-1 rounded"
          >
            Remove
          </button>
        </div>

        <div className="text-xl font-bold text-gray-700">
          ₹ {item.price * item.quantity}
        </div>
      </div>
    ))}

    <h2 className="text-right text-2xl font-bold mt-6">
      Total: ₹ {totalPrice}
    </h2>
    <div className="flex justify-end mt-6">

  <Link to="/checkout">
    <button className="bg-green-600 text-white px-6 py-3 rounded-lg">
      Proceed to Checkout
    </button>
  </Link>

</div>
  </div>
  
);
};

export default Cart;