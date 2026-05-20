import React, { useState } from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const { cartcount } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [upiId, setUpiId] = useState("");

  const [cardNumber, setCardNumber] = useState("");
const navigate = useNavigate();
  const [cvv, setCvv] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || address === "" || phone === "") {
      toast.error("Please fill all fields");
      return;
    }
    if (paymentMethod === "UPI" && upiId === "") {
  toast.error("Please enter UPI ID");
  return;
}
if (
  paymentMethod === "Card" &&
  (cardNumber === "" || cvv === "")
) {
  toast.error("Please fill card details");
  return;
}
setPlacingOrder(true);
    setError("");

   setTimeout(() => {
  toast.success(`Order placed with ${paymentMethod}`);

  setPlacingOrder(false);

  navigate("/order-success");
}, 2000);
    setName("");
    setAddress("");
    setPhone("");
  };
  const totalItems = cartcount.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartcount.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const gst = subtotal * 0.05;

  const finalPrice = subtotal + gst;
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded-lg w-full"
        />

        <textarea
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-3 rounded-lg w-full"
        />
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-3">Select Payment Method</h2>
          {paymentMethod === "UPI" && (
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="border p-3 w-full rounded mt-4"
            />
          )}
          {paymentMethod === "Card" && (
            <div className="mt-4 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="border p-3 rounded-lg"
              />

              <input
                type="password"
                placeholder="Enter CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="border p-3 rounded-lg"
              />
            </div>
          )}
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Credit / Debit Card
            </label>
          </div>
        </div>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-3 rounded-lg w-full"
        />

        <button
  disabled={placingOrder}
  className="bg-green-600 text-white px-6 py-3 rounded-lg w-full"
>
  {placingOrder ? "Placing Order..." : "Place Order"}
</button>
      </form>
      <div className="mt-8 border rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        <div className="flex justify-between mb-2">
          <p>Total Items</p>
          <p>{totalItems}</p>
        </div>

        <div className="flex justify-between mb-2">
          <p>Subtotal</p>
          <p>₹ {subtotal.toFixed(2)}</p>
        </div>

        <div className="flex justify-between mb-2">
          <p>GST (5%)</p>
          <p>₹ {gst.toFixed(2)}</p>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between text-xl font-bold">
          <p>Final Total</p>
          <p>₹ {finalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
