import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // ✅ Load from localStorage initially
  const [cartcount, setcartcount] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartcount));
  }, [cartcount]);

  // 🟢 ADD TO CART
  const addToCart = (product) => {
    const existing = cartcount.find((item) => item.id === product.id);

    if (existing) {
      const updated = cartcount.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setcartcount(updated);
      toast.success("Quantity increased");
    } else {
      setcartcount([...cartcount, { ...product, quantity: 1 }]);
      toast.success("Added to cart");
    }
  };

  const increaseQuantity = (id) => {
    setcartcount((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setcartcount((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setcartcount((prev) =>
      prev.filter((item) => item.id !== id)
    );
    toast.error("Item removed");
  };

  return (
    <CartContext.Provider
      value={{
        cartcount,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};