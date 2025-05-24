import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns the correct URL for an image, accounting for the base URL in production
 * This ensures images work correctly when deployed to GitHub Pages
 * @param path The image path relative to the public folder (e.g., 'logo.png')
 * @returns The corrected path with base URL if needed
 */
export function getImageUrl(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Use import.meta.env.BASE_URL to get the base URL configured in vite.config.ts
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
