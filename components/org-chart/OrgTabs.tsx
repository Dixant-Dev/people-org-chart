const tabs = ["People", "Position", "Organization", "Others"]

export default function OrgTabs() {
  return (
    <div className="mt-6 flex items-center gap-6 border-b">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          className={`pb-3 text-sm ${
            i === 0
              ? "border-b-2 border-indigo-600 text-indigo-600 font-medium"
              : "text-gray-400"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
