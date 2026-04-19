import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDriveImageUrl(url: string) {
  if (!url) return ''
  // Transform "view" or "open" links to direct source links for next/image
  const fileId = url.match(/[-\w]{25,}/)?.[0]
  if (fileId) {
    return `https://drive.google.com/uc?id=${fileId}&export=view`
  }
  return url
}
