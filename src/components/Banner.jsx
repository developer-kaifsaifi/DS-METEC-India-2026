

import { motion } from "motion/react";

export default function Banner() {
  return (
    <section className="relative w-full h-[385px] font-ds overflow-hidden">

      {/* Background Image */}
      <motion.img
        src="/Banner.png"
        alt="METEC India 2026"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#00243d34]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-36 text-white">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="text-5xl md:text-[88px] font-light tracking-wide leading-tight"
        >
          METEC India 2026
        </motion.h1>

        {/* Event Details */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.45,
            ease: "easeOut",
          }}
          className="mt-7 text-base md:text-[22px] font-bold"
        >
          Hall 3 · Booth F21 · Mumbai · 30 November – 2 December
        </motion.p>

      </div>
    </section>
  );
}
