"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const galleryImages = [
  { label: "Climbing", src: "/images/climbing.png", alt: "Climbing image" },
  { label: "Mountain1", src: "/images/Mountain.png", alt: "Mountain1 image" },
  { label: "Lake", src: "/images/lake.png", alt: "Lake image" },
  { label: "Mountain", src: "/images/mountain2.png", alt: "Mountain image" },
  { label: "Snowboard", src: "/images/snowboard.png", alt: "Snowboard image" },
  { label: "First", src: "/images/first.png", alt: "First image" },
  { label: "Image", src: "/images/img.png", alt: " image" },
  { label: "Image2", src: "/images/img2.png", alt: " image2" },
  { label: "Image3", src: "/images/img3.png", alt: " image3" },
  { label: "Image4", src: "/images/img4.png", alt: " image4" },
  { label: "Image5", src: "/images/img5.png", alt: " image5" },
  { label: "Image6", src: "/images/img6.png", alt: " image6" },
  { label: "Image7", src: "/images/img7.png", alt: " image7" },
  { label: "Image10", src: "/images/img10.png", alt: " image10" },
  { label: "Image11", src: "/images/img11.png", alt: " image11" },
  { label: "Image12", src: "/images/img12.png", alt: " image12" },
  { label: "Image13", src: "/images/img13.png", alt: " image13" },
  { label: "Image14", src: "/images/img14.png", alt: " image14" },
  { label: "Image15", src: "/images/img15.png", alt: " image15" },
  { label: "Image16", src: "/images/img16.png", alt: " image16" },
  { label: "Image17", src: "/images/img17.png", alt: " image17" },
];

export default function Gallery() {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const [itemWidth, setItemWidth] = useState(460); // default

  const scrollSpeed = 40;
  const gap = 24;
  const numItems = galleryImages.length;

  useEffect(() => {
    // Measure item width dynamically for responsive layout
    const firstItem = topRowRef.current?.querySelector<HTMLDivElement>("div");
    if (firstItem) setItemWidth(firstItem.offsetWidth);

    const rowWidth = (itemWidth + gap) * numItems;
    let lastTime = performance.now();
    let topPos = 0;
    let bottomPos = -rowWidth;

    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      topPos -= scrollSpeed * dt;
      if (topPos <= -rowWidth) topPos += rowWidth;
      if (topRowRef.current) topRowRef.current.style.transform = `translateX(${topPos}px)`;

      bottomPos += scrollSpeed * dt;
      if (bottomPos >= 0) bottomPos -= rowWidth;
      if (bottomRowRef.current) bottomRowRef.current.style.transform = `translateX(${bottomPos}px)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [itemWidth]);

  return (
    <section id="gallery" className="py-16 text-gray-900 overflow-hidden">
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
      <div className="max-w-10xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 Staatliches"
        >
          Gallery
        </motion.h2>

        {/* Top row — left scroll */}
        <div
          ref={topRowRef}
          className="flex w-max gap-6 select-none cursor-grab mb-8 mt-20"
          style={{ willChange: "transform" }}
        >
          {[...galleryImages, ...galleryImages].map((item, i) => (
            <motion.div
              key={`top-${i}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative flex-shrink-0 rounded-lg shadow-lg overflow-hidden w-[min(80vw,460px)] aspect-[23/15]"
            >
              <Image src={item.src} alt={item.alt} fill className="object-cover" priority={i < 3} />
            </motion.div>
          ))}
        </div>

        {/* Bottom row — right scroll (reverse) */}
        <div
          ref={bottomRowRef}
          className="flex flex-row-reverse w-max gap-6 select-none cursor-grab"
          style={{ willChange: "transform" }}
        >
          {[...galleryImages.slice().reverse(), ...galleryImages.slice().reverse()].map(
            (item, i) => (
              <motion.div
                key={`bottom-${i}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative flex-shrink-0 rounded-lg shadow-lg overflow-hidden w-[min(80vw,460px)] aspect-[23/15]"
              >
                <Image src={item.src} alt={item.alt} fill className="object-cover" priority={i < 3} />
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
