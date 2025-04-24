"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "./context/CartContext";
import { ShoppingCart, User } from "lucide-react";
import {
  getProfileFromToken as getProfileFromLS,
  // getToken,
  setProfileFromToken,
  UserPayload,
} from "./utils/utilFunc";

export default function NavBar() {
  const [isClick, setisClick] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [profile, setProfile] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);

  const { cart, itemCount, totalPrice, removeFromCart, updateQuantity } =
    useCart();

  // Function to fetch user profile
  // const fetchUserProfile = async (userId: number) => {
  //   const token = getToken();
  //   if (!token) {
  //     throw new Error("No token found");
  //   }

  //   const response = await fetch(
  //     "http://localhost:3002/auth/profile/" + userId,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );

  //   if (!response.ok) {
  //     throw new Error("Failed to fetch profile");
  //   }

  //   setProfile(response.data!);

  //   return await response.json();
  // };

  useEffect(() => {
    try {
      const savedUserProfile: UserPayload = getProfileFromLS();
      setProfile(savedUserProfile);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      console.log("Invalid token:", error);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Add scroll event listener
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleNavbar = () => {
    setisClick(!isClick);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    // Close other modals if open
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setUserDropdownOpen(false);
  };

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
    // Close other modals if open
    setIsCartOpen(false);
    setIsRegisterOpen(false);
    // Reset any previous error messages
    setLoginError("");
  };

  const toggleRegister = () => {
    setIsRegisterOpen(!isRegisterOpen);
    // Close other modals if open
    setIsCartOpen(false);
    setIsLoginOpen(false);
    // Reset any previous error messages
    setLoginError("");
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
    // Close other modals if open
    setIsCartOpen(false);
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      const response = await fetch("http://localhost:3002/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const savedUserData = setProfileFromToken(data.access_token);
      setProfile(savedUserData);

      // Update login state
      setIsLoggedIn(true);
      setIsLoginOpen(false);

      // Reset form
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(""); // Reset any previous error messages

    try {
      const response = await fetch("http://localhost:3002/auth/regist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setIsRegisterOpen(false);
      setIsLoginOpen(true);

      // Reset form
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error);
      setLoginError("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Update state
    setIsLoggedIn(false);
    setUserDropdownOpen(false);
    setProfile(null);

    // Reset any user-related data
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <nav
        className={`fixed w-full z-10 transition-all duration-300 ${
          isScrolled ? "bg-black" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link
                  href="/"
                  className={`font-bold ${
                    isScrolled ? "text-white" : "text-black"
                  }`}
                >
                  www.Lakhey.com
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <Link
                  href="/"
                  className={`${
                    isScrolled
                      ? "text-white hover:bg-white hover:text-black"
                      : "text-black hover:bg-black hover:text-white"
                  } rounded-lg p-2`}
                >
                  Home
                </Link>
                <Link
                  href="/aboutus"
                  className={`${
                    isScrolled
                      ? "text-white hover:bg-white hover:text-black"
                      : "text-black hover:bg-black hover:text-white"
                  } rounded-lg p-2`}
                >
                  About
                </Link>
                <Link
                  href="/products"
                  className={`${
                    isScrolled
                      ? "text-white hover:bg-white hover:text-black"
                      : "text-black hover:bg-black hover:text-white"
                  } rounded-lg p-2`}
                >
                  Products
                </Link>
                <Link
                  href="/contacts"
                  className={`${
                    isScrolled
                      ? "text-white hover:bg-white hover:text-black"
                      : "text-black hover:bg-black hover:text-white"
                  } rounded-lg p-2`}
                >
                  Contact
                </Link>

                {/* Cart Icon */}
                <button
                  onClick={toggleCart}
                  className={`relative flex items-center ${
                    isScrolled
                      ? "text-white hover:bg-white hover:text-black"
                      : "text-black hover:bg-black hover:text-white"
                  } rounded-lg p-2`}
                >
                  <ShoppingCart size={20} />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>

                {/* User Account - Login/Register or Profile */}
                <div className="relative">
                  <button
                    onClick={isLoggedIn ? toggleUserDropdown : toggleLogin}
                    className={`flex items-center ${
                      isScrolled
                        ? "text-white hover:bg-white hover:text-black"
                        : "text-black hover:bg-black hover:text-white"
                    } rounded-lg p-2`}
                  >
                    <User size={20} />
                    <span className="ml-1">
                      {isLoggedIn ? `${profile?.username}` : "Login"}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  {userDropdownOpen && isLoggedIn && profile && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-medium">{profile.username}</p>
                        <p className="text-xs">{profile.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Cart Icon */}
              <button
                onClick={toggleCart}
                className={`relative flex items-center ${
                  isScrolled ? "text-white" : "text-black"
                } p-2`}
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile User Icon */}
              <button
                onClick={isLoggedIn ? toggleUserDropdown : toggleLogin}
                className={`relative flex items-center ${
                  isScrolled ? "text-white" : "text-black"
                } p-2`}
              >
                <User size={20} />
              </button>

              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white cursor-pointer"
                onClick={toggleNavbar}
              >
                {isClick ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={isScrolled ? "white" : "black"}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={isScrolled ? "white" : "black"}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {isClick && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className={`block rounded-lg p-2 ${
                  isScrolled
                    ? "text-white hover:bg-white hover:text-black"
                    : "text-black hover:bg-black hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                href="/aboutus"
                className={`block rounded-lg p-2 ${
                  isScrolled
                    ? "text-white hover:bg-white hover:text-black"
                    : "text-black hover:bg-black hover:text-white"
                }`}
              >
                About
              </Link>
              <Link
                href="/products"
                className={`block rounded-lg p-2 ${
                  isScrolled
                    ? "text-white hover:bg-white hover:text-black"
                    : "text-black hover:bg-black hover:text-white"
                }`}
              >
                Products
              </Link>
              <Link
                href="/contacts"
                className={`block rounded-lg p-2 ${
                  isScrolled
                    ? "text-white hover:bg-white hover:text-black"
                    : "text-black hover:bg-black hover:text-white"
                }`}
              >
                Contact
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    className={`block rounded-lg p-2 ${
                      isScrolled
                        ? "text-white hover:bg-white hover:text-black"
                        : "text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-left rounded-lg p-2 ${
                      isScrolled
                        ? "text-white hover:bg-white hover:text-black"
                        : "text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={toggleLogin}
                  className={`block w-full text-left rounded-lg p-2 ${
                    isScrolled
                      ? "text-white hover:bg-white hover:text-black"
                      : "text-black hover:bg-black hover:text-white"
                  }`}
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Cart Dropdown */}
      {isCartOpen && (
        <div className="fixed top-16 right-0 w-full md:w-96 bg-white shadow-lg z-20 max-h-[80vh] overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-black">
                Your Cart ({itemCount} items)
              </h2>
              <button
                onClick={toggleCart}
                className="text-gray-500 hover:text-black"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-black">Your cart is empty</p>
                <Link
                  href="/products"
                  className="mt-4 inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                  onClick={toggleCart}
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex border-b pb-4">
                      <div className="w-20 h-20 relative flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-black">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-800 hover:text-red-500"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm text-black">Size: {item.size}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex border border-gray-300">
                            <button
                              className="px-2 py-1 text-sm text-black"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                            >
                              -
                            </button>
                            <span className="px-2 py-1 text-sm text-black">
                              {item.quantity}
                            </span>
                            <button
                              className="px-2 py-1 text-sm text-black"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <span className="font-medium text-black">
                            ${item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 text-black">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span className="font-medium">${totalPrice}</span>
                  </div>
                  {isLoggedIn ? (
                    <Link
                      href="/checkout"
                      className="block w-full bg-black text-white text-center py-2 rounded hover:bg-gray-800 transition"
                      onClick={toggleCart}
                    >
                      Checkout
                    </Link>
                  ) : (
                    <button
                      className="block w-full bg-black text-white text-center py-2 rounded hover:bg-gray-800 transition"
                      onClick={() => {
                        toggleCart();
                        setIsLoginOpen(true);
                      }}
                    >
                      Login to Checkout
                    </button>
                  )}

                  <button
                    onClick={toggleCart}
                    className="block w-full text-center py-2 mt-2 text-gray-600 hover:text-black"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed top-16 right-0 w-full md:w-96 bg-white shadow-lg z-20">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-black">Login</h2>
              <button
                onClick={toggleLogin}
                className="text-gray-500 hover:text-black"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {loginError && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-black"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-black hover:text-black"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-black">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => {
                    setIsLoginOpen(false);
                    setIsRegisterOpen(true);
                  }}
                  className="font-medium text-black hover:underline"
                >
                  Register
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterOpen && (
        <div className="fixed top-16 right-0 w-full md:w-96 bg-white shadow-lg z-20">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-black">Register</h2>
              <button
                onClick={toggleRegister}
                className="text-gray-500 hover:text-black"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {loginError && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {loginError}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-black"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="register-email"
                  className="block text-sm font-medium text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="register-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="register-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm text-black"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-black"
                >
                  I agree to the{" "}
                  <a href="#" className="text-black hover:underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-black">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setIsRegisterOpen(false);
                    setIsLoginOpen(true);
                  }}
                  className="font-medium text-black hover:underline"
                >
                  {loading && "..."}
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
