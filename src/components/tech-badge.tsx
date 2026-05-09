import { cn } from "@/lib/utils";

interface TechBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function TechBadge({ children, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-200/50 dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
