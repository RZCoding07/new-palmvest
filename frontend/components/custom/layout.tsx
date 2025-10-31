"use client"
import type { ReactNode } from "react"
import Sidebar from "./sidebar"
import TopNav from "./top-nav"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface LayoutProps {
  children: ReactNode
  isDataMaster?: boolean
}

export default function Layout({ children, isDataMaster }: LayoutProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [sidebarPosition, setSidebarPosition] = useState<"left" | "top">("left")
  const [isCollapsed, setIsCollapsed] = useState(false)

  // ✅ Tambahkan state untuk label aktif
  const [activeLabel, setActiveLabel] = useState<string>("Beranda")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handlePositionChange = (position: "left" | "top") => {
    setSidebarPosition(position)
    if (position === "top") {
      setIsCollapsed(false)
    }
  }

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={`flex h-screen ${theme === "dark" ? "dark" : ""}`}>
      {/* ✅ Kirim setActiveLabel ke Sidebar */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        onToggleCollapse={handleToggleCollapse} 
        position={sidebarPosition} 
        onLabelClick={setActiveLabel} 
      />

      <div className="w-full flex flex-1 flex-col">
        <header className={`h-16 border-b border-gray-200 dark:border-[#1F1F23] ${sidebarPosition === 'top' ? 'mt-15' : ''}`}>
          <TopNav
            sidebarPosition={sidebarPosition}
            onPositionChange={handlePositionChange}
            isCollapsed={isCollapsed}
            onToggleCollapse={handleToggleCollapse}
          />
        </header>

        <main className="flex-1 overflow-auto p-6 bg-white dark:bg-gray-800">
          {/* ✅ Tampilkan label yang diklik */}
          {isDataMaster && (
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {activeLabel}
              </h1>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}
