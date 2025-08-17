"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const highlightsData = [
  {
    id: 1,
    img: "/images/Gulmarg.png",
    title: "Accommodation in Gulmarg",
    description:
      "15 nights in a private hut on AP basis. 5 rooms, triple sharing, attached washrooms, hot showers & AC for comfort.",
  },
  {
    id: 2,
    img: "/images/skilessons.png",
    title: "Ski Gear & Lessons",
    description:
      "Pair of skis, boots & poles for 15 days plus professional ski instruction for 10 days.",
  },
  {
    id: 3,
    img: "/images/avalanche.jpeg",
    title: "Avalanche Safety",
    description:
      "Specialised avalanche courses in collaboration with @avalanchecanada for safety and preparedness.",
  },
  {
    id: 4,
    img: "/images/srinagar.png",
    title: "Srinagar Experience",
    description:
      "1 night in a premium Boathouse on Dal Lake with breakfast before your Kathmandu flight.",
  },
  {
    id: 5,
    img: "/images/Thar.jpeg",
    title: "Ground Transfers",
    description:
      "All 4WD Jeep transfers in Kashmir, including Srinagar-Gulmarg, daily gondola trips, sightseeing & shopping.",
  },
];

const Highlights: React.FC = () => {
  const [activeId, setActiveId] = useState(1);
  const [mobileIndex, setMobileIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isPaused, setIsPaused] = useState(false);

  // Auto-play for mobile carousel with pause functionality
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % highlightsData.length);
    }, 5000); // every 5 seconds for better viewing time
    
    return () => clearInterval(interval);
  }, [isPaused]);

  // Scroll to active index on change with easing
  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth - 48; // Account for padding
      scrollRef.current.scrollTo({
        left: cardWidth * mobileIndex,
        behavior: "smooth",
      });
    }
  }, [mobileIndex]);

  // Handle manual scroll to update index
  const handleScroll = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth - 48;
      const scrollLeft = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== mobileIndex && newIndex >= 0 && newIndex < highlightsData.length) {
        setMobileIndex(newIndex);
      }
    }
  };

  return (
    <section id="highlights" className="relative max-w-7xl mx-auto py-16 px-6 text-black">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12 text-center font-[Staatliches]">
        Our Packages
      </h2>

      {/* Desktop Layout (unchanged) */}
      <div className="hidden md:flex gap-4 h-[550px]">
        {highlightsData.map(({ id, img, title, description }, index) => {
          const isActive = id === activeId;
          return (
            <motion.div
              key={id}
              layout
              onMouseEnter={() => setActiveId(id)}
              className="relative rounded-xl overflow-hidden cursor-pointer bg-white/10 backdrop-blur-md shadow-md"
              animate={{
                flex: isActive ? 4 : 1.2,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <motion.img
                src={img}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ scale: isActive ? 1.08 : 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />

              {isActive && <div className="absolute inset-0 bg-black/40"></div>}

              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + index * 0.1,
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 flex flex-col justify-center items-center text-center p-8 h-full"
                >
                  <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-white">{title}</h3>
                  <p className="text-base lg:text-lg text-gray-100 max-w-2xl leading-relaxed">
                    {description}
                  </p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Carousel - Fixed Layout */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-scroll snap-x snap-mandatory pb-4 scroll-smooth"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' }
          }}
        >
          {highlightsData.map(({ id, img, title, description }, index) => (
            <div
              key={id}
              className="flex-none w-[calc(100vw-3rem)] max-w-sm mx-3 snap-center bg-white rounded-xl shadow-lg overflow-hidden"
              style={{ minWidth: 'calc(100vw - 3rem)', maxWidth: '400px' }}
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/placeholder.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content Container */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight line-clamp-2">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-4">
                  {description}
                </p>
                
                {/* Optional: Card number indicator */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-medium">
                    {String(index + 1).padStart(2, '0')} / {String(highlightsData.length).padStart(2, '0')}
                  </span>
                  <div className="w-8 h-1 bg-blue-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${((index + 1) / highlightsData.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Progress Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {highlightsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setMobileIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                mobileIndex === index 
                  ? "bg-blue-600 w-8 shadow-sm" 
                  : "bg-gray-300 hover:bg-gray-400 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Highlights;