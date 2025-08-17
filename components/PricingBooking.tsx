"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PricingBooking() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "+=400",
          scrub: 1,
          pin: true,
        },
      });

      gsap.set(imageRef.current, {
        scale: 1.35,
        xPercent: -50,
        left: "50%",
        yPercent: -10,
      });

      gsap.set(textRef.current, { opacity: 0, y: 30 });

      tl.to(imageRef.current, {
        xPercent: 25,
        scale: 1.2,
        duration: 1,
        ease: "power1.out",
      });

      tl.to(
        textRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative bg-alpineBlue text-snowWhite pt-6 pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left Text + Form */}
        <div ref={textRef} className="space-y-6 z-10 text-center md:text-left">
          <h2 className="Staatliches font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Pricing & Booking
          </h2>
          <h3 className="font-montserrat font-bold text-xl sm:text-2xl md:text-3xl">
            $1,200 / person
          </h3>
          <p className="font-poppins max-w-lg mx-auto md:mx-0 text-sm sm:text-base md:text-lg leading-relaxed">
            Includes accommodation, meals, ski pass, and equipment rental.
          </p>

          <form className="space-y-4 max-w-md mx-auto md:mx-0">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded border text-charcoal text-sm sm:text-base"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 rounded border text-charcoal text-sm sm:text-base"
            />
            <input
              type="number"
              placeholder="Number of People"
              className="w-full p-3 rounded border text-charcoal text-sm sm:text-base"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                className="w-full p-3 rounded border text-charcoal text-sm sm:text-base"
              />
              <input
                type="date"
                className="w-full p-3 rounded border text-charcoal text-sm sm:text-base"
              />
            </div>
            <button
              type="submit"
              className="bg-white Staatliches text-charcoal px-6 py-3 rounded-lg font-bold hover:scale-105 transition cursor-pointer text-base sm:text-lg"
            >
              Reserve Spot
            </button>
          </form>
        </div>

        {/* Right Image - hidden on mobile */}
        <div className="relative h-[350px] sm:h-[450px] items-center justify-center hidden md:flex">
          <Image
            ref={imageRef}
            src="/images/snowboarder.png"
            alt="Snowboarder"
            width={400}
            height={400}
            className="absolute object-contain"
            priority
          />
        </div>
      </div>

      {/* Decorative snow particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
    </section>
  );
}
