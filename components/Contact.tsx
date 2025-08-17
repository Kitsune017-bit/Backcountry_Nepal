// Contact.tsx
"use client";

import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaLinkedin,
  FaInstagram,
  FaBehance,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";

const Contact: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    
    // Set initial window width
    setWindowWidth(window.innerWidth);
    
    // Handle window resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id="contact" className="relative min-h-screen text-black font-poppins">
      {/* Decorative snow particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {windowWidth > 0 && [...Array(window.innerWidth < 768 ? 15 : 25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full opacity-70"
            initial={{ y: -10, x: Math.random() * windowWidth }}
            animate={{ y: "100vh" }}
            transition={{
              repeat: Infinity,
              duration: 10 + Math.random() * 5,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Heading */}
      <header className="text-center mb-8 sm:mb-12 pt-8 sm:pt-16 px-4" data-aos="fade-down">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold Staatliches">
          Contact Us
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Let&apos;s go on a journey of snowboarding...
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Form */}
          <div
            className="bg-white text-black p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg order-2 lg:order-2"
            data-aos="fade-left"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Get In Touch</h2>
            <form className="space-y-4 sm:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-all text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Message</label>
                <textarea
                  rows={4}
                  placeholder="Type your message..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent resize-none text-sm sm:text-base"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-black text-white font-semibold py-3 px-6 sm:px-8 rounded-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer text-sm sm:text-base"
              >
                SUBMIT MESSAGE
              </button>
            </form>
          </div>

          {/* Info + Social */}
          <div
            className="space-y-6 sm:space-y-8 order-1 lg:order-1"
            data-aos="fade-right"
          >
            {/* Images */}
            <div className="flex gap-3 sm:gap-4">
              <div className="w-1/2 h-40 sm:h-48 md:h-56 lg:h-60 overflow-hidden rounded-lg shadow-md">
                <img
                  src="/images/sample2.jpg"
                  alt="Snowboarding Adventure 1"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="w-1/2 h-40 sm:h-48 md:h-56 lg:h-60 overflow-hidden rounded-lg shadow-md">
                <img
                  src="/images/sample.jpg"
                  alt="Snowboarding Adventure 2"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="font-bold text-lg sm:text-xl text-gray-800">
                FOR BUSINESS ENQUIRY:
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <FaEnvelope className="text-goldenYellow text-lg sm:text-xl flex-shrink-0" />
                  <a
                    href="mailto:himalayanmadness@gmail.com"
                    className="text-sm sm:text-base lg:text-lg hover:text-goldenYellow transition-colors break-all"
                  >
                    himalayanmadness@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <FaPhone className="text-goldenYellow text-lg sm:text-xl flex-shrink-0" />
                  <a
                    href="tel:+9779846067648"
                    className="text-sm sm:text-base lg:text-lg hover:text-goldenYellow transition-colors"
                  >
                    +977 9846067648
                  </a>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4  rounded-lg shadow-sm">
                  <FaMapMarkerAlt className="text-goldenYellow text-lg sm:text-xl flex-shrink-0" />
                  <span className="text-sm sm:text-base lg:text-lg">
                    Lakeside, Pokhara, Nepal
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className=" p-4 sm:p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-3 sm:mb-4">
                Follow Us:
              </h3>
              <div className="flex gap-4 sm:gap-6 text-xl sm:text-2xl">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-blue-600 hover:text-blue-700 hover:scale-110 transition-all p-2 hover:bg-blue-50 rounded-full"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a 
                  href="https://www.instagram.com/backcountry.np/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-pink-600 hover:text-pink-700 hover:scale-110 transition-all p-2 hover:bg-pink-50 rounded-full"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-blue-500 hover:text-blue-600 hover:scale-110 transition-all p-2 hover:bg-blue-50 rounded-full"
                  aria-label="Behance"
                >
                  <FaBehance />
                </a>
                <a 
                  href="" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-blue-600 hover:text-blue-700 hover:scale-110 transition-all p-2 hover:bg-blue-50 rounded-full"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a 
                  href="https://www.facebook.com/backcountrynepal" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-red-600 hover:text-red-700 hover:scale-110 transition-all p-2 hover:bg-red-50 rounded-full"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;