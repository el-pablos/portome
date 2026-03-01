import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fungsi utility untuk menggabungkan class names dengan Tailwind CSS
 * Menggunakan clsx untuk conditional classes dan twMerge untuk menghindari konflik
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

