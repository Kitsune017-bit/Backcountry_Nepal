"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  FaPlaneArrival,
  FaSkiing,
  FaSnowboarding,
  FaStore,
  FaMountain,
  FaSnowflake,
  FaPlaneDeparture,
  FaCheck,
} from "react-icons/fa";

const itinerary = [
  { day: "Day 1", details: "Arrival in Kashmir, welcome dinner", icon: <FaPlaneArrival /> },
  { day: "Day 2", details: "Ski/Snowboard training for beginners", icon: <FaSkiing /> },
  { day: "Day 3", details: "Full-day snowboarding tour", icon: <FaSnowboarding /> },
  { day: "Day 4", details: "Explore local markets & culture", icon: <FaStore /> },
  { day: "Day 5", details: "Advanced slope adventure", icon: <FaMountain /> },
  { day: "Day 6", details: "Snowmobile & photography day", icon: <FaSnowflake /> },
  { day: "Day 7", details: "Departure", icon: <FaPlaneDeparture /> },
];

export default function Itinerary() {
  const [completedItems, setCompletedItems] = useState(new Set());
  const [windowWidth, setWindowWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Handle window width on client side only
  useEffect(() => {
    setIsClient(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-complete items based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const newCompleted = new Set();
      const threshold = 0.15; // Start completing items when 15% scrolled
      const itemsToComplete = Math.floor((latest - threshold) / ((1 - threshold) / itinerary.length));
      
      for (let i = 0; i <= Math.min(itemsToComplete, itinerary.length - 1); i++) {
        newCompleted.add(i);
      }
      setCompletedItems(newCompleted);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleItemClick = (index) => {
    setCompletedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} id="itinerary" className="py-20 bg-[#b5e3ff] relative overflow-hidden">
      {/* Decorative snow particles */}
      {isClient && windowWidth > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(windowWidth < 768 ? 15 : 25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 md:w-2 md:h-2 bg-white rounded-full opacity-70"
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
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 font-[Staatliches] text-gray-800"
        >
          Trip Itinerary
        </motion.h2>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Timeline Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gradient-to-b from-blue-200/20 to-blue-400/60 transform -translate-x-1/2" />
          
          {/* Progress Line */}
          <motion.div 
            className="absolute top-0 left-1/2 w-1 bg-gradient-to-b from-blue-500 to-blue-600 transform -translate-x-1/2 z-10"
            style={{ height: progressHeight }}
          />

          <div className="space-y-12">
            {itinerary.map((item, i) => {
              const isLeft = i % 2 === 0;
              const isCompleted = completedItems.has(i);
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut", delay: i * 0.1 }}
                  className={`relative flex items-center ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                >
                  <motion.div
                    className={`w-5/12 p-6 rounded-2xl shadow-xl backdrop-blur-lg bg-white/40 border border-white/20 cursor-pointer group ${
                      isCompleted ? 'ring-2 ring-blue-400' : ''
                    }`}
                    onClick={() => handleItemClick(i)}
                    whileHover={{ scale: 1.05, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`relative p-4 rounded-full text-2xl shadow-lg transition-colors duration-300 ${
                        isCompleted 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-blue-200 text-blue-600 group-hover:bg-blue-300'
                      }`}>
                        {isCompleted ? <FaCheck /> : item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold text-xl transition-colors duration-300 ${
                          isCompleted ? 'text-blue-600 line-through' : 'text-blue-600'
                        }`}>
                          {item.day}
                        </h3>
                        <p className={`font-poppins transition-colors duration-300 ${
                          isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'
                        }`}>
                          {item.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Timeline Dot */}
                  <motion.div 
                    className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 border-4 border-white rounded-full z-20 transition-colors duration-300 ${
                      isCompleted ? 'bg-blue-500' : 'bg-blue-500'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet Timeline */}
        <div className="lg:hidden relative">
          {/* Mobile Timeline Line - Left Side */}
          <div className="absolute top-0 bottom-0 left-6 w-1 bg-gradient-to-b from-blue-200/20 to-blue-400/60" />
          
          {/* Mobile Progress Line */}
          <motion.div 
            className="absolute top-0 left-6 w-1 bg-gradient-to-b from-blue-500 to-blue-600 z-10"
            style={{ height: progressHeight }}
          />

          <div className="space-y-8 pl-16">
            {itinerary.map((item, i) => {
              const isCompleted = completedItems.has(i);
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut", delay: i * 0.1 }}
                  className="relative"
                >
                  <motion.div
                    className={`p-4 sm:p-6 rounded-2xl shadow-xl backdrop-blur-lg bg-white/40 border border-white/20 cursor-pointer group ${
                      isCompleted ? 'ring-2 ring-blue-400' : ''
                    }`}
                    onClick={() => handleItemClick(i)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`relative p-3 sm:p-4 rounded-full text-xl sm:text-2xl shadow-lg transition-colors duration-300 ${
                        isCompleted 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-blue-200 text-blue-600 group-hover:bg-blue-300'
                      }`}>
                        {isCompleted ? <FaCheck /> : item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-lg sm:text-xl transition-colors duration-300 ${
                          isCompleted ? 'text-blue-600 line-through' : 'text-blue-600'
                        }`}>
                          {item.day}
                        </h3>
                        <p className={`font-poppins text-sm sm:text-base transition-colors duration-300 ${
                          isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'
                        }`}>
                          {item.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Mobile Timeline Dot */}
                  <motion.div 
                    className={`absolute left-[-41px] top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 border-3 border-white rounded-full z-20 transition-colors duration-300 ${
                      isCompleted ? 'bg-blue-500' : 'bg-blue-500'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Progress Indicator */}
        <motion.div 
          className="fixed bottom-8 right-8 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg z-30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="text-sm font-bold text-blue-600">
            {completedItems.size}/{itinerary.length}
          </div>
        </motion.div>
      </div>
    </section>
  );
}