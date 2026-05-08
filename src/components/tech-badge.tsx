import { cn } from "@/lib/utils";

interface TechBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function TechBadge({ children, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "px-2 py-0.5 text-xs font-medium rounded-full border border-white/10 bg-white/5 text-zinc-300",
        className
      )}
    >
      {children}
    </span>
  );
}
