type NavItem = {
  label: string;
  href: string;
};

/**
 * Composant de navigation à ancres.
 * Affiche les liens vers les sections de la page, dans l'ordre de lecture.
 *
 * @param props - Les propriétés du composant.
 * @param props.data - La liste des liens de navigation (libellé + ancre).
 * @returns Le composant Nav.
 */
export function Nav({ data }: { data: NavItem[] }) {
  return (
    <nav
      aria-label="Navigation principale"
      className="sticky top-0 z-40 -mx-6 mb-16 border-b border-border bg-background/80 backdrop-blur-md"
    >
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3 pl-6 pr-20 lg:pr-6 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
        {data.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="text-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
