import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../CartContext";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const { cartcount } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <nav className="bg-green-600 text-white h-16 flex items-center justify-between px-8">
      <h1 className="text-2xl font-bold">Instamart</h1>

      <div className="flex gap-6 text-lg">
        <Link to="/" className="cursor-pointer">
          Home
        </Link>

       <Link to="/" className="cursor-pointer">
          Product
        </Link>

        <div className="relative cursor-pointer">
          <Link to="/cart" className="cursor-pointer">
            Cart
          </Link>

          {cartcount.length > 0 && (
            <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartcount.length}
            </span>
          )}
        </div>
        {isLoggedIn ? (
          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              setIsLoggedIn(false);
              navigate("/login");
            }}
            className="bg-white text-green-600 px-4 py-1 rounded-lg w-24"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="bg-white text-green-600 px-4 py-1 rounded-lg w-24">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
