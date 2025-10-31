"use client"


import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Bell, ChevronRight, LogOut, User } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "../theme-toggle"
import SettingsPanel from "./sidebar-panel"

interface BreadcrumbItem {
    label: string
    href?: string
}


interface TopNavProps {
    sidebarPosition: "left" | "top"
    onPositionChange: (position: "left" | "top") => void
    isCollapsed: boolean
    onToggleCollapse: () => void
}


export default function TopNav({
    sidebarPosition,
    onPositionChange,
    isCollapsed,
    onToggleCollapse,
}: TopNavProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { label: "PICA SGN", href: "/dashboard" },
        { label: "Dashboard", href: "#" },
    ]

    const handleLogout = () => {
        // Aksi logout, misalnya panggil API atau hapus token
        console.log("User logged out")
    }

    return (
        <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-[#1F1F23] h-full relative z-50">
            <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
                {breadcrumbs.map((item, index) => (
                    <div key={item.label} className="flex items-center">
                        {index > 0 && <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />}
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
                <SettingsPanel
                    sidebarPosition={sidebarPosition}
                    onPositionChange={onPositionChange}
                    isCollapsed={isCollapsed}
                    onToggleCollapse={onToggleCollapse}
                />

                <ThemeToggle />

                {/* Dropdown User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                        <Image
                            src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
                            alt="User avatar"
                            width={32}
                            height={32}
                            className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="w-[220px] sm:w-64 bg-background border-border rounded-lg shadow-lg"
                    >
                        <div className="px-3 py-2">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">John Doe</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@example.com</p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/profile" className="flex items-center gap-2">
                                <User className="h-4 w-4" /> Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-500 focus:text-red-500"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4 mr-2" /> Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}
