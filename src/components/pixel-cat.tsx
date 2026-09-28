"use client";

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";

const FRAMES = {
  sit: [
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "  #    #        ",
    " ###  ###       ",
    " ########       ",
    " # #  # #       ",
    " ########       ",
    "  ######   #    ",
    "  ######  ##    ",
    "  ###### ###    ",
    "  ##  ##        ",
    " #### ####      ",
  ],
  sleep: [
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "  #    #        ",
    " ########       ",
    " ########     # ",
    " ####### ###### ",
    "  ############  ",
  ],
  groom: [
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "  #    #        ",
    " ###  ###       ",
    " ########       ",
    " # #  # #       ",
    " ########       ",
    "  ######   #    ",
    " #######  ##    ",
    " ####### ###    ",
    "  ######        ",
    "   #  ##        ",
    "  ### ####      ",
  ],
  walk1: [
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "  #    #        ",
    " ###  ###       ",
    " ########       ",
    " # #  # #       ",
    " ########       ",
    "  ########      ",
    "  ######### #   ",
    "  ######### ##  ",
    "  ##   ##  ###  ",
    " ###  ###       ",
  ],
  walk2: [
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "  #    #        ",
    " ###  ###       ",
    " ########       ",
    " # #  # #       ",
    " ########       ",
    "  ########      ",
    "  #########     ",
    "  #########  #  ",
    "   ##   ##  ##  ",
    "  ###  ### ###  ",
  ],
};

function parseFrame(frameLines: string[]) {
  const paths: string[] = [];
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      if (frameLines[y]?.[x] === "#") {
        paths.push(`M${x} ${y}h1v1h-1z`);
      }
    }
  }
  return paths.join("");
}

const PARSED_FRAMES = {
  sit: parseFrame(FRAMES.sit),
  sleep: parseFrame(FRAMES.sleep),
  groom: parseFrame(FRAMES.groom),
  walk1: parseFrame(FRAMES.walk1),
  walk2: parseFrame(FRAMES.walk2),
};

type ActionState = "sit" | "sleep" | "groom" | "walk";

function useCatVisible() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("cat-visible-changed", callback);
      return () => window.removeEventListener("cat-visible-changed", callback);
    },
    () => {
      const stored = localStorage.getItem("cat-visible");
      return stored !== null ? stored === "true" : true;
    },
    () => true
  );
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

function useLightboxOpen() {
  return useSyncExternalStore(
    (callback) => {
      const observer = new MutationObserver(callback);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-lightbox-open"],
      });
      return () => observer.disconnect();
    },
    () => document.documentElement.hasAttribute("data-lightbox-open"),
    () => false
  );
}

