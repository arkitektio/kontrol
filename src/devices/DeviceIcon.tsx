import { Laptop, Smartphone, Tablet } from "lucide-react"

/** Icon guessed from the device name: phone, tablet, or a laptop for everything else. */
export function DeviceIcon({ name, className = "h-5 w-5" }: { name?: string | null; className?: string }) {
  const lowerName = name?.toLowerCase() || ""
  if (lowerName.includes("phone") || lowerName.includes("mobile")) {
    return <Smartphone className={className} />
  }
  if (lowerName.includes("tablet") || lowerName.includes("ipad")) {
    return <Tablet className={className} />
  }
  return <Laptop className={className} />
}
