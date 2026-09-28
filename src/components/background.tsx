/**
 * Fond décoratif élégant — lueurs douces façon « aurore » en dérive lente (transform),
 * sublimées par un grain ultra-fin feTurbulence (sans banding de dégradé).
 * 100% CSS/SVG léger, aucun canvas, aucune librairie, respecte prefers-reduced-motion.
 */
export function Background() {
  return (
    <>
      {/* Lueurs douces diffuses asymétriques */}
      <div className="aurora-container" aria-hidden="true">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
      </div>

      {/* Grain fin feTurbulence */}
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
