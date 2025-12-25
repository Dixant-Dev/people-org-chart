import { PiCalendarDots, PiGear } from "react-icons/pi"
import { FiChevronDown } from "react-icons/fi"

export default function OrgHeader() {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Org Chart</h1>
        <p className="mt-1 text-sm text-gray-500 max-w-xl">
          This is a collection of all hierarchy in the system, you can view,
          modify existing datasets or create new ones based on your preferences.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-lg bg-gray-500 text-white px-3 py-2 text-sm cursor-pointer hover:bg-gray-600">
          <PiCalendarDots />
          Today
          <FiChevronDown />
        </button>

        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white cursor-pointer hover:bg-indigo-700">
          <PiGear />
          Configure
        </button>
      </div>
    </div>
  )
}