export function PixelCat() {
  const isVisible = useCatVisible();
  const isLightboxOpen = useLightboxOpen();
  const prefersReducedMotion = usePrefersReducedMotion();

  const [action, setAction] = useState<ActionState>("sit");
  const [walkFrame, setWalkFrame] = useState<"walk1" | "walk2">("walk1");
  const [facingRight, setFacingRight] = useState(true);

  const [showMiaou, setShowMiaou] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  const catRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(100);
  const speedRef = useRef(50); // px per second
  const directionRef = useRef(1); // 1 for right, -1 for left
  const rAFRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const actionTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const walkFrameTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isInteractingRef = useRef(false);

  // Position initiale
  useEffect(() => {
    xRef.current = window.innerWidth / 2;
  }, []);

  // Machine à états aléatoire
  useEffect(() => {
    if (prefersReducedMotion) return;

    const cycleAction = () => {
      if (isInteractingRef.current) {
        actionTimerRef.current = setTimeout(cycleAction, 3000);
        return;
      }

      const states: ActionState[] = ["sit", "sleep", "groom", "walk", "walk"];
      const nextState = states[Math.floor(Math.random() * states.length)];

      if (nextState === "walk") {
        directionRef.current = Math.random() > 0.5 ? 1 : -1;
        setFacingRight(directionRef.current === 1);
      }

      setAction(nextState);

      const nextDuration = 3000 + Math.random() * 5000; // 3-8s
      actionTimerRef.current = setTimeout(cycleAction, nextDuration);
    };

    actionTimerRef.current = setTimeout(cycleAction, 2000);

    return () => {
      if (actionTimerRef.current) clearTimeout(actionTimerRef.current);
    };
  }, [prefersReducedMotion]);

  // Boucle de déplacement
  useEffect(() => {
    const loop = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (action === "walk" && catRef.current && !isInteractingRef.current) {
        let newX = xRef.current + speedRef.current * directionRef.current * dt;

        // Limites écran
        if (newX < 0) {
          newX = 0;
          directionRef.current = 1;
          setFacingRight(true);
        } else if (newX > window.innerWidth - 64) {
          newX = window.innerWidth - 64;
          directionRef.current = -1;
          setFacingRight(false);
        }

        xRef.current = newX;
        catRef.current.style.transform = `translateX(${newX}px) scaleX(${facingRight ? 1 : -1})`;
      } else if (catRef.current) {
        catRef.current.style.transform = `translateX(${xRef.current}px) scaleX(${facingRight ? 1 : -1})`;
      }

      rAFRef.current = requestAnimationFrame(loop);
    };

    rAFRef.current = requestAnimationFrame(loop);
    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, [action, facingRight]);

  // Animation cycle de marche
  useEffect(() => {
    if (action === "walk" && !prefersReducedMotion) {
      const toggle = () => {
        setWalkFrame((f) => (f === "walk1" ? "walk2" : "walk1"));
      };
      walkFrameTimerRef.current = setInterval(toggle, 200);
    }
    return () => {
      if (walkFrameTimerRef.current) clearInterval(walkFrameTimerRef.current);
    };
  }, [action, prefersReducedMotion]);

  const handleInteraction = useCallback((type: "click" | "hover", clientX?: number) => {
    if (type === "hover" && !prefersReducedMotion && clientX !== undefined) {
      if (action === "sleep") return;
      const catRect = catRef.current?.getBoundingClientRect();
      if (catRect) {
        const catCenter = catRect.left + catRect.width / 2;
        const newFacing = clientX > catCenter;
        if (newFacing !== facingRight) {
          setFacingRight(newFacing);
          if (action === "walk") directionRef.current = newFacing ? 1 : -1;
        }
      }
    } else if (type === "click") {
      isInteractingRef.current = true;
      setAction("sit");
      setShowMiaou(true);
      if (!prefersReducedMotion) setIsJumping(true);

      setTimeout(() => setIsJumping(false), 300);
      setTimeout(() => {
        setShowMiaou(false);
        isInteractingRef.current = false;
      }, 1500);
    }
  }, [action, facingRight, prefersReducedMotion]);

  const toggleVisible = () => {
    const next = !isVisible;
    localStorage.setItem("cat-visible", String(next));
    window.dispatchEvent(new Event("cat-visible-changed"));
  };

  if (isLightboxOpen) return null;

  const currentAction = prefersReducedMotion ? "sit" : action;
  let currentFramePath = PARSED_FRAMES.sit;
  if (currentAction === "sleep") currentFramePath = PARSED_FRAMES.sleep;
  else if (currentAction === "groom") currentFramePath = PARSED_FRAMES.groom;
  else if (currentAction === "walk") currentFramePath = PARSED_FRAMES[walkFrame];

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "0",
        pointerEvents: "none",
        zIndex: 50,
        display: isVisible ? "block" : "none",
      }}
    >
      <div
        ref={catRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "64px",
          height: "64px",
          pointerEvents: "auto",
          cursor: "pointer",
          willChange: "transform",
          transition: isJumping ? "bottom 0.15s ease-out" : "bottom 0.15s ease-in",
          marginBottom: isJumping ? "20px" : "0",
        }}
        onClick={() => handleInteraction("click")}
        onMouseMove={(e) => handleInteraction("hover", e.clientX)}
      >
        <svg
          viewBox="0 0 16 16"
          width="100%"
          height="100%"
          style={{
            color: "currentColor",
            shapeRendering: "crispEdges",
            imageRendering: "pixelated",
          }}
        >
          <path d={currentFramePath} fill="currentColor" />
        </svg>

        {showMiaou && (
          <div
            style={{
              position: "absolute",
              top: "-24px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.8)",
              color: "#fff",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "12px",
              whiteSpace: "nowrap",
              fontFamily: "monospace",
              pointerEvents: "none",
              animation: "cat-fade 1.5s ease-out forwards",
            }}
          >
            miaou!
          </div>
        )}

        {currentAction === "sleep" && !showMiaou && (
          <div
            style={{
              position: "absolute",
              top: "-16px",
              right: "0",
              fontSize: "14px",
              pointerEvents: "none",
              color: "currentColor",
              opacity: 0.6,
              fontFamily: "sans-serif",
              animation: "cat-pulse 2s infinite ease-in-out",
            }}
          >
            zzz
          </div>
        )}
      </div>

      <style>{`
        @keyframes cat-fade {
          0% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -10px); }
        }
        @keyframes cat-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.9) translateY(0); }
          50% { opacity: 0.8; transform: scale(1.1) translateY(-4px); }
        }
      `}</style>

      {/* Bouton discret pour masquer / afficher le chat */}
      <button
        onClick={toggleVisible}
        title="Afficher/masquer le chat"
        style={{
          position: "fixed",
          bottom: "12px",
          left: "12px",
          pointerEvents: "auto",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          opacity: 0.35,
          transition: "opacity 0.2s",
          zIndex: 51,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
      >
        🐱
      </button>
    </div>
  );
}
