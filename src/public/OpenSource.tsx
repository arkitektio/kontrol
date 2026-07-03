import { Code, GitBranch, Heart } from "lucide-react"

export default function OpenSource() {
    return (
        <div className="flex flex-col items-start justify-start px-8 py-12 md:py-24 max-w-4xl">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Fully Open Source
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
                Kontrol and the Lok server it talks to are MIT licensed. Every part of the Arkitekt
                control plane — identity, app configuration, the mesh — is code you can read, fork, and run yourself.
            </p>

            <div className="grid gap-8 md:grid-cols-2 mt-8">
                <div className="bg-muted/30 p-6 rounded-xl border">
                    <div className="flex items-center gap-3 mb-4">
                        <GitBranch className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-semibold">Read and fork the source</h3>
                    </div>
                    <p className="text-muted-foreground">
                        The code lives on GitHub under the arkitektio organization. Open an issue, send a pull
                        request, or fork it and run your own build — nothing is hidden behind a hosted API.
                    </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-xl border">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-semibold">Self-hosted by design</h3>
                    </div>
                    <p className="text-muted-foreground">
                        Run the whole stack on your own hardware. Users, tokens, and service metadata stay on
                        your machines, so Kontrol works in air-gapped and locked-down networks too.
                    </p>
                </div>
            </div>

            <div className="prose dark:prose-invert max-w-none mt-10">
                <h3 className="text-2xl font-semibold mb-4">Why it matters</h3>
                <p>
                    Kontrol issues signed JWTs, so any service can verify a token on its own — no call back to a
                    central server, no shared session store to trust. Because the whole chain is open, you can audit
                    exactly how a user or app was authorized, and you're never stuck if a vendor changes direction.
                </p>
            </div>
        </div>
    )
}
