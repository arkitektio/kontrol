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
            <section className="relative flex flex-col items-start justify-start px-8 py-24 md:py-32 overflow-hidden z-20">
                
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
            <section className="relative px-8 py-16 z-20">
                <div className="max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">
                        Everything You Need, Out of the Box
                    </h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Feature Card 1 */}
                        <Card className="border-2 hover:border-primary/50 transition-colors bg-muted/50">
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

                        {/* Feature Card 2 */}
                        <Card className="border-2 hover:border-primary/50 transition-colors bg-muted/50">
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

                        {/* Feature Card 3 */}
                        <Card className="border-2 hover:border-primary/50 transition-colors bg-muted/50">
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

                        {/* Feature Card 4 */}
                        <Card className="border-2 hover:border-primary/50 transition-colors bg-muted/50">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Zap className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>Deploy Quickly</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Get your lab services running in minutes. Simple CLI, Docker support, and automated workflows.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Video Demo Section */}
            <section className="relative px-8 py-16 z-20">
                <div className="max-w-6xl">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            See It In Action
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Watch how easy it is to authenticate and get started
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Login Flow Video */}
                        <Card className="overflow-hidden">
                            <CardHeader>
                                <CardTitle>Sign In Flow</CardTitle>
                                <CardDescription>
                                    Quick and secure authentication with multiple providers
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                                    <video 
                                        className="w-full h-full object-cover"
                                        controls
                                        loop
                                        muted
                                        playsInline
                                        poster="/demo-login-poster.jpg"
                                    >
                                        <source src="/demo-login.mp4" type="video/mp4" />
                                        <div className="flex flex-col items-center justify-center gap-4 p-8">
                                            <Shield className="h-16 w-16 text-muted-foreground" />
                                            <p className="text-muted-foreground text-center">
                                                Login demo video will be displayed here
                                            </p>
                                        </div>
                                    </video>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Setup Video */}
                        <Card className="overflow-hidden">
                            <CardHeader>
                                <CardTitle>First Service Deploy</CardTitle>
                                <CardDescription>
                                    From zero to running service in under 2 minutes
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                                    <video 
                                        className="w-full h-full object-cover"
                                        controls
                                        loop
                                        muted
                                        playsInline
                                        poster="/demo-deploy-poster.jpg"
                                    >
                                        <source src="/demo-deploy.mp4" type="video/mp4" />
                                        <div className="flex flex-col items-center justify-center gap-4 p-8">
                                            <Zap className="h-16 w-16 text-muted-foreground" />
                                            <p className="text-muted-foreground text-center">
                                                Deploy demo video will be displayed here
                                            </p>
                                        </div>
                                    </video>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-12">
                        <p className="text-muted-foreground mb-6">
                            Ready to start managing your lab infrastructure?
                        </p>
                        <Button size="lg" asChild>
                            <Link to="/account/signup">
                                Create Your Free Account
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="relative px-8 py-16 bg-primary/5 z-20">
                <div className="max-w-4xl space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Join the Community
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Kontrol is built by scientists, for scientists. Open source, forever free.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <Button variant="outline" size="lg" asChild>
                            <a href="https://github.com/arkitektio/kontrol" target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-5 w-5" />
                                Star on GitHub
                            </a>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <a href="https://github.com/arkitektio/kontrol/discussions" target="_blank" rel="noopener noreferrer">
                                Join Discussions
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
