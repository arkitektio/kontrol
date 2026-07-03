import { Box, Layers, RefreshCw, Plug } from "lucide-react"

export default function Deploy() {
    return (
        <div className="flex flex-col items-start justify-start px-8 py-12 md:py-24 max-w-4xl">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Plug className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                How services connect
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
                A service configures itself through Fakts, asks to join your Organization, and waits for an admin to
                approve it. Once it's in, Apps resolve their dependencies against the pool of approved services.
            </p>

            <div className="grid gap-6 mt-8">
                <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-xl border bg-card">
                    <div className="bg-primary/10 p-4 rounded-lg shrink-0">
                        <Box className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">1. Configure through Fakts</h3>
                        <p className="text-muted-foreground mb-4">
                            You run a service anywhere — on a Device in the mesh or your own machine. On startup it calls
                            Lok over the <strong>Fakts</strong> protocol to fetch its configuration and endpoints, instead of you wiring them in by hand.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-xl border bg-card">
                    <div className="bg-primary/10 p-4 rounded-lg shrink-0">
                        <RefreshCw className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">2. Request to join, get approved</h3>
                        <p className="text-muted-foreground mb-4">
                            The service registers as a pending <strong>Release</strong> and can't be reached yet. An
                            admin reviews it in Kontrol and approves it — only then does it become a usable Service Instance in the Organization.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-xl border bg-card">
                    <div className="bg-primary/10 p-4 rounded-lg shrink-0">
                        <Layers className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">3. Apps resolve their dependencies</h3>
                        <p className="text-muted-foreground mb-4">
                            An App declares which services it needs. Lok binds those requirements to approved Service
                            Instances — grouped into a <strong>Composition</strong> — so the App connects to real endpoints without hard-coding a single URL.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
