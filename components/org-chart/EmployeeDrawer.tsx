"use client"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

import { OrgTreeNode } from "@/types/employee"
import {
  PiArrowLineRight,
  PiPencilSimple,
  PiDotsThreeVertical,
  PiMapPinLight,
  PiClockUser,
  PiPhone,
  PiEnvelope,
  PiTreeView,
} from "react-icons/pi"
import AccountDetails from "./AccountDetails"

export default function EmployeeDrawer({
  employee,
  onClose,
}: {
  employee: OrgTreeNode | null
  onClose: () => void
}) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40
          bg-black/30 backdrop-blur-sm
          transition-opacity duration-300
          ${employee ? "opacity-20" : "pointer-events-none opacity-0"}
        `}
      />

      {/* Drawer */}
      <aside
        className={`
    fixed top-0 right-0 z-50 h-full w-[380px]
    bg-white shadow-xl
    transition-transform duration-300 ease-out
    flex flex-col
    ${employee ? "translate-x-0" : "translate-x-full"}
  `}
      >
        {employee && (
          <>
            {/* 🔒 STICKY TOP CONTROLS */}
            <div className="sticky top-0 z-50 bg-indigo-600">
              {/* Top-left back */}
              <button
                onClick={onClose}
                className="absolute h-9 w-9 left-6 top-6 text-white text-xl"
                aria-label="Close drawer"
              >
                <PiArrowLineRight />
              </button>

              {/* Top-right actions */}
              <div className="absolute right-6 top-6 flex items-center gap-2">
                <button
                  aria-label="Edit"
                  className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center"
                >
                  <PiPencilSimple />
                </button>

                <button
                  aria-label="More"
                  className="h-9 w-9 rounded-lg flex items-center justify-center"
                >
                  <PiDotsThreeVertical />
                </button>
              </div>
            </div>

            {/* 🧱 SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto">
              {/* Purple Header */}
              <div className="relative bg-indigo-600 text-white px-6 pt-20 pb-8">
                {/* Avatar */}
                <div className="flex justify-center">
                  {/* <div className="h-24 w-24 rounded-full border-2 border-white" /> */}
                  <img
                    src={employee.pic || ""}
                    alt={employee.target}
                    className="h-24 w-24 rounded-full border-2 border-white"
                  />
                </div>

                {/* Name */}
                <h2 className="mt-6 text-center text-3xl font-semibold">
                  {employee.target.trim()}
                </h2>

                {/* Role */}
                <p className="mt-1 text-center text-base text-white/80">
                  {employee.direct_reports || "Software Engineer"}
                </p>

                {/* Meta info */}
                <div className="mt-5 space-y-2 text-sm text-white/90">
                  <div className="flex justify-center items-center gap-2">
                    <PiMapPinLight className="text-lg" />
                    <span>Berlin (1010-0001)</span>
                  </div>

                  <div className="flex justify-center items-center gap-2">
                    <PiClockUser className="text-lg" />
                    <span>Monday, 1:05 PM (Local Time)</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-7 flex justify-center gap-6">
                  {[<PiPhone />, <PiEnvelope />, <PiTreeView />].map(
                    (Icon, i) => (
                      <div
                        key={i}
                        className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-xl"
                      >
                        {Icon}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* White Content */}
              <AccountDetails />
            </div>
          </>
        )}
      </aside>
    </>
  )
}
