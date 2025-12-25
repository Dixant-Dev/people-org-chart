export interface OrgTreeNode {
  employee_id: number
  target: string
  pic: string | null
  direct_reports: number
  indirect_reports: number
  children: OrgTreeNode[]
}
