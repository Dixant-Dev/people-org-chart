"use client"

import TopHeader from "./TopHeader"
import LeftSidebar from "./LeftSidebar"
import OrgChart from "./OrgChart"

export default function OrgChartPage() {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top header */}
      <TopHeader />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left nav */}
        <LeftSidebar />

        {/* Org chart area */}
        <main className="flex-1 overflow-auto">
          <OrgChart />
        </main>

        {/* Right details */}
        {/* <OrgSidebar /> */}
      </div>
    </div>
  )
}
