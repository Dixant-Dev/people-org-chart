import { configureStore } from "@reduxjs/toolkit"
import orgChartReducer from "./orgChart/orgChartSlice"

export const store = configureStore({
  reducer: {
    orgChart: orgChartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
