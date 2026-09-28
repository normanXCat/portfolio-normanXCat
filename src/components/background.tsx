/**
 * Fond décoratif fixe — grille fine avec masque radial et lueur accent.
 * Vague SVG lente en bas de page.
 * Rendu purement CSS/SVG, aucune dépendance JS.
 */
export function Background() {
  return (
    <>
      {/* Grille + lueur */}
      <div className="grid-background" aria-hidden="true" />

      {/* Vague SVG lente */}
      <div className="wave-container" aria-hidden="true">
        <svg
          className="wave-svg"
          viewBox="0 0 2400 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 C1400,100 1600,20 1800,60 C2000,100 2200,20 2400,60 L2400,120 L0,120 Z"
            fill="var(--accent)"
            fillOpacity="0.06"
          />
          <path
            d="M0,80 C150,40 350,100 600,80 C850,60 1050,100 1200,80 C1350,60 1550,100 1800,80 C2050,60 2250,100 2400,80 L2400,120 L0,120 Z"
            fill="var(--accent)"
            fillOpacity="0.04"
          />
        </svg>
      </div>
    </>
  );
}
