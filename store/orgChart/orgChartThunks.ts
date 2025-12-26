import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchOrgChartApi } from "@/services/orgChartApi"

export const fetchOrgChart = createAsyncThunk(
  "orgChart/fetch",
  async (
    { employeeId, token }: { employeeId: number; token: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchOrgChartApi(employeeId, token)
      return data
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.user_info ||
          "Org chart data is currently unavailable"
      )
    }
  }
)
