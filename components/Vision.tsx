"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Vision() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Zoom animation slightly offset from text
  const scale = useTransform(scrollYProgress, [0.1, 0.9], [1.4, 1]);

  // Text fade quicker (starts a bit later)
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative h-[120vh] flex items-center justify-center text-snowWhite overflow-hidden"
    >
      {/* Background image with smooth zoom */}
      <motion.img
        src="/images/highqua.png"
        alt="Vision Background"
        style={{ scale }}
        className="absolute inset-0 w-full h-full object-cover -z-10 will-change-transform"
      />
       <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-70"
            initial={{ y: -10, x: Math.random() * window.innerWidth }}
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

      {/* Text */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="text-center px-4 "
      >
        <motion.h2
          initial={{ y: 60 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-7xl Staatliches font-bold mb-4"
        >
          Our Vision
        </motion.h2>
        <motion.p
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="font-poppins max-w-3xl mx-auto text-lg md:text-base mb-70"
        >
          We aim to create unforgettable adventures that connect you with the
          mountains, the snow, and the vibrant cultures that call them home.
        </motion.p>
      </motion.div>
    </section>
  );
}
