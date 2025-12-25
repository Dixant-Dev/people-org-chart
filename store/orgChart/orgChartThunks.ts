// store/orgChart/orgChartThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchOrgChartApi } from "@/services/orgChartApi"

export const fetchOrgChart = createAsyncThunk(
  "orgChart/fetch",
  async (
    { employeeId, token }: { employeeId: number; token: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("🔥 THUNK EXECUTED")
      const data = await fetchOrgChartApi(employeeId, token)
      console.log("🔥 DATA RETURNED FROM API:", data)
      return data
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch org chart"
      )
    }
  }
)
