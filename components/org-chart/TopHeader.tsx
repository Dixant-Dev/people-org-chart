import { Input } from "@/components/ui/input"
import {
  PiDotsNine,
  PiMagnifyingGlass,
  PiQuestion,
  PiBell,
} from "react-icons/pi"

export default function TopHeader() {
  return (
    <header className="h-14 border-b flex items-center pr-6 gap-4 bg-white">
      <div className="h-14 w-14 flex items-center justify-center bg-black">
        <PiDotsNine className="text-white text-xl" />
      </div>

      {/* Breadcrumb */}
      <p className="text-sm text-muted-foreground">
        <span className="text-primary cursor-pointer">Home</span>
        <span className="mx-1">›</span>
        <span>Org Chart</span>
      </p>

      {/* Search */}
      <div className="ml-auto relative w-[360px]">
        <PiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search for action or people" className="pl-9" />
      </div>

      {/* Help */}
      <PiQuestion className="text-lg text-muted-foreground cursor-pointer" />

      {/* Notification */}
      <div className="relative">
        <PiBell className="text-lg text-muted-foreground cursor-pointer" />
        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
      </div>

      {/* Avatar */}
      {/* <div className="h-8 w-8 rounded-full border bg-muted" /> */}
    </header>
  )
}
