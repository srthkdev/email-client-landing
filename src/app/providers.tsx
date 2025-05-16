"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider as NextThemeProvider } from "next-themes"
import { useEffect } from "react"
import { QueryProvider } from "./query-provider"
import { ThemeProvider as NotionThemeProvider } from "@/lib/theme-context"

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log("SessionProvider mounted")
  }, [])
  
  return (
    <SessionProvider>
      <QueryProvider>
        <NextThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          themes={["light", "dark", "notion-light", "notion-dark", "midnight", "forest", "autumn"]}
        >
          <NotionThemeProvider>
            {children}
          </NotionThemeProvider>
        </NextThemeProvider>
      </QueryProvider>
    </SessionProvider>
  )
} 