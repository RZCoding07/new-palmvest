import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "PICA SGN",
  description: "Dashboard monitoring identifikasi masalah dan penanggulangan gula"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PrimeReactProvider>
            {children}
          </PrimeReactProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
