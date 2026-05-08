"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 h-[70vh] w-[3px] z-50 pointer-events-none hidden md:block">
      {/* Background Glass Track */}
      <div className="absolute inset-0 bg-white/5 rounded-full backdrop-blur-sm border border-white/5" />
      
      {/* Progress Track (Dull) */}
      <div className="absolute inset-0 bg-zinc-800/50 rounded-full" />
      
      {/* Animated Progress Line */}
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="relative h-full w-full bg-gradient-to-b from-zinc-400 via-zinc-200 to-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]"
      >
        {/* Glowing Head Indicator */}
        <motion.div 
          style={{ top: "100%" }}
          className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8),0_0_40px_rgba(255,255,255,0.4)]"
        />
      </motion.div>
    </div>
  );
}
