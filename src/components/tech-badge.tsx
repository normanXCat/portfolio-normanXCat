import { cn } from "@/lib/utils";
import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandNodejs,
  IconDatabase,
  IconApi,
  IconBrandLaravel,
  IconBrandPrisma,
  IconBrandVite,
  IconBrandMysql,
  IconBrandDocker,
  IconBrain,
} from "@tabler/icons-react";

const techIcons: Record<string, React.ElementType> = {
  "Next.js": IconBrandNextjs,
  React: IconBrandReact,
  "React + Vite": IconBrandVite, // Or IconBrandReact
  TypeScript: IconBrandTypescript,
  "Tailwind CSS": IconBrandTailwind,
  "Node.js": IconBrandNodejs,
  "Express Js": IconBrandNodejs,
  PostgreSQL: IconDatabase,
  MySQL: IconBrandMysql,
  "API REST": IconApi,
  Laravel: IconBrandLaravel,
  Prisma: IconBrandPrisma,
  Docker: IconBrandDocker,
  "Machine Learning": IconBrain,
};

interface TechBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function TechBadge({ children, className }: TechBadgeProps) {
  const text = typeof children === "string" ? children : "";
  const IconComponent = techIcons[text];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold tracking-wider rounded-md border border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300",
        className,
      )}
    >
      {IconComponent && <IconComponent size={14} stroke={2} />}
      {children}
    </span>
  );
}
