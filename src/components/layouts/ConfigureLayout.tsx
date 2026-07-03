import { Link, Outlet } from "react-router-dom"
import { DynamicArkitektLogo } from "@/logos/ArkitektLogo"
import { BrandColorPicker } from "../BrandColorPicker"
import { HeaderUserMenu } from "../HeaderUserMenu"
import { ErrorBoundary } from "../ErrorBoundary"

// Focused layout for redirect-driven task flows (device configure, OAuth
// authorize, invite redeem). No sidebar — just a slim top bar (brand + account)
// over centered content, so the single card is the whole focus.
export function ConfigureLayout() {
    return (
        <div className="flex min-h-svh w-full flex-col">
            <header className="flex h-14 shrink-0 items-center justify-between border-b px-4">
                <Link to="/" className="flex items-center gap-2 font-semibold">
                    <span className="text-foreground flex size-7 items-center justify-center">
                        <DynamicArkitektLogo width="100%" height="100%" strokeColor="currentColor" aColor="currentColor" />
                    </span>
                    Kontrol
                </Link>
                <div className="flex items-center gap-1">
                    <BrandColorPicker />
                    <HeaderUserMenu />
                </div>
            </header>
            <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-6">
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </main>
        </div>
    )
}
