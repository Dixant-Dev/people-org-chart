"use client"

import { useEffect, useState, useMemo, useRef } from "react"
import { mockOrgChart } from "@/services/mockOrgChart"
import OrgNode from "./OrgNode"
import OrgSearch from "./OrgSearch"
import { OrgTreeNode } from "@/types/employee"
import EmployeeDrawer from "./EmployeeDrawer"
import { flattenTree } from "@/utils/flattenTree"
import OrgHeader from "./OrgHeader"
import OrgControls from "./OrgControls"
import OrgTabs from "./OrgTabs"
import { fetchOrgChart } from "@/store/orgChart/orgChartThunks"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store"
const MIN_SCALE = 0.5
const MAX_SCALE = 2
const ZOOM_STEP = 0.1

export default function OrgChart() {
  const [selectedEmployee, setSelectedEmployee] = useState<OrgTreeNode | null>(
    null
  )
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [start, setStart] = useState({ x: 0, y: 0 })

  const [confirmedEmployee, setConfirmedEmployee] =
    useState<OrgTreeNode | null>(null)

  const chartRef = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch<AppDispatch>()

  const { tree, loading, error } = useSelector(
    (state: RootState) => state.orgChart
  )

  const zoomIn = () => {
    setScale((s) => {
      const next = Math.min(s + 0.1, 2)
      return next
    })
  }

  const zoomOut = () => setScale((s) => Math.max(s - 0.1, 0.5))

  const onMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true)
    setStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return
    setPosition({
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    })
  }

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()

    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    setScale((prevScale) => {
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
      const nextScale = Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, prevScale + delta)
      )

      const scaleRatio = nextScale / prevScale

      setPosition((pos) => ({
        x: mouseX - (mouseX - pos.x) * scaleRatio,
        y: mouseY - (mouseY - pos.y) * scaleRatio,
      }))

      return nextScale
    })
  }

  const onMouseUp = () => {
    setIsPanning(false)
  }

  const fitToScreen = () => {
    if (!chartRef.current) return

    const chart = chartRef.current.getBoundingClientRect()
    const container = chartRef.current.parentElement!.getBoundingClientRect()

    const scaleX = container.width / chart.width
    const scaleY = container.height / chart.height
    const nextScale = Math.min(scaleX, scaleY, 1)

    setScale(nextScale)
    setPosition({
      x: (container.width - chart.width * nextScale) / 2,
      y: (container.height - chart.height * nextScale) / 2,
    })
  }

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_AUTH_TOKEN
    console.log("TOKEN: Token", token)

    if (!token) return
    console.log("📦 DISPATCHING THUNK")

    dispatch(
      fetchOrgChart({
        employeeId: 29,
        token,
      })
    )
  }, [dispatch])

  // 🔹 Debounce search

  // useEffect(() => {
  //   console.log("📦 DISPATCHING THUNK")
  //   dispatch(fetchOrgChart({ employeeId: 29, token: "test" }))
  // }, [dispatch])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  // 🔹 Memoize flattened tree (optional but good)
  // const allEmployees = useMemo(() => {
  //   if (tree) return flattenTree(tree)
  //   return flattenTree(mockOrgChart) // fallback
  // }, [tree])

  const allEmployees = useMemo(() => (tree ? flattenTree(tree) : []), [tree])

  const filteredEmployees = useMemo(() => {
    if (!query.trim()) return []
    return allEmployees.filter((emp) =>
      emp.target.toLowerCase().includes(query.trim().toLowerCase())
    )
  }, [query, allEmployees])

  return (
    <div className="flex h-screen px-6 py-4 bg-gray-100">
      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        <OrgHeader />
        <OrgTabs />

        <div className="mt-6">
          <OrgSearch
            value={query}
            onChange={setQuery}
            selectedEmployee={selectedEmployee?.target ?? null}
            onClearSelected={() => {
              setSelectedEmployee(null)
              setConfirmedEmployee(null) // 🔑 important
              setQuery("")
            }}
            suggestions={filteredEmployees}
            onSelectEmployee={(emp) => {
              setConfirmedEmployee(emp) // 🔑 confirm selection
              setSelectedEmployee(emp)
            }}
          />
        </div>

        {/* 🧱 ORG CHART CANVAS */}
        <div className="relative mt-2 flex-1 overflow-hidden">
          {/* Floating controls */}
          <OrgControls
            scale={scale}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onFit={fitToScreen}
          />

          {/* Zoom & Pan Canvas */}
          {/* <div
            className="
    absolute inset-0
    z-10
    overflow-hidden
    cursor-grab
    select-none
  "
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onWheel={onWheel}
          >
            <div
              ref={chartRef}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "0 0",
              }}
              className="min-h-[800px] flex justify-center pt-10 transition-transform"
            >
              {debouncedQuery ? (
                filteredEmployees.length > 0 ? (
                  <div className="flex flex-col items-center gap-4">
                    {filteredEmployees.map((emp) => (
                      <OrgNode
                        key={emp.employee_id}
                        node={emp}
                        onSelect={(emp) => {
                          setSelectedEmployee(emp)
                          setIsDrawerOpen(true)
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No matching employee found</p>
                )
              ) : (
                <OrgNode
                  node={mockOrgChart}
                  onSelect={(emp) => {
                    setSelectedEmployee(emp)
                    setIsDrawerOpen(true)
                  }}
                />
              )}
            </div>
          </div> */}

          <div
            className="
    absolute inset-0
    z-10
    overflow-hidden
    cursor-grab
    select-none
  "
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onWheel={onWheel}
          >
            <div
              ref={chartRef}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "0 0",
              }}
              className="min-h-[800px] flex justify-center pt-10 transition-transform"
            >
              {loading && <p className="text-gray-500">Loading org chart…</p>}
              {error && <p className="text-red-500">{error}</p>}

              {confirmedEmployee ? (
                <OrgNode
                  node={confirmedEmployee}
                  onSelect={(emp) => {
                    setSelectedEmployee(emp)
                    setIsDrawerOpen(true)
                  }}
                />
              ) : (
                tree && (
                  <OrgNode
                    node={tree}
                    onSelect={(emp) => {
                      setSelectedEmployee(emp)
                      setIsDrawerOpen(true)
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DRAWER */}
      <EmployeeDrawer
        employee={isDrawerOpen ? selectedEmployee : null}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  )
}
