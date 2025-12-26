"use client"

import { OrgTreeNode } from "@/types/employee"
import { useEffect, useRef, useState } from "react"
import { PiIdentificationBadge, PiCaretDown, PiCaretUp } from "react-icons/pi"

export default function OrgNode({
  node,
  onSelect,
}: {
  node: OrgTreeNode
  onSelect?: (node: OrgTreeNode) => void
}) {
  const [expanded, setExpanded] = useState(true)
  const firstChildRef = useRef<HTMLDivElement>(null)
  const lastChildRef = useRef<HTMLDivElement>(null)
  const [lineStyle, setLineStyle] = useState({
    left: 0,
    width: 0,
  })

  const hasChildren = node.children && node.children.length > 0

  useEffect(() => {
    if (!expanded) return
    if (!firstChildRef.current || !lastChildRef.current) return

    const first = firstChildRef.current.getBoundingClientRect()
    const last = lastChildRef.current.getBoundingClientRect()
    const parent = firstChildRef.current.parentElement!.getBoundingClientRect()

    const start = first.left + first.width / 2 - parent.left
    const end = last.left + last.width / 2 - parent.left

    setLineStyle({
      left: start,
      width: end - start,
    })
  }, [node.children.length, expanded])

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={(e) => {
          e.stopPropagation()
          onSelect?.(node)
        }}
        className="
          w-[297px] h-[100px]
          rounded-[8px]
          border border-[#DBDBDB]
          bg-white
          pt-[18px] pr-[14px] pb-[18px] pl-[14px]
          flex items-center gap-[10px]
          cursor-pointer
          hover:shadow-sm
          transition
        "
      >
        <img
          src={node.pic || null}
          alt={node.target?.trim() || "Unnamed Employee"}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-gray-900">
              {node.target?.trim() || "Unnamed Employee"}
            </p>
            <PiIdentificationBadge className="text-indigo-600" />
          </div>

          <p className="text-xs text-gray-500 mt-1">
            {node.relationship_id || "Role unavailable"}
          </p>

          <p className="text-xs text-gray-900 mt-2">
            {node.direct_reports} / {node.indirect_reports}
          </p>
        </div>
      </div>

      {hasChildren && (
        <>
          <div className="h-6 w-px bg-gray-300" />

          <button
            onClick={(e) => {
              e.stopPropagation()
              setExpanded((v) => !v)
            }}
            className="
        flex items-center gap-2
        px-4 py-1
        rounded-full
        border border-gray-300
        bg-white
        text-xs text-gray-700
        hover:bg-gray-50
        shadow-sm cursor-pointer
      "
          >
            <span>Contains {node.children.length}</span>
            {expanded ? <PiCaretUp /> : <PiCaretDown />}
          </button>

          {expanded && <div className="h-6 w-px bg-gray-300" />}

          {expanded && (
            <div className="relative flex justify-center">
              {node.children.length > 1 && (
                <div
                  className="absolute top-0 h-px bg-gray-300"
                  style={{
                    left: lineStyle.left,
                    width: lineStyle.width,
                  }}
                />
              )}

              <div className="flex gap-12 relative">
                {node.children.map((child, index) => (
                  <div
                    key={child.employee_id}
                    ref={
                      index === 0
                        ? firstChildRef
                        : index === node.children.length - 1
                        ? lastChildRef
                        : null
                    }
                    className="flex flex-col items-center relative"
                  >
                    <div className="h-6 w-px bg-gray-300" />

                    <OrgNode node={child} onSelect={onSelect} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
