import { Link } from "react-router-dom"
import { Button } from "./components/ui/button"
import { ArrowRight, Github } from "lucide-react"

export default function Landing() {
    return (
        <div className="flex flex-1 flex-col relative">
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

            
        </div>
    )
}
