import { Link } from "react-router-dom"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Code, Shield, Network, Zap, ArrowRight, Github } from "lucide-react"
import { useIsMobile } from "./hooks/use-mobile"
import LavaBackground from "./components/LavaBackground"

export default function Landing() {
    const isMobile = useIsMobile()

    return (
        <div className="flex flex-1 flex-col relative">
            {/* Animated Background - fixed position */}
            {!isMobile ? (
                <div className="fixed top-0 right-0 h-screen w-[80vw] lg:block hidden pointer-events-none z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10" />
                    <LavaBackground />
                </div>
            ) : null}
            
            {/* Hero Section */}
            <section className="relative flex flex-col items-start justify-start px-8 py-12 md:py-24 overflow-hidden z-20">
                
                <div className="max-w-4xl space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        Koordination
                        <span className="block text-primary text-5xl font-light">for Arkitekt</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                        Lok is  the identity and configuration server behind Arkitekt.
                        Apps configure themselves through Fakts, users and services sign in over OAuth2/OIDC,
                        and devices join a private WireGuard mesh — all self-hostable and MIT licensed.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <Button size="lg" className="text-lg px-8 py-6" asChild>
                            <Link to="/account/signup">
                                Create an account
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                            <a href="https://arkitekt.live" target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-5 w-5" />
                                View on GitHub
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative px-8 py-4 z-20">
                <div className="max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">
                        What Kontrol manages
                    </h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Feature Card 1 */}
                        <Link to="/opensource">
                            <Card className="border-2 hover:border-primary/50 transition-colors bg-muted/50 h-full">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <Code className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Open source, self-hostable</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        Run the whole stack on your own hardware. MIT licensed, no vendor lock-in, and the JWTs it issues verify offline.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Feature Card 2 */}
                        <Link to="/networking">
                            <Card className="border-2 hover:border-primary/50 transition-colors bg-muted/50 h-full">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <Network className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Private mesh, no port forwarding</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        Devices join a WireGuard mesh through ionscale, a Tailscale-compatible control server. Peers connect directly through NAT and firewalls.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Feature Card 3 */}
                        <Link to="/auth">
                            <Card className="border-2 hover:border-primary/50 transition-colors bg-muted/50 h-full">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <Shield className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>One identity provider</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        Lok is your OAuth2/OIDC provider. Organizations, Roles, and Scopes decide who reaches which services — with social login, MFA, and passkeys.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Feature Card 4 */}
                        <Link to="/deploy">
                            <Card className="border-2 hover:border-primary/50 transition-colors bg-muted/50 h-full">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <Zap className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Services join on approval</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        A service fetches its config through Fakts and requests to join. Once an admin approves it, Apps resolve their dependencies against it.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    <div className="mt-12 flex justify-start">
                        <Button size="lg" variant="outline" asChild>
                            <a href="https://github.com/arkitektio/kontrol#readme" target="_blank" rel="noopener noreferrer">
                                Learn more
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                        </Button>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
