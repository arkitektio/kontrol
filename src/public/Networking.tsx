import { Network, Server, Globe, ShieldCheck } from "lucide-react"

export default function Networking() {
    return (
        <div className="flex flex-col items-start justify-start px-8 py-12 md:py-24 max-w-4xl">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Network className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Networking Simplified
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
                Forget complex VPNs and port forwarding. Kontrol creates a secure, peer-to-peer mesh network between your devices, working seamlessly behind firewalls and NATs.
            </p>

            <div className="grid gap-6 mt-8">
                <div className="flex gap-4 items-start bg-muted/30 p-6 rounded-xl border">
                    <Server className="w-8 h-8 text-primary mt-1 shrink-0" />
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Device-Centric Architecture</h3>
                        <p className="text-muted-foreground">
                            In Kontrol, "Devices" are first-class citizens. Whether it's a powerful server, a lab workstation, or an acquisition machine, 
                            each device connects to the network as a node. Services run directly on these devices, close to your data.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 items-start bg-muted/30 p-6 rounded-xl border">
                    <Globe className="w-8 h-8 text-primary mt-1 shrink-0" />
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Overlay Mesh Network</h3>
                        <p className="text-muted-foreground">
                            We leverage advanced overlay networking technologies (compatible with Tailscale/Headscale) to create a virtual private network. 
                            Devices can communicate directly with each other (Peer-to-Peer) regardless of their physical location—be it in the cloud, on campus, or at home.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 items-start bg-muted/30 p-6 rounded-xl border">
                    <ShieldCheck className="w-8 h-8 text-primary mt-1 shrink-0" />
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Secure by Default</h3>
                        <p className="text-muted-foreground">
                            All traffic between nodes is end-to-end encrypted. Because it's a private mesh, your services aren't exposed to the public internet, 
                            reducing the attack surface significantly while remaining accessible to authorized members of your Organization.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
