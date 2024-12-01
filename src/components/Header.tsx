import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/titan-banner.svg";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiMapPin,
  FiChevronDown,
  FiMic,
} from "react-icons/fi";
import { HiBuildingStorefront } from "react-icons/hi2";
import { useAuth } from "../contexts/AuthContext";

interface NavItem {
  label: string;
  href: string;
}

const mainNavItems: NavItem[] = [
  { label: "MEN", href: "#" },
  { label: "WOMEN", href: "#" },
  { label: "SMART WATCHES", href: "#" },
  { label: "PREMIUM WATCHES", href: "#" },
  { label: "WATCHES", href: "#" },
  { label: "INTERNATIONAL BRANDS", href: "#" },
  { label: "GIFTING", href: "#" },
  { label: "SALE", href: "#" },
  { label: "WATCH SERVICE", href: "#" },
  { label: "MORE", href: "#" },
];

export default function Header() {
  const { user, logout, isAdmin, isCustomer, isLoggedIn } = useAuth();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

 
  const handleAccountClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  };

  return (
    <nav className="w-full bg-white">
      {/* Top Bar */}
      <div className={`w-full bg-white ${isSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : ''}`}>
        <div className="container mx-auto px-10 py-2">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center h-8">
              <img
                src={logo}
                alt="Titan Logo"
                className="h-full object-contain"
              />
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <FiMic className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-6">
               {/* Display Account Icon Only if User is Not Logged In */}
               {!isLoggedIn && (
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={handleAccountClick}
                >
                  <FiUser className="h-6 w-6" />
                  <span className="text-xs mt-1">Account</span>
                </div>
              )}

              {/* Conditional Rendering Based on User Role */}
              {isAdmin && (
                <Link to="/admin-dashboard" className="flex flex-col items-center cursor-pointer">
                  <span className="text-xs mt-1">Admin</span>
                </Link>
              )}

              {isCustomer && (
                <>
                  <Link to="/cart" className="flex flex-col items-center relative cursor-pointer">
                    <FiShoppingCart className="h-6 w-6" />
                    <span className="text-xs mt-1">Cart</span>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      1
                    </span>
                  </Link>
                  <Link to="/orders" className="flex flex-col items-center cursor-pointer">
                    <HiBuildingStorefront className="h-6 w-6" />
                    <span className="text-xs mt-1">Orders</span>
                  </Link>
                </>
              )}

             

       {isLoggedIn && (
                <button
                  onClick={logout}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <span className="text-xs mt-1">Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto">
        <div className="flex justify-center">
          <ul className="flex justify-around w-full max-w-6xl py-4">
            {mainNavItems.map((item) => (
              <li
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <a
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Location Bar */}
      <div className="bg-titan-bg-theme py-2 cursor-pointer">
        <div className="container mx-auto px-4 flex items-center">
          <FiMapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">Select a location</span>
          <FiChevronDown className="h-4 w-4 ml-1" />
        </div>
      </div>

      {isSticky && <div style={{ height: '80px' }}></div>}
    </nav>
  );
}