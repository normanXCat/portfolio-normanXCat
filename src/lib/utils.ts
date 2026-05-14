import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne les classes CSS en utilisant clsx et tailwind-merge.
 * 
 * @param inputs - Les classes CSS à fusionner.
 * @returns Une chaîne de caractères contenant les classes fusionnées.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
