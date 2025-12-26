"use client"

import TopHeader from "./TopHeader"
import LeftSidebar from "./LeftSidebar"
import OrgChart from "./OrgChart"

export default function OrgChartPage() {
  return (
    <div className="h-screen flex flex-col bg-background">
      <TopHeader />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />

        <main className="flex-1">
          <OrgChart />
        </main>
      </div>
    </div>
  )
}
