"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.querySelector("#hero")?.clientHeight || 0;
      setShowNavbar(window.scrollY > heroHeight - 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    "Home",
    "Highlights",
    "Itinerary",
    "Gallery",
    "Booking",
    "Testimonials",
  ];

  const handleLinkClick = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <AnimatePresence>
        {showNavbar && (
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl z-50"
          >
            <div className="flex items-center justify-between bg-white/30 rounded-full shadow-md px-4 sm:px-6 py-3 backdrop-blur-md">
              {/* Logo */}
              <a
                href="#"
                className="text-alpineBlue font-montserrat font-bold text-base sm:text-lg md:text-xl flex items-center gap-1 sm:gap-2 flex-shrink-0"
              >
                <img
                  src="/images/logo.png"
                  alt="Backcountry Nepal Logo"
                  className="h-6 sm:h-8 md:h-10 w-auto"
                />
                <span className="hidden xs:inline sm:inline">Backcountry Nepal</span>
                <span className="xs:hidden sm:hidden">BCN</span>
              </a>

              {/* Desktop Navigation - Centered */}
              <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
                <div className="flex space-x-6 text-lg font-medium">
                  {navItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleLinkClick(item)}
                      className="relative text-alpineBlue px-2 py-1 transition-all duration-300 
                                 after:content-[''] after:absolute after:left-0 after:bottom-0 
                                 after:w-0 after:h-[2px] after:bg-goldenYellow after:rounded-full 
                                 after:transition-all after:duration-300 
                                 hover:after:w-full whitespace-nowrap"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Button */}
              <div className="hidden lg:block flex-shrink-0">
                <button
                  onClick={() => handleLinkClick("Contact")}
                  className="bg-white text-black px-4 py-2 rounded-full font-medium shadow hover:shadow-lg transition"
                >
                  Contact
                </button>
              </div>

              {/* Hamburger Menu */}
              <div className="lg:hidden flex-shrink-0">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-alpineBlue text-xl sm:text-2xl p-1"
                >
                  {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 w-[280px] sm:w-[320px] max-w-[85vw] h-full bg-white/95 backdrop-blur-lg z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200/50">
                <div className="text-alpineBlue font-montserrat font-bold text-lg flex items-center gap-2">
                  <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="h-6 w-auto"
                  />
                  <span className="text-sm sm:text-base">Backcountry Nepal</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-alpineBlue text-xl sm:text-2xl p-1 hover:bg-gray-100/50 rounded-full transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 p-4 sm:p-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleLinkClick(item)}
                    className="w-full text-alpineBlue text-lg font-semibold py-3 px-4 rounded-xl hover:bg-white/60 transition-all text-left border border-transparent hover:border-gray-200/30"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>

              {/* Contact Button */}
              <div className="p-4 sm:p-6 border-t border-gray-200/50">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => handleLinkClick("Contact")}
                  className="w-full bg-alpineBlue text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}