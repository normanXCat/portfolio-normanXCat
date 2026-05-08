import { cn } from "@/lib/utils";

export function Separator({ className }: { className?: string }) {
  return (
    <div className={cn("h-px w-full bg-zinc-800/50 my-12", className)} />
  );
}
