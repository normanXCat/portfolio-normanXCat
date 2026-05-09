"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        const nextTheme = isDark ? "light" : "dark";

        // @ts-ignore
        if (!document.startViewTransition) {
          setTheme(nextTheme);
          return;
        }

        const x = e.clientX;
        const y = e.clientY;

        document.documentElement.style.setProperty("--x", `${x}px`);
        document.documentElement.style.setProperty("--y", `${y}px`);

        // @ts-ignore
        document.startViewTransition(() => {
          flushSync(() => {
            setTheme(nextTheme);
          });
        });
      }}
      className="fixed top-6 right-6 z-[60] p-3 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/5 text-zinc-400 hover:text-white transition-all shadow-xl hover:shadow-white/5"
      aria-label="Changer de thème"
    >
      {isDark ? (
        <IconSun size={20} stroke={1.5} />
      ) : (
        <IconMoon size={20} stroke={1.5} className="text-zinc-900" />
      )}
    </motion.button>
  );
}
