"use client"
import { Settings, Monitor, Sidebar, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

interface SettingsPanelProps {
  sidebarPosition: "left" | "top"
  onPositionChange: (position: "left" | "top") => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export default function SettingsPanel({
  sidebarPosition,
  onPositionChange,
  isCollapsed,
  onToggleCollapse,
}: SettingsPanelProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Monitor className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Sidebar Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onPositionChange("left")}>
          <Sidebar className="h-4 w-4 mr-2" />
          Left Sidebar
          {sidebarPosition === "left" && <span className="ml-auto text-xs">✓</span>}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onPositionChange("top")}>
          <Navigation className="h-4 w-4 mr-2" />
          Top Navigation
          {sidebarPosition === "top" && <span className="ml-auto text-xs">✓</span>}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {sidebarPosition === "left" && (
          <DropdownMenuItem onClick={onToggleCollapse}>
            <Monitor className="h-4 w-4 mr-2" />
            {isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
