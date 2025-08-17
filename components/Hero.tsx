"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll animations only for desktop
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.8, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], ["-5%", "0%"]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen w-full flex items-center justify-start text-white overflow-hidden"
    >
      {/* Hero background */}
      {isMobile ? (
        <img
          src="/images/hero.jpeg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover filter brightness-75 -z-10"
        />
      ) : (
        <motion.img
          src="/images/hero.jpeg"
          alt="Hero Background"
          style={{ scale, y: translateY }}
          className="absolute inset-0 w-full h-full object-cover filter brightness-75 -z-10 will-change-transform"
        />
      )}

      {/* Text content */}
      <div
        className="relative z-10 text-left px-4 sm:px-8 md:px-12 lg:px-20 max-w-5xl"
        style={{ opacity: isMobile ? 1 : textOpacity }}
      >
        <motion.h1
          initial={isMobile ? {} : { y: 40 }}
          whileInView={isMobile ? {} : { y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="Staatliches text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-tight"
        >
          Where Snow Meets Soul.
        </motion.h1>

        <motion.p
          initial={isMobile ? {} : { y: 20 }}
          whileInView={isMobile ? {} : { y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="Staatliches mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-3xl"
        >
          Find your line. Lose yourself in the silence.
        </motion.p>

        <motion.a
          whileHover={isMobile ? {} : { scale: 1.05 }}
          whileTap={isMobile ? {} : { scale: 0.95 }}
          href="#pricing"
          className="mt-6 inline-block bg-white text-gray-800 px-6 sm:px-8 py-3 rounded-lg font-bold shadow-lg"
        >
          <div className="Staatliches flex flex-row justify-between items-center">
            Book Now <FaArrowRight className="ml-3" />
          </div>
        </motion.a>
      </div>
    </section>
  );
}
