import { OrgTreeNode } from "@/types/employee"

export function flattenTree(node: OrgTreeNode, result: OrgTreeNode[] = []) {
  result.push(node)

  if (node.children) {
    node.children.forEach((child) => flattenTree(child, result))
  }

  return result
}
