import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fungsi utility untuk menggabungkan class names dengan Tailwind CSS
 * Menggunakan clsx untuk conditional classes dan twMerge untuk menghindari konflik
 * 
 * @param {...any} inputs - Class names yang akan digabungkan
 * @returns {string} - Class names yang sudah digabungkan dan di-merge
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

