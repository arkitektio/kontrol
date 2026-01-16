import { Outlet, Link } from 'react-router-dom'
import { Button } from "../ui/button"
import { Github, Menu } from "lucide-react"
import { ErrorBoundary } from "../ErrorBoundary"
import { ArkitektLogo, DynamicArkitektLogo } from '@/logos/ArkitektLogo'

export function LandingLayout() {
    return (
        <div className="flex flex-col min-h-screen min-w-full">
            {/* Navigation Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between px-8 min-w-full">
                    <div className="flex items-center gap-6">
                        <div className="w-8 h-8">
                                <DynamicArkitektLogo width={"100%"} height={"100%"}/>
                        </div>
                        <span className="font-light text-lg">
                            Fakts
                        </span>
                    </div>
                    
                    <nav className="hidden md:flex items-center gap-6">
                        <a 
                            href="https://github.com/arkitektio/kontrol" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            GitHub
                        </a>
                        <a 
                            href="https://github.com/arkitektio/kontrol#readme" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            Docs
                        </a>
                        <Link 
                            to="/account/login"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            Sign In
                        </Link>
                        <Button size="sm" asChild>
                            <Link to="/account/signup">
                                Get Started
                            </Link>
                        </Button>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </main>

            {/* Footer */}
            <footer className="border-t bg-background">
                <div className="container flex flex-col md:flex-row items-center justify-between gap-4 py-8 px-8">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                            © 2026 Arkitektio. Open source under MIT license.
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a 
                            href="https://github.com/arkitektio/kontrol" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
