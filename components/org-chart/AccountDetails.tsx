"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import {
  PiUserCircle,
  PiBriefcase,
  PiClock,
  PiMoney,
  PiUsersThree,
  PiCaretRight,
} from "react-icons/pi"

const items = [
  { label: "Personal", icon: PiUserCircle },
  { label: "Work", icon: PiBriefcase },
  { label: "Time", icon: PiClock },
  { label: "Payroll", icon: PiMoney },
  { label: "Workplace", icon: PiUsersThree },
]

// function Row({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="flex justify-between gap-4">
//       <span className="text-gray-500">{label}</span>
//       <span className="font-medium text-gray-900">{value}</span>
//     </div>
//   )
// }

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900">
        {value && value.trim() !== "" ? value : "Not available"}
      </span>
    </div>
  )
}

export default function AccountDetails() {
  return (
    <div className="">
      <p className="mb-3 text-xs tracking-widest text-gray-400">
        ACCOUNT DETAILS
      </p>

      <AccordionPrimitive.Root type="single" collapsible className="space-y-3">
        {items.map(({ label, icon: Icon }) => (
          <AccordionPrimitive.Item
            key={label}
            value={label}
            className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden"
          >
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger
                className="
                  w-full
                  flex items-center justify-between
                  px-4 py-2
                  text-left
                  hover:bg-gray-100
                  transition
                  group
                  cursor-pointer
                "
              >
                <div className="flex items-center gap-3 ">
                  <Icon className="text-green-600 text-sm" />
                  <span className=" text-gray-900">{label}</span>
                </div>

                <PiCaretRight
                  className="
                    text-gray-400 text-sm
                    transition-transform duration-200
                    group-data-[state=open]:rotate-90
                  "
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>

            <AccordionPrimitive.Content
              className="
    px-4 pb-4
    text-sm text-gray-600
    data-[state=open]:animate-accordion-down
    data-[state=closed]:animate-accordion-up
  "
            >
              <div className="pt-2 space-y-2">
                {label === "Personal" && (
                  <>
                    <Row label="Full Name" value="Brett Hill" />
                    <Row label="Date of Birth" value="12 Aug 1994" />
                    <Row label="Gender" value="Male" />
                    <Row label="Nationality" value="German" />
                    <Row label="Marital Status" value="Single" />
                  </>
                )}

                {label === "Work" && (
                  <>
                    <Row label="Employee ID" value="EMP-1013" />
                    <Row label="Department" value="Marketing" />
                    <Row label="Job Title" value="Marketing Associate" />
                    <Row label="Manager" value="Laura Bennett" />
                    <Row label="Employment Type" value="Full-time" />
                  </>
                )}

                {label === "Time" && (
                  <>
                    <Row label="Shift" value="Day Shift" />
                    <Row label="Working Hours" value="9:00 AM – 6:00 PM" />
                    <Row label="Time Zone" value="CET (UTC+1)" />
                    <Row label="Leave Balance" value="14 days" />
                    <Row label="Attendance" value="Present" />
                  </>
                )}

                {label === "Payroll" && (
                  <>
                    <Row label="Salary Band" value="€40,000 – €55,000" />
                    <Row label="Pay Frequency" value="Monthly" />
                    <Row label="Bank Account" value="**** 4837" />
                    <Row label="Tax ID" value="TX-908712" />
                    <Row label="Currency" value="EUR" />
                  </>
                )}

                {label === "Workplace" && (
                  <>
                    <Row label="Office Location" value="Berlin HQ" />
                    <Row label="Floor" value="3rd Floor" />
                    <Row label="Desk Number" value="D-27" />
                    <Row label="Work Mode" value="Hybrid" />
                    <Row label="Assets" value="Laptop, Access Card" />
                  </>
                )}
              </div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    </div>
  )
}
