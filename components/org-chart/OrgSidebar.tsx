import { OrgTreeNode } from "@/types/employee"

export default function OrgSidebar({
  employee,
}: {
  employee: OrgTreeNode | null
}) {
  return (
    <aside className="w-80 border-l p-4">
      {!employee && (
        <p className="text-gray-500">Click a person to view details</p>
      )}

      {employee && (
        <>
          <img
            src={employee.pic || ""}
            className="h-20 w-20 rounded-full mb-4"
          />
          <h2 className="font-semibold text-lg">{employee.target.trim()}</h2>
          <p className="text-sm mt-2">
            Direct Reports: {employee.direct_reports}
          </p>
          <p className="text-sm">
            Indirect Reports: {employee.indirect_reports}
          </p>
        </>
      )}
    </aside>
  )
}
