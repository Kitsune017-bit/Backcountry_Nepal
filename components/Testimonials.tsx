"use client";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bgImage = "/images/snowbackground.jpg";
const skaterImage = "/images/Skater.png";

const mainCard = {
  title: "Snowboarding Day!",
  meta: "Friday at 10:30PM",
  stats: { people: 35, distance: "100 km" },
  avatars: [
    "/images/avatar1.jpg",
    "/images/avatar2.jpg",
    "/images/avatar3.jpg",
  ],
};

const reviews = [
  {
    type: "event",
    title: "Skiing Tourney",
    meta: "Sunday at 09:00AM",
    stats: { people: 49, distance: "733 km" },
    avatar: "/images/person1.png",
  },
  {
    type: "comment",
    name: "Terri J. Cushman",
    text: "Great! 👍",
    avatar: "/images/person2.jpg",
  },
  {
    type: "comment",
    name: "Josue Middaugh",
    text: "OMG...!!!",
    avatar: "/images/person3.jpg",
  },
  {
    type: "event",
    title: "Snowboard Lessons",
    meta: "Monday at 11:00PM",
    stats: { people: 8, distance: "70 km" },
    avatar: "/images/person4.jpg",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const skaterRef = useRef<HTMLImageElement>(null);
  const reviewRefs = useRef<HTMLDivElement[]>([]);
  const [windowWidth, setWindowWidth] = useState(0);

  // Handle window width on client side only
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Set initial width
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    if (windowWidth === 0) return; // Wait for client-side hydration

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(mainCardRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 0.9,
        ease: "power3.out",
      });

      tl.from(
        skaterRef.current,
        {
          y: 100,
          scale: 1,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.8)",
        },
        "-=0.4"
      );

      tl.from(
        reviewRefs.current,
        {
          opacity: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.3,
          ease: "power2.out",
        },
        "+=0.5"
      );
    });

    return () => ctx.revert();
  }, [windowWidth]);

  return (
    <section
      id="testimonials" 
      ref={sectionRef}
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background */}
      <img
        src={bgImage}
        alt="Snowy background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      
      {/* Snow Animation - only render on client side */}
      {windowWidth > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(windowWidth < 768 ? 15 : 25)].map((_, i) => (
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
      )}

      {/* Desktop Layout */}
      <div className="hidden lg:contents">
        {/* Main Card */}
        <div
          ref={mainCardRef}
          className="relative z-10 bg-white rounded-xl shadow-2xl p-8 max-w-xl mt-28"
        >
          {/* Skater Image */}
          <img
            ref={skaterRef}
            src={skaterImage}
            alt="Skater"
            className="absolute -top-64 left-1/2 -translate-x-1/2 w-[500px] h-[350px] drop-shadow-2xl"
          />
          <h2 className="text-3xl font-bold">{mainCard.title}</h2>
          <p className="text-gray-600">{mainCard.meta}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span>👥 {mainCard.stats.people}</span>
            <span>📍 {mainCard.stats.distance}</span>
          </div>
          <div className="flex mt-5">
            {mainCard.avatars.map((a, i) => (
              <img
                key={i}
                src={a}
                alt=""
                className="w-10 h-10 rounded-full border-2 border-white -ml-3 first:ml-0"
              />
            ))}
          </div>
        </div>

        {/* Desktop Reviews */}
        {reviews.map((r, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) reviewRefs.current[i] = el;
            }}
            className={`absolute bg-white/95 shadow-lg rounded-lg p-4 text-sm max-w-xs z-10 ${
              i === 0
                ? "top-[15%] left-[15%]"
                : i === 1
                ? "top-[42%] left-[10%]"
                : i === 2
                ? "top-[57%] right-[15%]"
                : "top-[32%] right-[8%]"
            }`}
          >
            {r.type === "event" ? (
              <div className="flex items-center gap-3">
                <img src={r.avatar} className="w-8 h-8 rounded-full" alt="" />
                <div>
                  <h4 className="font-semibold">{r.title}</h4>
                  <p className="text-gray-500">{r.meta}</p>
                  <div className="flex gap-3 mt-1 text-gray-500 text-xs">
                    <span>👥 {r.stats.people}</span>
                    <span>📍 {r.stats.distance}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <img src={r.avatar} className="w-8 h-8 rounded-full" alt="" />
                <div>
                  <h4 className="font-semibold">{r.name}</h4>
                  <p className="text-gray-500">{r.text}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden relative z-10 w-full max-w-md">
        {/* Mobile Skater Image */}
        <div className="flex justify-center mb-8">
          <img
            ref={skaterRef}
            src={skaterImage}
            alt="Skater"
            className="w-88 h-52 sm:w-60 sm:h-60 drop-shadow-2xl object-contain"
          />
        </div>

        {/* Mobile Main Card */}
        <div
          ref={mainCardRef}
          className="bg-white rounded-xl shadow-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold">{mainCard.title}</h2>
          <p className="text-gray-600 mt-2">{mainCard.meta}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span>👥 {mainCard.stats.people}</span>
            <span>📍 {mainCard.stats.distance}</span>
          </div>
          <div className="flex mt-5">
            {mainCard.avatars.map((a, i) => (
              <img
                key={i}
                src={a}
                alt=""
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white -ml-2 first:ml-0"
              />
            ))}
          </div>
        </div>

        {/* Mobile Reviews */}
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) reviewRefs.current[i] = el;
              }}
              className="bg-white/95 shadow-lg rounded-lg p-4 text-sm"
            >
              {r.type === "event" ? (
                <div className="flex items-center gap-3">
                  <img src={r.avatar} className="w-8 h-8 rounded-full flex-shrink-0" alt="" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold truncate">{r.title}</h4>
                    <p className="text-gray-500 text-xs">{r.meta}</p>
                    <div className="flex gap-3 mt-1 text-gray-500 text-xs">
                      <span>👥 {r.stats.people}</span>
                      <span>📍 {r.stats.distance}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <img src={r.avatar} className="w-8 h-8 rounded-full flex-shrink-0" alt="" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold truncate">{r.name}</h4>
                    <p className="text-gray-500">{r.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}