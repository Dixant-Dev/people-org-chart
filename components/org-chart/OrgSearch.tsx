"use client"

import { PiMagnifyingGlass, PiPencilSimpleLine } from "react-icons/pi"
import { OrgTreeNode } from "@/types/employee"
import { useState } from "react"

export default function OrgSearch({
  value,
  onChange,
  selectedEmployee,
  onClearSelected,
  suggestions,
  onSelectEmployee,
}: {
  value: string
  onChange: (v: string) => void
  selectedEmployee: string | null
  onClearSelected: () => void
  suggestions: OrgTreeNode[]
  onSelectEmployee: (emp: OrgTreeNode) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative w-full rounded-xl border bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <PiMagnifyingGlass className="text-gray-400 text-lg" />

        {/* Selected employee pill */}
        {selectedEmployee && (
          <div className="flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
            <span>{selectedEmployee}</span>
            <button onClick={onClearSelected} className="hover:text-indigo-900">
              <PiPencilSimpleLine />
            </button>
          </div>
        )}

        {/* Input */}
        <input
          type="text"
          placeholder="Search employee"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => {
            setTimeout(() => setOpen(false), 150)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const exactMatch = suggestions.find(
                (emp) =>
                  emp.target.trim().toLowerCase() === value.trim().toLowerCase()
              )

              if (exactMatch) {
                onSelectEmployee(exactMatch)
                onChange("")
                setOpen(false)
              }
            }

            if (e.key === "Escape") {
              setOpen(false)
            }
          }}
          className="
            flex-1
            bg-transparent
            outline-none
            text-sm
            text-gray-900
            placeholder:text-gray-400
          "
        />
      </div>

      {/* Suggestions */}
      {open && suggestions.length > 0 && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-xl border bg-white shadow-lg max-h-64 overflow-auto">
          {suggestions.map((emp) => (
            <button
              key={emp.employee_id}
              onClick={() => {
                onSelectEmployee(emp)
                onChange("")
                setOpen(false)
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50"
            >
              <p className="text-sm font-medium">{emp.target}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
