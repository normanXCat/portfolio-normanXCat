import { cn } from "@/lib/utils";

/**
 * Composant de séparation horizontale simple.
 * 
 * @param props - Les propriétés du composant.
 * @param props.className - Classes CSS additionnelles pour personnaliser le séparateur.
 * @returns Le composant Separator.
 */
export function Separator({ className }: { className?: string }) {
  return <div className={cn("h-[1px] w-full bg-border my-20", className)} />;
}
