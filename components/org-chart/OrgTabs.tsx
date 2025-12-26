import { PiCaretDown } from "react-icons/pi"

const tabs = ["People", "Position", "Organization", "Others"]

export default function OrgTabs() {
  return (
    <div className="mt-4 flex items-center gap-8 ">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          className={`
            pb-3 text-base transition
            ${
              i === 0
                ? "text-indigo-600 font-medium"
                : "text-gray-400 hover:text-gray-600"
            }
            flex items-center gap-1 cursor-pointer
          `}
        >
          {tab}
          {tab === "Others" && (
            <span className="text-gray-400 text-sm">
              <PiCaretDown />
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
