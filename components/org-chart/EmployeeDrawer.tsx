"use client"

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
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40
          bg-black/30
          transition-opacity
          ${employee ? "opacity-100" : "pointer-events-none opacity-0"}
        `}
      />

      <aside
        className={`
    fixed top-0 right-0 z-50 h-full w-[350px]
    bg-white shadow-xl
    transition-transform duration-300 ease-out
    flex flex-col
    ${employee ? "translate-x-0" : "translate-x-full"}
  `}
      >
        {employee && (
          <>
            <div className="flex justify-between bg-indigo-600 pl-2 pt-2">
              <button
                onClick={onClose}
                className=" h-9 w-9  text-white text-xl cursor-pointer"
              >
                <PiArrowLineRight />
              </button>

              <div className=" flex items-center gap-2">
                <button className="h-8 w-8 rounded-lg text-white bg-white/20 flex items-center justify-center cursor-pointer">
                  <PiPencilSimple />
                </button>
                <button className="h-9 w-9 text-white text-xl rounded-lg flex items-center justify-center">
                  <PiDotsThreeVertical />
                </button>
              </div>
            </div>

            <div className="bg-indigo-600 text-white px-6 flex flex-col justify-center">
              <div className="flex justify-center">
                <img
                  src={employee.pic || ""}
                  alt={employee.target}
                  className="h-18 w-18 rounded-full border-2 border-white"
                />
              </div>

              <h2 className="mt-4 text-center text-lg font-semibold">
                {employee.target.trim()}
              </h2>

              <p className="mt-1 text-center text-sm text-white/80">
                {employee.relationship_id || "Role unavailable"}
              </p>

              <div className="mt-1 text-sm">
                <div className="flex justify-center items-center gap-2">
                  <PiMapPinLight />
                  <span className="text-sm">Berlin (1010-0001)</span>
                </div>

                <div className="flex justify-center items-center gap-2">
                  <PiClockUser />
                  <span>Monday, 1:05 PM (Local Time)</span>
                </div>
              </div>

              <div className="mt-4 mb-4 flex justify-center gap-6">
                {[<PiPhone />, <PiEnvelope />, <PiTreeView />].map(
                  (Icon, i) => (
                    <div
                      key={i}
                      className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-xl cursor-pointer"
                    >
                      {Icon}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-white">
              <AccountDetails />
            </div>
          </>
        )}
      </aside>
    </>
  )
}
