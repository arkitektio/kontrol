import { Zap, Box, Layers, RefreshCw, Plug } from "lucide-react"

export default function Deploy() {
    return (
        <div className="flex flex-col items-start justify-start px-8 py-12 md:py-24 max-w-4xl">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Plug className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Service Connectivity
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
                Kontrol resolves dependencies between Applications and Services. 
                Any service can choose to connect to your organizational network, subject to approval.
            </p>

            <div className="grid gap-6 mt-8">
                <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-xl border bg-card">
                    <div className="bg-primary/10 p-4 rounded-lg shrink-0">
                        <Box className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Bring Your Own Service</h3>
                        <p className="text-muted-foreground mb-4">
                            Services are autonomous. You can run any compatible service on any machine, anywhere. 
                            These services initiate a connection to Kontrol, requesting to join your organization's network.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-xl border bg-card">
                    <div className="bg-primary/10 p-4 rounded-lg shrink-0">
                        <Layers className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Dependency Resolution</h3>
                        <p className="text-muted-foreground mb-4">
                            Applications define their requirements (dependencies). Kontrol acts as a matchmaker, 
                            resolving these requirements against the pool of available, approved Services. 
                            This dynamic resolution ensures Apps always have the resources they need.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-xl border bg-card">
                    <div className="bg-primary/10 p-4 rounded-lg shrink-0">
                        <RefreshCw className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Approval Workflow</h3>
                        <p className="text-muted-foreground mb-4">
                            Security is paramount. When a service attempts to connect, it enters a pending state. 
                            Organization administrators must explicitly approve the service before it becomes discoverable 
                            or accessible within the network.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
