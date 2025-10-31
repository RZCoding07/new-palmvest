import {
  BarChart2,
  BarChart3,
  Settings,
  GitBranch,
  TrendingUp,
  Target,
  Calendar,
  List,
  FileText,
  ClipboardCheck,
  User,
  Home,
  LogOut,
  Pyramid,
  UsersRound
} from "lucide-react"

export interface MenuItem {
  id: string
  href: string
  label: string
  icon: any
  subItems?: {
    href: string
    label: string
    icon: any
  }[]
}

export interface MenuSection {
  title?: string
  items: MenuItem[]
}

export const sidebarConfig: MenuSection[] = [
  {
    title: "Menu Utama",
    items: [
      {
        id: "beranda",
        href: "/dashboard",
        label: "Beranda",
        icon: Home,
      },
      {
        id: "self-assessment",
        href: "#",
        label: "Self Assessment",
        icon: User,
        subItems: [
          { href: "#", label: "PICA Cluster", icon: GitBranch },
          { href: "#", label: "Kuadran Grafik", icon: BarChart2 },
          { href: "#", label: "Rank PG", icon: TrendingUp },
          { href: "#", label: "Kinerja PG", icon: Target },
          { href: "#", label: "PICA Harian", icon: Calendar },
          { href: "#", label: "Detail PICA PG", icon: List },
        ],
      },
      {
        id: "pi-ca",
        href: "#",
        label: "PI & CA",
        icon: FileText,
        subItems: [
          { href: "/parameter-pica", label: "PICA Params", icon: Pyramid },
          { href: "#", label: "Performance Indicator", icon: BarChart3 },
          { href: "#", label: "Corrective Action", icon: Target },
          { href: "#", label: "Analysis Report", icon: TrendingUp },
        ],
      },
            {
        id: "kinerja",
        href: "/kinerja",
        label: "Data Kinerja",
        icon: ClipboardCheck,
      },
      {
        id: "pengguna",
        href: "#",
        label: "Data Pengguna",
        icon: UsersRound,
      },

    ],
  },
]

export const bottomMenuItems: MenuItem[] = [
  {
    id: "settings",
    href: "#",
    label: "Settings",
    icon: Settings,
  },
  {
    id: "logout",
    href: "#",
    label: "Logout",
    icon: LogOut
  },
]
