import { cn } from "@/lib/utils";

export function Separator({ className }: { className?: string }) {
  return <div className={cn("h-[1px] w-full bg-border my-20", className)} />;
}
