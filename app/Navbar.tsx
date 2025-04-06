"use client";

import React, { use, useEffect, useState } from "react";

export default function NavBar() {
  const [isClick, setisClick] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleNavbar = () => {
    setisClick(!isClick);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
                <a
                  href="/"
                  className={`font-bold ${
                    isScrolled ? "text-white" : "text-black"
                  }`}
                >
                  www.Lakhey.com
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <a
                  href="/"
                  className={`${
                    isScrolled
                      ? "text-white hover:bg-white hover:text-black"
                      : "text-black hover:bg-black hover:text-white"
                  } rounded-lg p-2`}
                >
                  Home
                </a>
                <a
                  href="/aboutus"
                  className={`${
                    isScrolled
                      ? "text-white hover:bg-white hover:text-black"
                      : "text-black hover:bg-black hover:text-white"
                  } rounded-lg p-2`}
                >
                  About
                </a>
                <a
                  href="/"
                  className={`${
                    isScrolled
                      ? "text-white hover:bg-white hover:text-black"
                      : "text-black hover:bg-black hover:text-white"
                  } rounded-lg p-2`}
                >
                  Service
                </a>
                <a
                  href="/"
                  className={`${
                    isScrolled
                      ? "text-white hover:bg-white hover:text-black"
                      : "text-black hover:bg-black hover:text-white"
                  } rounded-lg p-2`}
                >
                  Contact
                </a>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-white  hover:text-white focus:outline:none focus:ring-2 focus:ring:inset focus:ring-white cursor-pointer"
                onClick={toggleNavbar}
              >
                {isClick ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                    stroke="currentColor"
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
              {" "}
              <a
                href="/"
                className={`block rounded-lg p-2 ${
                  isScrolled
                    ? "text-white hover:bg-white hover:text-black"
                    : "text-black hover:bg-black hover:text-white"
                }`}
              >
                Home
              </a>
              <a
                href="/"
                className={`block rounded-lg p-2 ${
                  isScrolled
                    ? "text-white hover:bg-white hover:text-black"
                    : "text-black hover:bg-black hover:text-white"
                }`}
              >
                About
              </a>
              <a
                href="/"
                className={`block rounded-lg p-2 ${
                  isScrolled
                    ? "text-white hover:bg-white hover:text-black"
                    : "text-black hover:bg-black hover:text-white"
                }`}
              >
                Service
              </a>
              <a
                href="/"
                className={`block rounded-lg p-2 ${
                  isScrolled
                    ? "text-white hover:bg-white hover:text-black"
                    : "text-black hover:bg-black hover:text-white"
                }`}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
