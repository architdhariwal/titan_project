import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from "../assets/titan-banner.svg";
import {
  FiUser,
  FiShoppingCart,
} from "react-icons/fi";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { getCart } from "../services/cartService"; 
import SearchBar from "./SearchBar/SearchBar";


interface NavItem {
  label: string;
  href: string;
}

const mainNavItems: NavItem[] = [
  { label: "MEN", href: "/products?category=men" },
  { label: "WOMEN", href: "/products?category=women" },
  { label: "KIDS", href: "/products?category=kids" },
  { label: "PREMIUM WATCHES", href: "/products" },
  { label: "WATCHES", href: "/products" },
  { label: "INTERNATIONAL BRANDS", href: "/products" },
  { label: "GIFTING", href: "/products" },
  { label: "SALE", href: "/products" },
  { label: "WATCH SERVICE", href: "/products" },
];

const Header = () => {
  const { user, logout, isAdmin, isCustomer, isLoggedIn } = useAuth();
  const [isSticky, setIsSticky] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const shouldShowSearchBox =
    location.pathname === "/" ||
    location.pathname.startsWith("/products");

  const handleLogoClick = () => navigate("/");

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 
  useEffect(() => {
    const fetchCart = async () => {
      if (isLoggedIn && user) {
        try {
          const cart = await getCart(user.id);
          const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
          setCartItemCount(totalItems);
        } catch (error) {
          console.error('Failed to fetch cart:', error);
          setCartItemCount(0);
        }
      }
    };

    fetchCart();
  }, [isLoggedIn, user]);

  return (
    <nav className="w-full bg-white">
      <div
        className={`w-full bg-white ${
          isSticky ? "fixed top-0 left-0 right-0 z-50 shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-10 py-2">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center h-8 cursor-pointer" onClick={handleLogoClick}>
              <img src={logo} alt="Titan Logo" className="h-full object-contain" />
            </div>

               {shouldShowSearchBox && (
              <div className="flex-1 max-w-2xl mx-8">
                <SearchBar />
              </div>
            )}

            <div className="flex items-center space-x-6">
              {!isLoggedIn && (
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  <FiUser className="h-6 w-6" />
                  <span className="text-xs mt-1">Account</span>
                </div>
              )}

              {isAdmin && (
                <Link
                  to="/admin-dashboard"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <FaUser className="h-6 w-6" />
                  <span className="text-xs mt-1">Admin</span>
                </Link>
              )}

              {isCustomer && (
                <>
                  <Link
                    to="/cart"
                    className="flex flex-col items-center relative cursor-pointer"
                  >
                    <FiShoppingCart className="h-6 w-6" />
                    <span className="text-xs mt-1">Cart</span>
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </>
              )}

              {isLoggedIn && (
                <button
                  onClick={logout}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <FaSignOutAlt className="h-6 w-6" />
                  <span className="text-xs mt-1">Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {shouldShowSearchBox && (
        <div className="container mx-auto">
          <div className="flex justify-center">
            <ul className="flex justify-around w-full max-w-6xl py-4">
              {mainNavItems.map((item) => (
                <li key={item.label} className="relative group">
                  <Link
                    to={item.href}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isSticky && <div style={{ height: "80px" }}></div>}
    </nav>
  );
};

export default Header;