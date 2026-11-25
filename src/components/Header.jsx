
import { motion } from "motion/react";

export default function Header() {
  return (
    <header className="w-full h-19 bg-white border-b border-[#dce5eb] flex items-center px-8 md:px-12">

      <motion.img
        src={`${import.meta.env.BASE_URL}icon.svg`}
        alt="Dassault Systèmes"
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="h-10 w-auto object-contain"
      />

    </header>
  );
}
