import {
  PiHouseFill,
  PiUsers,
  PiIdentificationCard,
  PiFileText,
  PiGear,
} from "react-icons/pi"

const items = [
  { icon: PiHouseFill, active: true },
  { icon: PiUsers },
  { icon: PiIdentificationCard },
  { icon: PiFileText },
  { icon: PiGear },
]

export default function LeftSidebar() {
  return (
    <aside className="w-14 border-r bg-white flex flex-col items-center py-4 gap-6">
      {items.map(({ icon: Icon, active }, i) => (
        <div
          key={i}
          className={`
            h-10 w-10
            flex items-center justify-center
            rounded-lg
            cursor-pointer
            ${
              active
                ? "bg-gray-100 text-gray-900"
                : "text-gray-400 hover:bg-gray-50"
            }
          `}
        >
          <Icon className="text-xl" />
        </div>
      ))}
    </aside>
  )
}
