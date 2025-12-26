import axiosClient from "./axiosClient"
import { PEOPLE_CHART_ENDPOINT } from "@/constants/api"

export async function fetchOrgChartApi(employeeId: number, token: string) {
  const res = await axiosClient.get(`${PEOPLE_CHART_ENDPOINT}/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data.tree
}
