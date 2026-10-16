/**
 * The visitor's operating system, for offering the right download. `null` when
 * it cannot be told; callers then fall back to phone vs computer
 * (`isMobileDevice` in `./deeplinks`).
 */

export type Platform = "macos" | "windows" | "linux" | "android" | "ios"

export const DESKTOP_PLATFORMS: readonly Platform[] = ["macos", "windows", "linux"]
export const MOBILE_PLATFORMS: readonly Platform[] = ["android", "ios"]

export const PLATFORM_LABELS: Record<Platform, string> = {
  macos: "macOS",
  windows: "Windows",
  linux: "Linux",
  android: "Android",
  ios: "iPhone & iPad",
}

export function detectPlatform(): Platform | null {
  const ua = navigator.userAgent
  // Android and iOS first: their user agents also mention Linux and Mac OS.
  if (/Android/i.test(ua)) return "android"
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios"
  // iPadOS reports itself as a Mac; the touch points give it away.
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return "ios"
  // ChromeOS says Linux too, but runs neither the AppImage nor the .deb as-is.
  if (/CrOS/.test(ua)) return null

  const hinted = (navigator as { userAgentData?: { platform?: string } }).userAgentData?.platform
  const platform = (hinted || navigator.platform || "").toLowerCase()
  if (platform.startsWith("mac")) return "macos"
  if (platform.startsWith("win")) return "windows"
  if (platform.startsWith("android")) return "android"
  if (platform.includes("linux") || platform.includes("x11")) return "linux"

  if (/Mac OS X|Macintosh/.test(ua)) return "macos"
  if (/Windows/.test(ua)) return "windows"
  if (/Linux|X11/.test(ua)) return "linux"
  return null
}
