import { Outlet } from 'react-router-dom'
import { SidebarProvider } from "./ui/sidebar"
import { ErrorBoundary } from './ErrorBoundary'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { ThemeQueryParamSync } from '@/providers/ThemeQueryParamSync'
import { MembershipHueSync } from '@/providers/MembershipHueSync'
import LavaBackground from './LavaBackground'

export default function RootLayout() {

  return (
    <ThemeProvider>
    <MembershipHueSync />
    <ThemeQueryParamSync />
    <LavaBackground className="fixed inset-0 -z-10" dull />
    <SidebarProvider>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
    </SidebarProvider>
    </ThemeProvider>
  )
}


export const ErrorLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <ThemeProvider>
    <SidebarProvider>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </SidebarProvider>
    </ThemeProvider>
  )
}
