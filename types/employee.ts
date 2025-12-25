export interface OrgTreeNode {
  id?: number
  employee_id: number
  target: string
  pic: string | null
  relationship_id?: string
  effective_start_date?: string
  effective_end_date?: string
  direct_reports: number
  indirect_reports: number
  children: OrgTreeNode[]
}
