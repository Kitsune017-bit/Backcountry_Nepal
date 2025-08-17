"use client";
import React from "react";
import { motion } from "framer-motion";

const words = [
  "Summit",
  "Adventure",
  "Journey",
  "Peak",
  "Explore",
  "Trail",
  "Horizon",
  "Nature",
  "Challenge",
  "Wander",
];

const InfiniteNameLoop: React.FC = () => {
  return (
    <section className="max-w-full mx-auto px-6 py-16">

      <div className="overflow-hidden whitespace-nowrap mb-12 max-w-full mx-auto">
        <motion.div
          className="inline-block"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        >
          {words.concat(words).map((word, index) => (
            <span
              key={index}
              className="Staatliches mx-8 text-2xl font-bold text-gray-800 tracking-widest uppercase inline-block"
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InfiniteNameLoop;
