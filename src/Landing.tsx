import { Link } from "react-router-dom"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Code, Shield, Network, Zap, ArrowRight, Github } from "lucide-react"
import OrganicLogo from "./components/OrganicLogo"

export default function Landing() {
    return (
        <div className="flex flex-1 flex-col relative">
            {/* Animated Background - fixed position */}
            <div className="fixed top-0 right-0 h-screen w-[80vw] lg:block hidden pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10" />
                <OrganicLogo 
                    count={8} 
                    color="#6f5cde"
                    connectionDistance={3.5}
                    wanderSpeed={0.4}
                />
            </div>
            
            {/* Hero Section */}
            <section className="relative flex flex-col items-start justify-start px-8 py-12 md:py-24 overflow-hidden z-20">
                
                <div className="max-w-4xl space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        Connect your Lab
                        <span className="block text-primary  text-5xl font-light">Instantly</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                        Connect your devices, deploy services, and manage your lab infrastructure with built-in authentication and peer-to-peer networking.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <Button size="lg" className="text-lg px-8 py-6" asChild>
                            <Link to="/account/signup">
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                            <a href="https://github.com/arkitektio/kontrol" target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-5 w-5" />
                                View on GitHub
                            </a>
                        </Button>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm backdrop-blur-sm">
                        <Github className="h-4 w-4" />
                        <span className="font-medium">100% Open Source</span>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative px-8 py-4 z-20">
                <div className="max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">
                        Everything You Need, Out of the Box
                    </h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Feature Card 1 */}
                        <Link to="/opensource">
                            <Card className="border-2 hover:border-primary/50 transition-colors bg-muted/50 h-full">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <Code className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Fully Open Source</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        No vendor lock-in. Inspect, modify, and deploy on your own infrastructure. MIT licensed.
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
                                    <CardTitle>Firewall? No Problem</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        Connect peer-to-peer with Tailscale integration. Works behind NAT and firewalls seamlessly.
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
                                    <CardTitle>Auth Built In</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        OAuth2, social logins, MFA, and fine-grained permissions. Secure by default, easy to use.
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
                                    <CardTitle>Connect Services</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        Register your services and let Kontrol handle discovery, dependency resolution, and access control.
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
