import { Network, Server, Globe, ShieldCheck } from "lucide-react"

export default function Networking() {
    return (
        <div className="flex flex-col items-start justify-start px-8 py-12 md:py-24 max-w-4xl">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Network className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                A private mesh, not a VPN to babysit
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
                Kontrol runs ionscale, a Tailscale-compatible control server bundled with Lok. Your Devices join a
                WireGuard mesh and reach each other directly — no port forwarding, no public IPs, no static VPN config.
            </p>

            <div className="grid gap-6 mt-8">
                <div className="flex gap-4 items-start bg-muted/30 p-6 rounded-xl border">
                    <Server className="w-8 h-8 text-primary mt-1 shrink-0" />
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Devices are the nodes</h3>
                        <p className="text-muted-foreground">
                            A server, a workstation, or a microscope acquisition machine each register as a Device and
                            get a stable address on the mesh. Services run on those Devices, next to the data they use.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 items-start bg-muted/30 p-6 rounded-xl border">
                    <Globe className="w-8 h-8 text-primary mt-1 shrink-0" />
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Direct WireGuard connections</h3>
                        <p className="text-muted-foreground">
                            ionscale hands out keys and routes; the Devices then talk peer-to-peer over WireGuard. It
                            punches through NAT and firewalls, so a machine in the cloud, on campus, and at home all sit on the same network.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 items-start bg-muted/30 p-6 rounded-xl border">
                    <ShieldCheck className="w-8 h-8 text-primary mt-1 shrink-0" />
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Encrypted and off the public internet</h3>
                        <p className="text-muted-foreground">
                            Traffic between nodes is end-to-end encrypted by WireGuard. Services on the mesh are never
                            exposed to the open internet — only members of your Organization with a joined Device can reach them.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
