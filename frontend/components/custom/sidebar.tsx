"use client"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Menu } from "lucide-react"
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react'
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { sidebarConfig, bottomMenuItems, type MenuItem } from "./sidebar-config"

interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  position: "left" | "top"
}

export default function Sidebar({ isCollapsed, onToggleCollapse, position }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  function toggleExpanded(itemId: string) {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((item) => item !== itemId) : [...prev, itemId]))
  }

  function SidebarNavItem({ item }: { item: MenuItem }) {
    const isExpanded = expandedItems.includes(item.id)
    const Icon = item.icon

    if (item.subItems) {
      if (isCollapsed) {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-12 h-12 p-0 flex items-center justify-center rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Icon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href={item.href} className="flex items-center">
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              </DropdownMenuItem>
              {item.subItems.map((subItem, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link href={subItem.href} className="flex items-center">
                    <subItem.icon className="h-4 w-4 mr-2" />
                    {subItem.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      } else {
        return (
          <div>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-md transition-colors text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => toggleExpanded(item.id)}
            >
              <div className="flex items-center">
                <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                {item.label}
              </div>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 flex-shrink-0" />
              )}
            </Button>
            {isExpanded && (
              <div className="ml-6 mt-1 space-y-1">
                {item.subItems.map((subItem, index) => (
                  <Link
                    key={index}
                    href={subItem.href}
                    className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <subItem.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      }
    }

    if (isCollapsed) {
      return (
        <Link
          href={item.href}
          className="w-12 h-12 flex items-center justify-center rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
          title={item.label}
        >
          <Icon className="h-4 w-4" />
        </Link>
      )
    }

    return (
      <Link
        href={item.href}
        className="flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-colors text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {item.label}
      </Link>
    )
  }

  function TopNavItem({ item }: { item: MenuItem }) {
    const Icon = item.icon

    if (item.subItems) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {item.subItems.map((subItem, index) => (
              <DropdownMenuItem key={index} asChild>
                <Link href={subItem.href} className="flex items-center">
                  <subItem.icon className="h-4 w-4 mr-2" />
                  {subItem.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <Button
        variant="ghost"
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        asChild
      >
        <Link href={item.href}>
          <Icon className="w-4 h-4" />
          <span>{item.label}</span>
        </Link>
      </Button>
    )
  }

  if (position === "top") {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-[#1F1F23] px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 lg:space-x-8">
            {/* Logo */}
            <Link href="#" className="flex items-center gap-3">
              <Image src="/logosgn.png" alt="PICA SGN" width={32} height={32} className="flex-shrink-0" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">PICA SGN</span>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>

            {/* Main Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {sidebarConfig[0]?.items.map((item) => (
                <TopNavItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {bottomMenuItems.map((item) => (
              <Button key={item.id} variant="ghost" size="sm">
                <item.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-[#1F1F23] pt-4">
            <div className="space-y-2">
              {sidebarConfig[0]?.items.map((item) => (
                <TopNavItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </nav>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-gray-900 shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>

      <nav
        className={`
          fixed inset-y-0 left-0 z-[70] bg-white dark:bg-gray-900 transform transition-all duration-200 ease-in-out
          lg:translate-x-0 lg:static border-r border-gray-200 dark:border-[#1F1F23]
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "lg:w-16" : "lg:w-64"}
        `}
        style={{ width: isCollapsed ? "4rem" : "16rem" }}
      >
        <div className="h-full flex flex-col">
          {/* Header with toggle button */}
          <div
            className={`h-16 px-${isCollapsed ? "2" : "6"} flex items-center justify-between border-b border-gray-200 dark:border-[#1F1F23]`}
          >
            {!isCollapsed && (
              <Link href="#" className="flex items-center gap-3">
                <Image src="/logosgn.png" alt="PICA SGN" width={32} height={32} className="flex-shrink-0" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">PICA SGN</span>
              </Link>
            )}

            {isCollapsed && (
              <div className="w-full flex justify-center">
                <Image src="/logosgn.png" alt="PICA SGN" width={32} height={32} className="flex-shrink-0" />
              </div>
            )}

            <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="hidden lg:flex p-1.5 h-7 w-7 ml-2 border rounded-xl bg-white dark:bg-gradient-to-l from-gray-950 to-gray-900">
              {isCollapsed ? <IconChevronsLeft
                stroke={1.5}
                className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
              /> : <IconChevronsLeft
                stroke={1.5}
                className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
              />}
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              {sidebarConfig.map((section, sectionIndex) => (
                <div key={sectionIndex} className="">
                  {!isCollapsed && section.title && (
                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {section.title}
                    </div>
                  )}
                  <div className={`space-y-1 ${isCollapsed ? "flex flex-col items-center" : ""}`}>
                    {section.items.map((item) => (
                      <SidebarNavItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23] ${isCollapsed ? "flex flex-col items-center" : ""}`}
          >
            <div className={`space-y-1 ${isCollapsed ? "flex flex-col items-center" : ""}`}>
              {bottomMenuItems.map((item) => (
                <SidebarNavItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}