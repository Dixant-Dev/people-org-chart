import { createSlice } from "@reduxjs/toolkit"
import { fetchOrgChart } from "./orgChartThunks"
import { OrgTreeNode } from "@/types/employee"

interface OrgChartState {
  tree: OrgTreeNode | null
  loading: boolean
  error: string | null
}

const initialState: OrgChartState = {
  tree: null,
  loading: false,
  error: null,
}

const orgChartSlice = createSlice({
  name: "orgChart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgChart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrgChart.fulfilled, (state, action) => {
        state.loading = false
        state.tree = action.payload // 👈 IMPORTANT
      })
      .addCase(fetchOrgChart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default orgChartSlice.reducer
